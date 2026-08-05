import { useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  allCourses,
  allResources,
  allEbooks,
  allApps,
  allWebsites,
  collections,
} from "@/data/content";
import { aiTools } from "@/data/aiTools";
import { fossApps } from "@/data/fossApps";
import { fossListApps } from "@/data/fossList";
import { materialYouApps } from "@/data/materialYouApps";
import { shizukuApps } from "@/data/shizukuApps";
import { telegramBots } from "@/data/telegramBots";
import { tvApps } from "@/data/tvApps";
import { osProjects } from "@/data/osList";

/**
 * Backend-driven content.
 *
 * Every page imports its dataset from `src/data/*`. Those exports are live
 * array references, so hydrating the site from the backend is a matter of
 * replacing the *contents* of those arrays (never the reference) and then
 * bumping a version counter so React re-renders with the new data.
 *
 * Order of operations on boot:
 *   1. bundled data renders instantly (zero blank screens, works offline)
 *   2. the localStorage snapshot of the last backend sync is applied
 *   3. the backend is queried and, if it has rows, applied + cached
 */
const REGISTRY: Record<string, any[]> = {
  courses: allCourses,
  resources: allResources,
  ebooks: allEbooks,
  apps: allApps,
  websites: allWebsites,
  collections,
  ai_tools: aiTools,
  foss_apps: fossApps,
  foss_list: fossListApps,
  material_you_apps: materialYouApps,
  shizuku_apps: shizukuApps,
  telegram_bots: telegramBots,
  tv_apps: tvApps,
  os_projects: osProjects,
};

export const DATASETS = Object.keys(REGISTRY);

const CACHE_KEY = "nextup-content-cache-v1";

// ---- version store (drives re-render) ----
let version = 0;
const listeners = new Set<() => void>();
const bump = () => {
  version += 1;
  listeners.forEach((l) => l());
};

export const useContentVersion = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => version,
    () => 0,
  );

/** Source of the currently rendered catalog — surfaced in the admin page. */
export let contentSource: "bundled" | "cache" | "backend" = "bundled";

const applyGrouped = (grouped: Record<string, any[]>) => {
  let applied = 0;
  for (const [dataset, items] of Object.entries(grouped)) {
    const target = REGISTRY[dataset];
    if (!target || !Array.isArray(items) || items.length === 0) continue;
    target.length = 0;
    target.push(...items);
    applied += items.length;
  }
  if (applied) bump();
  return applied;
};

type Row = { dataset: string; payload: unknown };

const group = (rows: Row[]) => {
  const out: Record<string, any[]> = {};
  for (const r of rows) {
    if (!r?.dataset || !r.payload || typeof r.payload !== "object") continue;
    (out[r.dataset] ||= []).push(r.payload);
  }
  return out;
};

const readCache = (): Record<string, any[]> | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (grouped: Record<string, any[]>) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(grouped));
  } catch {
    /* quota — fine, we still have bundled data */
  }
};

/** Pull the whole catalog from the backend (paginated — the table is large). */
const fetchAll = async (): Promise<Row[]> => {
  const page = 1000;
  const rows: Row[] = [];
  for (let from = 0; ; from += page) {
    const { data, error } = await supabase
      .from("site_content")
      .select("dataset,payload")
      .range(from, from + page - 1);
    if (error) throw error;
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < page) break;
  }
  return rows;
};

let started = false;

/** Boots the backend content pipeline. Safe to call once, at app start. */
export const initContentBridge = () => {
  if (started) return;
  started = true;

  const cached = readCache();
  if (cached && applyGrouped(cached)) contentSource = "cache";

  void (async () => {
    try {
      const rows = await fetchAll();
      if (!rows.length) return;
      const grouped = group(rows);
      if (applyGrouped(grouped)) {
        contentSource = "backend";
        writeCache(grouped);
      }
    } catch {
      /* offline or backend empty — bundled/cached content stays on screen */
    }
  })();
};

/** Drops the local snapshot and re-pulls from the backend. */
export const refreshContentFromBackend = async () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    /* ignore */
  }
  const rows = await fetchAll();
  const grouped = group(rows);
  const applied = applyGrouped(grouped);
  if (applied) {
    contentSource = "backend";
    writeCache(grouped);
  }
  return applied;
};
