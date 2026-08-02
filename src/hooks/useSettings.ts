import { useCallback, useEffect, useState } from "react";

/** Site-wide feature toggles, persisted locally and synced across components/tabs. */
export type Settings = {
  /** Vibration feedback on taps (Android). */
  haptics: boolean;
  /** Show text labels next to icons in the mobile bottom nav. */
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

export const readSettings = (): Settings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const writeSettings = (next: Settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(readSettings);

  useEffect(() => {
    const sync = () => setSettings(readSettings());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    const next = { ...readSettings(), [key]: value };
    setSettings(next);
    writeSettings(next);
  }, []);

  const toggle = useCallback((key: keyof Settings) => {
    const current = readSettings();
    const next = { ...current, [key]: !current[key] };
    setSettings(next);
    writeSettings(next);
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    writeSettings(DEFAULT_SETTINGS);
  }, []);

  return { settings, setSetting, toggle, reset };
};
