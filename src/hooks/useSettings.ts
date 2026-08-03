import { useCallback, useSyncExternalStore } from "react";

/** Site-wide feature toggles, persisted locally and synced across components/tabs. */
export type Settings = {
  /** Vibration feedback on taps (Android). */
  haptics: boolean;
  /** Show text labels under every icon in the mobile bottom nav. */
  navLabels: boolean;
  /** Animations & transitions across the site. */
  animations: boolean;
  /** Show the floating Resourcely chat launcher. */
  chatWidget: boolean;
  /** Show the scroll-to-top button. */
  scrollTopButton: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  haptics: true,
  navLabels: true,
  animations: true,
  chatWidget: true,
  scrollTopButton: true,
};

const STORAGE_KEY = "nextup-settings-v1";
const EVENT = "nextup:settings-changed";

const load = (): Settings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

/**
 * Single shared snapshot so every component that reads settings re-renders
 * from the *same* object. (Per-component useState copies used to drift apart,
 * which is why toggles appeared to do nothing on other pages/components.)
 */
let snapshot: Settings = load();
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

const getSnapshot = () => snapshot;
const getServerSnapshot = () => DEFAULT_SETTINGS;

export const readSettings = (): Settings => snapshot;

export const writeSettings = (next: Settings) => {
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  emit();
  try {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  } catch {
    /* ignore */
  }
};

export const useSettings = () => {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    writeSettings({ ...snapshot, [key]: value });
  }, []);

  const toggle = useCallback((key: keyof Settings) => {
    writeSettings({ ...snapshot, [key]: !snapshot[key] });
  }, []);

  const reset = useCallback(() => writeSettings({ ...DEFAULT_SETTINGS }), []);

  return { settings, setSetting, toggle, reset };
};
