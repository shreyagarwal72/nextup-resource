import { useEffect, useState } from "react";

export interface RepoInfo {
  description?: string;
  stars?: number;
  language?: string;
  topics?: string[];
}

export interface RepoInfoState {
  loading: boolean;
  info: RepoInfo | null;
}

const CACHE_KEY = "ghRepoInfoCache_v2";
const TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

type CacheEntry = { t: number; v: RepoInfo };
type Cache = Record<string, CacheEntry>;

function readCache(): Cache {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeCache(c: Cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
}

type Source =
  | { kind: "github"; owner: string; repo: string }
  | { kind: "gitlab"; path: string }
  | { kind: "codeberg"; owner: string; repo: string }
  | null;

function parseSource(url: string): Source {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\/+|\/+$/g, "");
    if (!path) return null;
    if (u.hostname === "github.com") {
      const [owner, repo] = path.split("/");
      if (!owner || !repo) return null;
      return { kind: "github", owner, repo: repo.replace(/\.git$/, "") };
    }
    if (u.hostname === "gitlab.com") {
      // take only first 2-3 segments before things like /-/
      const cleaned = path.split("/-/")[0];
      if (!cleaned.includes("/")) return null;
      return { kind: "gitlab", path: cleaned.replace(/\.git$/, "") };
    }
    if (u.hostname === "codeberg.org") {
      const [owner, repo] = path.split("/");
      if (!owner || !repo) return null;
      return { kind: "codeberg", owner, repo: repo.replace(/\.git$/, "") };
    }
    return null;
  } catch {
    return null;
  }
}

function endpoint(src: NonNullable<Source>): string {
  if (src.kind === "github") return `https://api.github.com/repos/${src.owner}/${src.repo}`;
  if (src.kind === "gitlab")
    return `https://gitlab.com/api/v4/projects/${encodeURIComponent(src.path)}`;
  return `https://codeberg.org/api/v1/repos/${src.owner}/${src.repo}`;
}

function normalize(src: NonNullable<Source>, d: any): RepoInfo {
  if (src.kind === "github") {
    return {
      description: d.description ?? undefined,
      stars: d.stargazers_count,
      language: d.language ?? undefined,
      topics: d.topics ?? [],
    };
  }
  if (src.kind === "gitlab") {
    return {
      description: d.description ?? undefined,
      stars: d.star_count,
      language: undefined,
      topics: d.topics ?? d.tag_list ?? [],
    };
  }
  return {
    description: d.description ?? undefined,
    stars: d.stars_count,
    language: d.language ?? undefined,
    topics: [],
  };
}

export function useGithubRepoInfo(url: string, enabled = true): RepoInfoState {
  const [state, setState] = useState<RepoInfoState>({ loading: false, info: null });

  useEffect(() => {
    if (!enabled) {
      setState({ loading: false, info: null });
      return;
    }
    const src = parseSource(url);
    if (!src) {
      setState({ loading: false, info: null });
      return;
    }
    const key = `${src.kind}:${src.kind === "gitlab" ? src.path : `${(src as any).owner}/${(src as any).repo}`}`;
    const cache = readCache();
    const hit = cache[key];
    if (hit && Date.now() - hit.t < TTL) {
      setState({ loading: false, info: hit.v });
      return;
    }
    setState({ loading: true, info: null });
    let cancelled = false;
    fetch(endpoint(src))
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return;
        if (!d) {
          setState({ loading: false, info: null });
          return;
        }
        const v = normalize(src, d);
        setState({ loading: false, info: v });
        const c = readCache();
        c[key] = { t: Date.now(), v };
        writeCache(c);
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, info: null });
      });
    return () => {
      cancelled = true;
    };
  }, [url, enabled]);

  return state;
}
