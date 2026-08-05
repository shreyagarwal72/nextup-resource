import { useEffect, useMemo, useState } from "react";
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
  KeyRound,
  Trash2,
  Loader2,
  CheckCircle2,
  Database,
  UploadCloud,
  Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { updatePageMeta } from "@/lib/og-image";
import { buildAllContentRows, chunk, downloadContentBackup } from "@/lib/contentExport";


type KeyStatus = { masked: string | null; updated_at: string | null };
type ConfigResponse = {
  keys: Record<string, KeyStatus>;
  env: Record<string, boolean>;
};

const Admin = () => {
  // Always prompt for the password on each visit — never persist it.
  const [pw, setPw] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<ConfigResponse | null>(null);
  const [lovableInput, setLovableInput] = useState("");
  const [deepseekInput, setDeepseekInput] = useState("");
  const [testing, setTesting] = useState(false);

  // Content database sync
  const [stats, setStats] = useState<{ total: number; last_synced: string | null } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const localRows = useMemo(() => buildAllContentRows(), []);


  useEffect(() => {
    updatePageMeta({
      title: "Admin · Nextup Resources",
      description: "Admin-only settings for Nextup Resources.",
      url: "/admin",
    });
  }, []);


  const callAdmin = async (method: "GET" | "POST", payload?: unknown) => {
    const { data, error } = await supabase.functions.invoke("admin-config", {
      method,
      headers: { "x-admin-password": pw },
      body: payload,
    });
    if (error) {
      // supabase-js wraps non-2xx in a generic "Failed to send a request..." message.
      // Try to read the server's actual JSON error via its .context Response.
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
    return data as any;
  };

  const loadConfig = async () => {
    setLoading(true);
    try {
      const data = (await callAdmin("GET")) as ConfigResponse;
      setConfig(data);
      setAuthed(true);
      void loadStats();
    } catch (e: any) {
      setAuthed(false);
      toast.error(e?.message?.includes("401") || /unauth/i.test(e?.message || "")
        ? "Wrong admin password"
        : e?.message || "Failed to load config");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    const updates: Record<string, string> = {};
    if (lovableInput.trim()) updates.LOVABLE_API_KEY = lovableInput.trim();
    if (deepseekInput.trim()) updates.DEEPSEEK_API_KEY = deepseekInput.trim();
    if (!Object.keys(updates).length) {
      toast.info("Nothing to save");
      return;
    }
    setLoading(true);
    try {
      await callAdmin("POST", { updates });
      setLovableInput("");
      setDeepseekInput("");
      await loadConfig();
      toast.success("Keys saved");
    } catch (e: any) {
      toast.error(e?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const clearKey = async (key: string) => {
    if (!confirm(`Clear ${key}?`)) return;
    setLoading(true);
    try {
      await callAdmin("POST", { updates: { [key]: null } });
      await loadConfig();
      toast.success(`${key} cleared`);
    } catch (e: any) {
      toast.error(e?.message || "Failed to clear");
    } finally {
      setLoading(false);
    }
  };

  const callSync = async (method: "GET" | "POST", payload?: unknown) => {
    const { data, error } = await supabase.functions.invoke("content-sync", {
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
          /* ignore */
        }
      }
      throw new Error(error.message || "Request failed");
    }
    if ((data as any)?.error) throw new Error((data as any).error);
    return data as any;
  };

  const loadStats = async () => {
    try {
      const data = await callSync("GET");
      setStats({ total: data?.total ?? 0, last_synced: data?.last_synced ?? null });
    } catch {
      /* stats are best-effort */
    }
  };

  const syncContent = async () => {
    setSyncing(true);
    setProgress(0);
    try {
      const batches = chunk(localRows, 400);
      for (let i = 0; i < batches.length; i++) {
        await callSync("POST", { rows: batches[i] });
        setProgress(Math.round(((i + 1) / batches.length) * 100));
      }
      await loadStats();
      toast.success(`Installed ${localRows.length} items into the database`);
    } catch (e: any) {
      toast.error(e?.message || "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const clearContent = async () => {
    if (!confirm("Delete every content row from the database?")) return;
    setSyncing(true);
    try {
      await callSync("POST", { action: "clear" });
      await loadStats();
      toast.success("Content database cleared");
    } catch (e: any) {
      toast.error(e?.message || "Clear failed");
    } finally {
      setSyncing(false);
    }
  };

  /**
   * Imports content from a JSON file. Three shapes are accepted:
   *  1. a backup export        → { rows: [{ dataset, external_id, payload }] }
   *  2. a dataset map          → { tv_apps: [ ...items ], os_projects: [ ... ] }
   *  3. a bare array of items  → needs the dataset name typed in the box
   */
  const importJson = async (file: File) => {
    setSyncing(true);
    setProgress(0);
    try {
      const parsed = JSON.parse(await file.text());
      let rows: ContentRow[] = [];

      if (Array.isArray(parsed?.rows)) {
        rows = parsed.rows as ContentRow[];
      } else if (Array.isArray(parsed)) {
        const ds = importDataset.trim();
        if (!ds) throw new Error("Type a dataset name for a plain array file");
        rows = rowsFromItems(ds, parsed);
      } else if (parsed && typeof parsed === "object") {
        for (const [ds, items] of Object.entries(parsed)) {
          if (Array.isArray(items)) rows.push(...rowsFromItems(ds, items));
        }
      }

      rows = rows.filter((r) => r?.dataset && r?.external_id);
      if (!rows.length) throw new Error("No importable rows found in that file");

      const batches = chunk(rows, 400);
      for (let i = 0; i < batches.length; i++) {
        await callSync("POST", { rows: batches[i] });
        setProgress(Math.round(((i + 1) / batches.length) * 100));
      }
      await loadStats();
      await refreshContentFromBackend().catch(() => 0);
      toast.success(`Imported ${rows.length} items — pages now serve the new content`);
    } catch (e: any) {
      toast.error(e?.message || "Import failed");
    } finally {
      setSyncing(false);
    }
  };

  const pullFromBackend = async () => {
    setSyncing(true);
    try {
      const n = await refreshContentFromBackend();
      toast.success(n ? `Loaded ${n} items from the database` : "Database is empty");
    } catch (e: any) {
      toast.error(e?.message || "Could not read the database");
    } finally {
      setSyncing(false);
    }
  };


  const test = async () => {

    setTesting(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: [{ role: "user", content: "ping — reply with one word" }] },
      });
      if (error) throw new Error(error.message);
      if ((data as any)?.error) throw new Error((data as any).error);
      toast.success(`OK — answered by ${(data as any)?.provider || "unknown"}`);
    } catch (e: any) {
      toast.error(e?.message || "Test failed");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12 dot-grid">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 pt-24 sm:pt-28">
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
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">Admin · API keys</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Manage the Lovable AI and DeepSeek keys used by the chat backend. Keys are stored
            server-side and never sent to the browser.
          </p>

          {!authed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loadConfig();
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
            <div className="space-y-6">
              {/* Status */}
              <div className="grid sm:grid-cols-2 gap-3">
                {(["LOVABLE_API_KEY", "DEEPSEEK_API_KEY"] as const).map((k) => {
                  const status = config?.keys[k];
                  const inEnv = config?.env[k];
                  const set = !!status?.masked || !!inEnv;
                  return (
                    <div
                      key={k}
                      className="border-2 border-foreground/30 rounded-xl p-3 bg-background/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm flex items-center gap-2">
                          <KeyRound className="w-4 h-4" />
                          {k === "LOVABLE_API_KEY" ? "Lovable AI" : "DeepSeek"}
                        </div>
                        {set && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary">
                            <CheckCircle2 className="w-3.5 h-3.5" /> set
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        {status?.masked ?? (inEnv ? "(from environment)" : "not configured")}
                      </div>
                      {status?.masked && (
                        <button
                          onClick={() => clearKey(k)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-destructive hover:underline"
                        >
                          <Trash2 className="w-3 h-3" /> Clear stored value
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Edit */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="lov">New Lovable AI key</Label>
                  <Input
                    id="lov"
                    type="password"
                    placeholder="Paste new key to replace"
                    value={lovableInput}
                    onChange={(e) => setLovableInput(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ds">New DeepSeek key</Label>
                  <Input
                    id="ds"
                    type="password"
                    placeholder="Paste new key to replace"
                    value={deepseekInput}
                    onChange={(e) => setDeepseekInput(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={save} disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save changes"}
                  </Button>
                  <Button variant="outline" onClick={test} disabled={testing}>
                    {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Test chat"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setPw("");
                      setAuthed(false);
                      setConfig(null);
                    }}
                  >
                    Lock
                  </Button>
                </div>
              </div>

              {/* Content database */}
              <div className="border-t-2 border-dashed border-foreground/30 pt-5">
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-4 h-4" />
                  <h2 className="font-heading text-lg font-extrabold">Content database</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Install every piece of website content (courses, resources, ebooks, apps,
                  websites, bundles, AI tools, FOSS, Material You, Shizuku, Telegram bots, TV apps, operating systems)
                  into the backend so it can be queried or backed up.
                </p>

                <div className="rounded-xl border-2 border-foreground/30 bg-background/50 p-3 text-sm">
                  <div className="flex items-center justify-between font-bold">
                    <span>In backend</span>
                    <span>{stats ? stats.total : "—"} rows</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <span>On this build</span>
                    <span>{localRows.length} rows</span>
                  </div>
                  {stats?.last_synced && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Last sync: {new Date(stats.last_synced).toLocaleString()}
                    </div>
                  )}
                  {syncing && (
                    <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden border-2 border-foreground/30">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Button onClick={syncContent} disabled={syncing}>
                    {syncing ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Installing… {progress}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <UploadCloud className="w-4 h-4" /> Install all content
                      </span>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => downloadContentBackup()}>
                    <Download className="w-4 h-4 mr-2" /> Download JSON backup
                  </Button>
                  <Button variant="ghost" onClick={clearContent} disabled={syncing}>
                    <Trash2 className="w-4 h-4 mr-2" /> Clear database
                  </Button>
                </div>
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
