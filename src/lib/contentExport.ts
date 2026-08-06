import { getDataset } from "@/lib/contentBridge";

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
    const base = pick(item, ["slug", "id"]) || (title ? slugify(title) : `item-${seen.size}`);
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

export const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const download = (name: string, data: unknown) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
};

/**
 * Downloads a single page's content as a plain JSON array — the same shape the
 * importer accepts, so an admin can edit one page and upload it back.
 */
export const downloadDatasetBackup = (dataset: string, items?: unknown[]) => {
  const data = items ?? getDataset(dataset) ?? [];
  download(`nextup-${dataset}-${new Date().toISOString().slice(0, 10)}.json`, data);
  return data.length;
};
