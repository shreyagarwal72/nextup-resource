import { useEffect, useState } from "react";

export interface AllInOneEntry {
  name: string;
  url: string;
  description: string;
}

export type AllInOneData = Record<string, AllInOneEntry[]>;

const SOURCE_URL =
  "https://raw.githubusercontent.com/shreyagarwal72/nextup-resource/main/all-in-one.json";

const CACHE_KEY = "allInOneCache_v1";
const TTL = 1000 * 60 * 60 * 24; // 24h

interface CacheEntry {
  t: number;
  v: AllInOneData;
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(v: AllInOneData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v }));
  } catch {
    /* ignore — quota or private mode */
  }
}

interface State {
  loading: boolean;
  error: boolean;
  data: AllInOneData | null;
}

export function useAllInOne(): State {
  const [state, setState] = useState<State>({ loading: true, error: false, data: null });

  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.t < TTL) {
      setState({ loading: false, error: false, data: cached.v });
      return;
    }

    let cancelled = false;
    fetch(SOURCE_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((d: AllInOneData) => {
        if (cancelled) return;
        writeCache(d);
        setState({ loading: false, error: false, data: d });
      })
      .catch(() => {
        if (cancelled) return;
        if (cached) {
          setState({ loading: false, error: false, data: cached.v });
        } else {
          setState({ loading: false, error: true, data: null });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
