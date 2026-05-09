// api/chat.ts
// Vercel serverless function: Resourcly assistant via Bytez AI.
// Requires BYTEZ_API_KEY env var on Vercel dashboard.

const SYSTEM_PROMPT = `You are Resourcly, the helpful assistant for Nextup Resources (https://nextup-resource.vercel.app) — a curated learning platform by Nextup Studio. You help users find content across:
- Courses (/courses): 50+ premium courses on AI, hacking, GST, English, trading, etc.
- Resources (/resources): Free downloadable packs — BMW clips, meme packs, Instagram hooks, motivation reels, prompt collections
- Ebooks (/ebooks): Curated ebooks for self-improvement and professional growth
- Apps (/apps): Handpicked productivity and entertainment tools
- AI Tools (/ai): 50+ AI-powered tools directory
- FOSS Apps (/foss-apps): 700+ free & open-source Android apps
- Shizuku Apps (/shizuku-apps): Power Android apps without root via Shizuku
- Morphe Builds (/morphe): Patched Android app builds from nullcpy/rvb
- Material You Apps (/material-you): 1100+ Material You designed apps
- Placement (/special-courses): Company-prep bundles
- Favorites (/favorites): Saved items across all categories
- FAQ (/faq): Common questions
- Install (/install): PWA install guide
- Contact (/contact): Reach Nextup Studio

Features: Dark mode, Study Mode, Global Search, PWA offline support, Favorites system.

Be concise and helpful. Guide users to the right section.`;

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const apiKey = process.env.BYTEZ_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "BYTEZ_API_KEY not configured" });
      return;
    }

    const upstream = await fetch(
      "https://api.bytez.com/models/v2/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3-4b-it",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!upstream.ok) {
      const t = await upstream.text();
      if (upstream.status === 429) {
        res.status(429).json({ error: "Too many requests — please slow down." });
        return;
      }
      if (upstream.status === 402) {
        res.status(402).json({ error: "AI quota exceeded — try again later." });
        return;
      }
      res.status(500).json({ error: `Upstream error: ${t.slice(0, 200)}` });
      return;
    }

    const data = await upstream.json();
    const reply = data.choices?.[0]?.message?.content ?? "";
    res.status(200).json({ reply });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Unknown error" });
  }
}