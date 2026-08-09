import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShieldCheck,
  Loader2,
  Database,
  UploadCloud,
  Download,
  RefreshCw,
  Trash2,
  Search,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { chunk, downloadDatasetBackup, rowsFromItems } from "@/lib/contentExport";
import {
  refreshContentFromBackend,
  DATASETS,
  DATASET_LABELS,
} from "@/lib/contentBridge";

type Counts = Record<string, number>;

const Admin = () => {
  // Always prompt for the password on each visit — never persist it.
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<Counts>({});
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState("");
  const importRef = useRef<HTMLInputElement>(null);
  const importTarget = useRef<{ dataset: string; mode: "merge" | "replace" }>({
    dataset: "",
    mode: "merge",
  });

  // Title/description/canonical are set centrally by <SEOManager />, which
  // also marks this route noindex — see the "admin" entry in
  // pageSEOConfigs (src/lib/og-image.ts). Previously this page set its own
  // meta tags without noindex, so the admin panel URL was indexable.

  const callSync = async (method: "GET" | "POST", payload?: unknown, query = "") => {
    const { data, error } = await supabase.functions.invoke(`content-sync${query}`, {
      method,
      headers: { "x-admin-password": pw },
      body: payload,
    });
    if (error) {
      const ctx = (error as any)?.context;
      if (ctx && typeof ctx.json === "function") {
        try {
          const body = await ctx.json();
          if (body?.error) throw new Error(body.error);
        } catch {
          /* fall through */
        }
      }
      if (ctx?.status === 401) throw new Error("Unauthorized — wrong admin password");
      throw new Error(error.message || "Request failed");
    }
    if ((data as any)?.error) throw new Error((data as any).error);
    return data as any;
  };

  const loadStats = async () => {
    const data = await callSync("GET");
    setCounts(data?.counts ?? {});
    setLastSynced(data?.last_synced ?? null);
  };

  const unlock = async () => {
    setLoading(true);
    try {
      await loadStats();
      setAuthed(true);
    } catch (e: any) {
      setAuthed(false);
      toast.error(e?.message || "Failed to unlock");
    } finally {
      setLoading(false);
    }
  };

  /** Downloads one page's content straight from the backend. */
  const exportDataset = async (dataset: string) => {
    setBusy(dataset);
    try {
      const data = await callSync("GET", undefined, `?dataset=${encodeURIComponent(dataset)}`);
      const items = (data?.items ?? []) as unknown[];
      if (!items.length) {
        toast.info("That page has no content in the database yet");
        return;
      }
      downloadDatasetBackup(dataset, items);
      toast.success(`Exported ${items.length} items from ${dataset}`);
    } catch (e: any) {
      toast.error(e?.message || "Export failed");
    } finally {
      setBusy(null);
    }
  };

  /**
   * Imports one page's content. The file must be a plain JSON array of items
   * (the exact shape `Export` produces) or `{ items: [...] }`.
   *  - merge   → adds/updates the items, leaves the rest of the page alone
   *  - replace → clears just that page first, then uploads
   */
  const importDataset = async (file: File) => {
    const { dataset, mode } = importTarget.current;
    setBusy(dataset);
    setProgress(0);
    try {
      const parsed = JSON.parse(await file.text());
      const items: any[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.items)
          ? parsed.items
          : Array.isArray(parsed?.rows)
            ? parsed.rows.map((r: any) => r?.payload ?? r)
            : [];
      if (!items.length) throw new Error("That file has no items in it");

      const rows = rowsFromItems(dataset, items).filter((r) => r.external_id);
      if (mode === "replace") await callSync("POST", { action: "clear_dataset", dataset });

      const batches = chunk(rows, 400);
      for (let i = 0; i < batches.length; i++) {
        await callSync("POST", { rows: batches[i] });
        setProgress(Math.round(((i + 1) / batches.length) * 100));
      }
      await loadStats();
      await refreshContentFromBackend().catch(() => 0);
      toast.success(`${mode === "replace" ? "Replaced" : "Updated"} ${dataset} with ${rows.length} items`);
    } catch (e: any) {
      toast.error(e?.message || "Import failed");
    } finally {
      setBusy(null);
      setProgress(0);
    }
  };

  const clearDataset = async (dataset: string) => {
    if (!confirm(`Delete all content for “${DATASET_LABELS[dataset] ?? dataset}”?\n\nOnly this page is affected.`))
      return;
    setBusy(dataset);
    try {
      await callSync("POST", { action: "clear_dataset", dataset });
      await loadStats();
      await refreshContentFromBackend().catch(() => 0);
      toast.success(`Cleared ${dataset}`);
    } catch (e: any) {
      toast.error(e?.message || "Clear failed");
    } finally {
      setBusy(null);
    }
  };

  const pullFromBackend = async () => {
    setBusy("__pull__");
    try {
      const n = await refreshContentFromBackend();
      toast.success(n ? `Loaded ${n} items into the site` : "Database is empty");
    } catch (e: any) {
      toast.error(e?.message || "Could not read the database");
    } finally {
      setBusy(null);
    }
  };

  const openImport = (dataset: string, mode: "merge" | "replace") => {
    importTarget.current = { dataset, mode };
    importRef.current?.click();
  };

  const visible = DATASETS.filter(
    (d) =>
      !filter.trim() ||
      d.includes(filter.toLowerCase()) ||
      (DATASET_LABELS[d] ?? "").toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="min-h-screen pb-24 md:pb-12 dot-grid">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pt-24 sm:pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>

        <div className="bg-card border-2 border-foreground/80 rounded-2xl shadow-pop p-5 sm:p-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary border-2 border-foreground/80 shadow-pop flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">Admin · Content</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Every page on the site reads its content from the database. Manage one page at a time —
            export it, edit the JSON, and upload it back.
          </p>

          {!authed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void unlock();
              }}
              className="space-y-3"
            >
              <Label htmlFor="pw">Admin password</Label>
              <Input
                id="pw"
                type="password"
                autoComplete="current-password"
                placeholder="Enter admin password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                aria-label="Admin password"
                autoFocus
              />
              <Button type="submit" disabled={!pw || loading} className="w-full">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unlock"}
              </Button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Find a page…"
                    className="pl-9"
                    aria-label="Find a page"
                  />
                </div>
                <Button variant="outline" onClick={pullFromBackend} disabled={!!busy}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${busy === "__pull__" ? "animate-spin" : ""}`} />
                  Refresh site
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setPw("");
                    setAuthed(false);
                    setCounts({});
                  }}
                >
                  Lock
                </Button>
              </div>

              {lastSynced && (
                <p className="text-xs text-muted-foreground">
                  Last change: {new Date(lastSynced).toLocaleString()}
                </p>
              )}

              <input
                ref={importRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void importDataset(f);
                  e.target.value = "";
                }}
              />

              <div className="space-y-3">
                {visible.map((dataset) => {
                  const working = busy === dataset;
                  return (
                    <div
                      key={dataset}
                      className="rounded-2xl border-2 border-foreground/30 bg-background/50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-heading font-extrabold leading-tight">
                            {DATASET_LABELS[dataset] ?? dataset}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">{dataset}</p>
                        </div>
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full border-2 border-foreground/30 px-2.5 py-1 text-xs font-bold">
                          <Database className="w-3.5 h-3.5" />
                          {counts[dataset] ?? 0}
                        </span>
                      </div>

                      {working && progress > 0 && (
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full border-2 border-foreground/30 bg-muted">
                          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" disabled={!!busy} onClick={() => exportDataset(dataset)}>
                          {working ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                          Export
                        </Button>
                        <Button size="sm" disabled={!!busy} onClick={() => openImport(dataset, "merge")}>
                          <UploadCloud className="w-4 h-4 mr-2" /> Add / update
                        </Button>
                        <Button size="sm" variant="outline" disabled={!!busy} onClick={() => openImport(dataset, "replace")}>
                          <UploadCloud className="w-4 h-4 mr-2" /> Replace page
                        </Button>
                        <Button size="sm" variant="ghost" disabled={!!busy} onClick={() => clearDataset(dataset)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Clear page
                        </Button>
                      </div>
                    </div>
                  );
                })}
                {!visible.length && (
                  <p className="text-sm text-muted-foreground">No page matches that search.</p>
                )}
              </div>

              <div className="rounded-2xl border-2 border-dashed border-foreground/30 p-4 text-sm text-muted-foreground">
                <p className="font-heading font-extrabold text-foreground">JSON format</p>
                <p className="mt-1">
                  Upload a plain array of items for that page — exactly what <b>Export</b> gives you.
                  “Add / update” keeps existing items and overwrites matching ones; “Replace page”
                  wipes only that page first. Items are matched by their title/slug.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Admin;
