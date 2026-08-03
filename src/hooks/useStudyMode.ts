import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "nextup-study-mode";

const load = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

/** Shared snapshot so the header toggle, banner and every page stay in sync. */
let snapshot = load();
const listeners = new Set<() => void>();

const applyClass = (on: boolean) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("study-mode", on);
  document.documentElement.classList.toggle("study-banner-active", on);
};
applyClass(snapshot);

const emit = () => listeners.forEach((l) => l());

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  const onExternal = () => {
    snapshot = load();
    applyClass(snapshot);
    emit();
  };
  window.addEventListener("storage", onExternal);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onExternal);
  };
};

const set = (on: boolean) => {
  snapshot = on;
  try {
    localStorage.setItem(STORAGE_KEY, String(on));
  } catch {
    /* ignore */
  }
  applyClass(on);
  emit();
};

export const useStudyMode = () => {
  const isStudyMode = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => false,
  );

  const toggleStudyMode = useCallback(() => set(!snapshot), []);
  const enableStudyMode = useCallback(() => set(true), []);
  const disableStudyMode = useCallback(() => set(false), []);

  return { isStudyMode, toggleStudyMode, enableStudyMode, disableStudyMode };
};
