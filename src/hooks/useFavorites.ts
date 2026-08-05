import { useCallback, useSyncExternalStore } from "react";
import { toast } from "@/hooks/use-toast";

export type FavoriteType =
  | "course"
  | "resource"
  | "ebook"
  | "ai-tool"
  | "foss"
  | "shizuku"
  | "morphe"
  | "material-you"
  | "app"
  | "website"
  | "tv-app"
  | "os"
  | "game"
  | "iot"
  | "api"
  | "bot"
  | "design"
  | "android-re"
  | "fitness"
  | "roadmap";

interface FavoriteItem {
  id: string;
  type: FavoriteType;
}

const STORAGE_KEY = "nextup_favorites";

const load = (): FavoriteItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
};

/**
 * Single shared snapshot — every card on every page reads the same list, so a
 * heart tapped in one component instantly re-renders all the others (and other
 * tabs, via the `storage` event).
 */
let snapshot: FavoriteItem[] = load();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  const onExternal = () => {
    snapshot = load();
    emit();
  };
  window.addEventListener("storage", onExternal);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onExternal);
  };
};

const persist = (next: FavoriteItem[]) => {
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  emit();
};

const EMPTY: FavoriteItem[] = [];

const LABELS: Partial<Record<FavoriteType, string>> = {
  course: "Course",
  resource: "Resource",
  ebook: "Ebook",
  "ai-tool": "AI tool",
  foss: "FOSS app",
  shizuku: "Shizuku app",
  morphe: "Morphe build",
  "material-you": "Material You app",
  app: "App",
  website: "Website",
  "tv-app": "TV app",
  os: "OS project",
  game: "Game",
  iot: "IoT project",
  api: "API",
  bot: "Telegram bot",
  design: "Design resource",
  "android-re": "Android RE tool",
  fitness: "Fitness book",
  roadmap: "Roadmap",
};

export const useFavorites = () => {
  const favorites = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => EMPTY,
  );

  const isFavorite = useCallback(
    (id: string, type: FavoriteType) => favorites.some((f) => f.id === id && f.type === type),
    [favorites],
  );

  const toggleFavorite = useCallback((id: string, type: FavoriteType) => {
    const current = snapshot;
    const exists = current.some((f) => f.id === id && f.type === type);
    const typeLabel = LABELS[type] ?? "Item";

    if (exists) {
      persist(current.filter((f) => !(f.id === id && f.type === type)));
      toast({ title: "Removed from favorites", description: `${typeLabel} removed from your favorites` });
    } else {
      persist([...current, { id, type }]);
      toast({ title: "Added to favorites", description: `${typeLabel} saved to your favorites` });
    }
  }, []);

  const getFavoritesByType = useCallback(
    (type: FavoriteType) => favorites.filter((f) => f.type === type).map((f) => f.id),
    [favorites],
  );

  const clearFavorites = useCallback(() => persist([]), []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
    clearFavorites,
    totalCount: favorites.length,
  };
};

// Helper to generate a consistent ID from title
export const generateId = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Helper to detect platform from link
export const getPlatformFromLink = (link: string): "telegram" | "drive" | "mega" | "other" => {
  if (link.includes("t.me") || link.includes("telegram")) return "telegram";
  if (link.includes("drive.google.com")) return "drive";
  if (link.includes("mega.nz")) return "mega";
  return "other";
};
