import { useEffect, useState } from "react";

export interface PublicApiEntry {
  name: string;
  url: string;
  description: string;
  auth: string;
  https: string;
  cors: string;
}

export type PublicApiData = Record<string, PublicApiEntry[]>;

// Hosted on Vanshu's own repo (same pattern as telegram-bots.json) so the
// list can be updated/refreshed without a redeploy — just push a new
// public-apis.json to the repo root.
const SOURCE_URL =
  "https://raw.githubusercontent.com/shreyagarwal72/nextup-resource/main/public-apis.json";

const CACHE_KEY = "publicApisCache_v1";
const TTL = 1000 * 60 * 60 * 24; // 24h — dataset barely changes day to day

interface CacheEntry {
  t: number;
  v: PublicApiData;
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(v: PublicApiData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v }));
  } catch {
    /* ignore — quota or private mode */
  }
}

interface State {
  loading: boolean;
  error: boolean;
  data: PublicApiData | null;
}

export function usePublicApis(): State {
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
      .then((d: PublicApiData) => {
        if (cancelled) return;
        writeCache(d);
        setState({ loading: false, error: false, data: d });
      })
      .catch(() => {
        if (cancelled) return;
        // Fall back to a stale cache if we have one, rather than a hard error
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
