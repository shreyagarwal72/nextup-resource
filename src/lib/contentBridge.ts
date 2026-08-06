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
import { telegramBots, telegramBotCategories } from "@/data/telegramBots";
import { tvApps, tvCategories } from "@/data/tvApps";
import { osProjects } from "@/data/osList";
import { resolveAssetUrl } from "@/lib/assetMap";

/**
 * Backend-driven content.
 *
 * Nothing ships in the bundle any more — every dataset below starts empty and
 * is filled from the `site_content` table. The exported arrays are live
 * references, so hydrating is a matter of replacing their *contents* and
 * bumping a version counter to re-render.
 *
 * Order of operations on boot:
 *   1. the localStorage snapshot of the last sync renders instantly (offline-first)
 *   2. the backend is queried and, if it has rows, applied + cached
 *   3. the service worker also caches the REST response, so a cold offline
 *      start still resolves from the network layer
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

/** Human labels used by the admin per-page content manager. */
export const DATASET_LABELS: Record<string, string> = {
  courses: "Courses (/courses)",
  resources: "Resources (/resources)",
  ebooks: "Ebooks (/ebooks)",
  apps: "Apps (/apps)",
  websites: "Websites (/apps)",
  collections: "Collections (/collection/:slug)",
  ai_tools: "AI Tools (/ai)",
  foss_apps: "FOSS picks (/foss-apps)",
  foss_list: "FOSS list (/foss-apps)",
  material_you_apps: "Material You (/material-you)",
  shizuku_apps: "Shizuku (/shizuku-apps)",
  telegram_bots: "Telegram Tweaks (/telegram-tweaks)",
  tv_apps: "TV Apps (/tv-apps)",
  os_projects: "Operating Systems (/os)",
};

export const DATASETS = Object.keys(REGISTRY);

/** Read-only access to a live dataset (used for per-page exports). */
export const getDataset = (dataset: string): any[] | undefined => REGISTRY[dataset];

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
export let contentSource: "empty" | "cache" | "backend" = "empty";

const IMAGE_KEYS = ["image", "cover", "thumbnail", "icon"];

/** Rewrites stored build-asset URLs to assets that exist in the current build. */
const normalise = (item: any) => {
  if (!item || typeof item !== "object") return item;
  let out = item;
  for (const key of IMAGE_KEYS) {
    const value = out[key];
    if (typeof value !== "string") continue;
    const resolved = resolveAssetUrl(value);
    if (resolved !== value) out = { ...out, [key]: resolved };
  }
  return out;
};

const titleOf = (item: any) =>
  typeof item?.title === "string" ? item.title : typeof item?.name === "string" ? item.name : "";

/** Datasets that render alphabetically; the rest keep their stored order. */
const ALPHABETICAL = new Set(["courses", "resources", "ebooks", "apps", "websites"]);

const syncDerived = (dataset: string) => {
  if (dataset === "tv_apps") {
    const cats = Array.from(new Set(tvApps.map((a) => a.category))).sort();
    tvCategories.length = 0;
    tvCategories.push(...cats);
  }
  if (dataset === "telegram_bots") {
    const cats = Array.from(new Set(telegramBots.map((b) => b.category))).sort();
    telegramBotCategories.length = 0;
    telegramBotCategories.push(...cats);
  }
};

const applyGrouped = (grouped: Record<string, any[]>) => {
  let applied = 0;
  for (const [dataset, items] of Object.entries(grouped)) {
    const target = REGISTRY[dataset];
    if (!target || !Array.isArray(items) || items.length === 0) continue;
    const next = items.map(normalise);
    if (ALPHABETICAL.has(dataset)) {
      next.sort((a, b) => titleOf(a).localeCompare(titleOf(b)));
    }
    target.length = 0;
    target.push(...next);
    syncDerived(dataset);
    applied += next.length;
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
    /* quota — the service-worker cache still backs us up */
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
      /* offline — the cached catalog stays on screen */
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
