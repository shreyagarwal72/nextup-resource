/**
 * Bundled image assets, addressable by their original file name.
 *
 * Content now lives in the backend, and some rows still point at a built
 * asset URL (e.g. `/assets/prompt-collection-B1x2y3.jpg`). Vite re-hashes those
 * file names on every build, so we resolve them back to the current URL by
 * matching the file *stem* (everything before the hash).
 */
const modules = import.meta.glob("@/assets/**/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const byStem = new Map<string, string>();
for (const [path, url] of Object.entries(modules)) {
  const file = path.split("/").pop() ?? "";
  const stem = file.replace(/\.[a-z0-9]+$/i, "");
  byStem.set(stem, url);
}

/** Resolves a stored image reference to a URL that exists in this build. */
export const resolveAssetUrl = (value: unknown): unknown => {
  if (typeof value !== "string") return value;
  if (!value.startsWith("/assets/")) return value;

  const file = value.split("/").pop() ?? "";
  const stem = file.replace(/\.[a-z0-9]+$/i, "");
  const direct = byStem.get(stem);
  if (direct) return direct;

  // Otherwise drop trailing `-<hash>` segments one at a time until we hit a
  // known asset (hashes themselves can contain hyphens).
  const parts = stem.split("-");
  for (let keep = parts.length - 1; keep > 0; keep--) {
    const hit = byStem.get(parts.slice(0, keep).join("-"));
    if (hit) return hit;
  }
  return value;
};

