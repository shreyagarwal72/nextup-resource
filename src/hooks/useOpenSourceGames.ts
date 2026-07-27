import { useEffect, useState } from "react";

export interface GameEntry {
  name: string;
  url: string;
  description: string;
}

export type GamesData = Record<string, GameEntry[]>;

// Hosted on Vanshu's own repo (same pattern as public-apis.json /
// telegram-bots.json) so the list can be refreshed without a redeploy —
// just push a new open-source-games.json to the repo root.
const SOURCE_URL =
  "https://raw.githubusercontent.com/shreyagarwal72/nextup-resource/main/open-source-games.json";

const CACHE_KEY = "openSourceGamesCache_v1";
const TTL = 1000 * 60 * 60 * 24; // 24h — dataset barely changes day to day

interface CacheEntry {
  t: number;
  v: GamesData;
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(v: GamesData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v }));
  } catch {
    /* ignore — quota or private mode */
  }
}

interface State {
  loading: boolean;
  error: boolean;
  data: GamesData | null;
}

export function useOpenSourceGames(): State {
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
      .then((d: GamesData) => {
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
