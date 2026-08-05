import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";
import SearchBox from "@/components/SearchBox";
import { ArrowLeft, Plug, ExternalLink, SearchX, ChevronDown, ShieldCheck, Lock, Globe2 } from "lucide-react";
import { usePublicApis, type PublicApiEntry } from "@/hooks/usePublicApis";
import { useDebounced } from "@/hooks/useDebounced";

const ROWS_COLLAPSED = 8;

const Badge = ({ label, tone }: { label: string; tone: "on" | "off" | "neutral" }) => {
  const cls =
    tone === "on"
      ? "bg-quaternary/15 text-quaternary border-quaternary/40"
      : tone === "off"
      ? "bg-destructive/10 text-destructive border-destructive/30"
      : "bg-muted text-muted-foreground border-foreground/20";
  return (
    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${cls} whitespace-nowrap`}>
      {label}
    </span>
  );
};

const authTone = (auth: string) => (auth.toLowerCase() === "no" ? "off" : "neutral") as "off" | "neutral";
const boolTone = (val: string) =>
  (val.toLowerCase() === "yes" ? "on" : val.toLowerCase() === "no" ? "off" : "neutral") as "on" | "off" | "neutral";

type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

// Static class lookup — Tailwind can't pick up `bg-${accent}`-style interpolated
// strings at build time, so every accent needs its own literal entry here.
const accentClasses: Record<Accent, { text: string; bg: string }> = {
  primary: { text: "text-primary", bg: "bg-primary" },
  secondary: { text: "text-secondary", bg: "bg-secondary" },
  tertiary: { text: "text-tertiary", bg: "bg-tertiary" },
  quaternary: { text: "text-quaternary", bg: "bg-quaternary" },
};

const CategorySection = ({
  category,
  apis,
  expanded,
  onToggle,
  accent,
}: {
  category: string;
  apis: PublicApiEntry[];
  expanded: boolean;
  onToggle: () => void;
  accent: Accent;
}) => {
  const shown = expanded ? apis : apis.slice(0, ROWS_COLLAPSED);
  const { text: accentText, bg: accentBg } = accentClasses[accent];

  return (
    <div id={category.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()} className="mb-8 scroll-mt-24">
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${accentBg}`} />
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-foreground">{category}</h2>
        <span className="text-xs font-bold text-muted-foreground px-2 py-0.5 rounded-full border-2 border-foreground/20">
          {apis.length}
        </span>
      </div>

      <div className="pop-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-foreground/10 bg-muted/40">
                <th className="text-left font-bold text-foreground px-4 py-3 whitespace-nowrap">API</th>
                <th className="text-left font-bold text-foreground px-4 py-3 hidden sm:table-cell">Description</th>
                <th className="text-center font-bold text-foreground px-3 py-3 whitespace-nowrap">Auth</th>
                <th className="text-center font-bold text-foreground px-3 py-3 whitespace-nowrap hidden xs:table-cell">HTTPS</th>
                <th className="text-center font-bold text-foreground px-3 py-3 whitespace-nowrap hidden sm:table-cell">CORS</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((api, i) => (
                <tr
                  key={`${api.name}-${i}`}
                  className="border-b border-foreground/10 last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <td className="px-4 py-3 align-top">
                    <a
                      href={api.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 font-bold ${accentText} hover:underline underline-offset-4`}
                    >
                      {api.name}
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                    </a>
                    <QuickFavorite name={api.name} type="api" className="ml-1 align-middle" />

                    <p className="text-xs text-muted-foreground mt-0.5 sm:hidden">{api.description}</p>
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground hidden sm:table-cell">
                    {api.description}
                  </td>
                  <td className="px-3 py-3 align-top text-center">
                    <Badge label={api.auth} tone={authTone(api.auth)} />
                  </td>
                  <td className="px-3 py-3 align-top text-center hidden xs:table-cell">
                    <Badge label={api.https} tone={boolTone(api.https)} />
                  </td>
                  <td className="px-3 py-3 align-top text-center hidden sm:table-cell">
                    <Badge label={api.cors} tone={boolTone(api.cors)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {apis.length > ROWS_COLLAPSED && (
        <div className="text-center mt-3">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border-2 border-foreground/80 bg-card hover:-translate-y-0.5 shadow-pop-soft transition-all"
          >
            {expanded ? "Show less" : `Show all ${apis.length}`}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
};

const accents: Accent[] = ["primary", "secondary", "tertiary", "quaternary"];

const ApiHub = () => {
  const { loading, error, data } = usePublicApis();
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query, 200);
  const [activeCat, setActiveCat] = useState<string>("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = "API Hub — Free Public APIs for Developers";
  }, []);

  const categories = useMemo(() => (data ? Object.keys(data) : []), [data]);

  const totalCount = useMemo(
    () => (data ? Object.values(data).reduce((sum, list) => sum + list.length, 0) : 0),
    [data]
  );

  const filtered = useMemo(() => {
    if (!data) return {} as Record<string, PublicApiEntry[]>;
    const q = debounced.trim().toLowerCase();
    const result: Record<string, PublicApiEntry[]> = {};
    for (const cat of categories) {
      if (activeCat !== "All" && activeCat !== cat) continue;
      let list = data[cat];
      if (q) {
        list = list.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q) ||
            cat.toLowerCase().includes(q)
        );
      }
      if (list.length > 0) result[cat] = list;
    }
    return result;
  }, [data, categories, activeCat, debounced]);

  const filteredCount = useMemo(
    () => Object.values(filtered).reduce((sum, list) => sum + list.length, 0),
    [filtered]
  );

  const toggleExpand = (cat: string) =>
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>
        <section className="pt-32 pb-8 dot-grid violet-haze">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary text-primary-foreground border-2 border-foreground/80 shadow-pop font-bold text-sm">
                <Plug className="w-4 h-4" strokeWidth={2.5} />
                <span>API Hub</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-1 font-heading">
                🔌 Try Public APIs for Free
              </h1>
              <SquigglyUnderline color="hsl(var(--primary))" width={300} />
              <p className="text-lg text-muted-foreground mt-5">
                A curated catalog of free public APIs across every domain — sourced from the community-maintained{" "}
                <a
                  href="https://github.com/public-apis/public-apis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-wavy underline-offset-4"
                >
                  public-apis
                </a>{" "}
                list.
              </p>

              <div className="mt-7 max-w-xl mx-auto">
                <SearchBox
                  value={query}
                  onChange={setQuery}
                  placeholder="Search APIs by name or description..."
                  ariaLabel="Search public APIs"
                />
              </div>

              {!loading && !error && (
                <div className="mt-5 flex flex-wrap justify-center gap-2 max-h-32 overflow-y-auto px-2">
                  {["All", ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCat(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 border-foreground/80 transition-all ${
                        activeCat === cat
                          ? "bg-primary text-primary-foreground shadow-pop"
                          : "bg-card text-foreground hover:-translate-y-0.5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {!loading && !error && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-foreground/30 text-xs font-bold text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {filteredCount} of {totalCount} APIs
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {loading && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-8 h-8 mx-auto mb-4 rounded-full border-4 border-foreground/20 border-t-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Loading the API catalog…</p>
              </div>
            )}

            {error && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-destructive/10 text-destructive border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                  <Globe2 className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Couldn't load the catalog</h3>
                <p className="text-sm text-muted-foreground">
                  The API list couldn't be fetched right now. Check your connection and try again shortly.
                </p>
              </div>
            )}

            {!loading && !error && Object.keys(filtered).length === 0 && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-tertiary text-tertiary-foreground border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                  <SearchX className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">No APIs found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try a different keyword or pick another category to explore.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveCat("All");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform text-sm"
                >
                  Reset filters
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              Object.entries(filtered).map(([cat, apis], i) => (
                <CategorySection
                  key={cat}
                  category={cat}
                  apis={apis}
                  expanded={!!expanded[cat] || !!debounced.trim()}
                  onToggle={() => toggleExpand(cat)}
                  accent={accents[i % accents.length]}
                />
              ))}

            {!loading && !error && Object.keys(filtered).length > 0 && (
              <div className="max-w-3xl mx-auto mt-4 p-6 bg-card border-2 border-foreground/80 rounded-2xl shadow-pop text-center">
                <p className="text-base font-bold text-foreground font-heading">
                  Catalog sourced from{" "}
                  <a
                    href="https://github.com/public-apis/public-apis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline decoration-wavy underline-offset-4"
                  >
                    public-apis/public-apis
                  </a>{" "}
                  — a community-maintained list of free public APIs. ❤️
                </p>
              </div>
            )}

            <div className="text-center mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/apps"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card text-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Back to apps
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </div>
  );
};

export default ApiHub;
