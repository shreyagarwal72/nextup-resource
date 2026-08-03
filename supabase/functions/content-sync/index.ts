// Content sync — admin-only import of the entire site catalog into `site_content`.
// Auth: `x-admin-password` header must match the ADMIN_PASSWORD secret.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

type Row = {
  dataset: string;
  external_id: string;
  title?: string | null;
  category?: string | null;
  url?: string | null;
  payload?: unknown;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword) return json({ error: "ADMIN_PASSWORD not configured" }, 500);
  const provided = req.headers.get("x-admin-password") || "";
  if (!provided || !safeEqual(provided, adminPassword)) return json({ error: "Unauthorized" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("site_content")
        .select("dataset,updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      const counts: Record<string, number> = {};
      for (const row of data ?? []) counts[row.dataset] = (counts[row.dataset] ?? 0) + 1;
      return json({
        total: data?.length ?? 0,
        counts,
        last_synced: data?.[0]?.updated_at ?? null,
      });
    }

    if (req.method === "POST") {
      const body = await req.json();

      if (body?.action === "clear") {
        const { error } = await supabase.from("site_content").delete().neq("dataset", "___none___");
        if (error) throw error;
        return json({ ok: true, cleared: true });
      }

      const rows = (body?.rows ?? []) as Row[];
      if (!Array.isArray(rows) || rows.length === 0) return json({ error: "No rows" }, 400);
      if (rows.length > 1000) return json({ error: "Batch too large (max 1000)" }, 400);

      const clean = rows
        .filter((r) => r && typeof r.dataset === "string" && typeof r.external_id === "string")
        .map((r) => ({
          dataset: r.dataset.slice(0, 64),
          external_id: r.external_id.slice(0, 300),
          title: r.title ? String(r.title).slice(0, 500) : null,
          category: r.category ? String(r.category).slice(0, 200) : null,
          url: r.url ? String(r.url).slice(0, 2000) : null,
          payload: r.payload ?? {},
          updated_at: new Date().toISOString(),
        }));

      const { error } = await supabase
        .from("site_content")
        .upsert(clean, { onConflict: "dataset,external_id" });
      if (error) throw error;

      return json({ ok: true, upserted: clean.length });
    }

    return json({ error: "Method not allowed" }, 405);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
