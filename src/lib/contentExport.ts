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

export type ContentRow = {
  dataset: string;
  external_id: string;
  title: string | null;
  category: string | null;
  url: string | null;
  payload: Record<string, unknown>;
};

const pick = (item: any, keys: string[]) => {
  for (const k of keys) {
    const v = item?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 200);

const toRows = (dataset: string, items: any[]): ContentRow[] => {
  const seen = new Map<string, number>();
  return items.map((item) => {
    const title = pick(item, ["title", "name", "label", "app"]);
    const base =
      pick(item, ["slug", "id"]) || (title ? slugify(title) : `item-${seen.size}`);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return {
      dataset,
      external_id: n > 1 ? `${base}-${n}` : base,
      title,
      category: pick(item, ["category", "group", "section"]),
      url: pick(item, ["url", "link", "href", "downloadUrl", "repo", "website"]),
      payload: item as Record<string, unknown>,
    };
  });
};

/** Normalises an arbitrary array of items into importable rows for a dataset. */
export const rowsFromItems = (dataset: string, items: any[]): ContentRow[] =>
  toRows(dataset, items);

/** Every content collection on the site, normalised for backend storage. */

export const buildAllContentRows = (): ContentRow[] => [
  ...toRows("courses", allCourses),
  ...toRows("resources", allResources),
  ...toRows("ebooks", allEbooks),
  ...toRows("apps", allApps),
  ...toRows("websites", allWebsites),
  ...toRows("collections", collections),
  ...toRows("ai_tools", aiTools),
  ...toRows("foss_apps", fossApps),
  ...toRows("foss_list", fossListApps),
  ...toRows("material_you_apps", materialYouApps),
  ...toRows("shizuku_apps", shizukuApps),
  ...toRows("telegram_bots", telegramBots),
  ...toRows("tv_apps", tvApps),
  ...toRows("os_projects", osProjects),
];

export const datasetSummary = (rows: ContentRow[]) => {
  const counts: Record<string, number> = {};
  for (const r of rows) counts[r.dataset] = (counts[r.dataset] ?? 0) + 1;
  return counts;
};

export const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

/** Downloads the whole catalog as a single JSON backup file. */
export const downloadContentBackup = () => {
  const rows = buildAllContentRows();
  const blob = new Blob(
    [
      JSON.stringify(
        { exportedAt: new Date().toISOString(), counts: datasetSummary(rows), rows },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `nextup-content-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  return rows.length;
};
