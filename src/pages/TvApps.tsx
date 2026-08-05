import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";
import SearchBox from "@/components/SearchBox";
import CopyLinkButton from "@/components/CopyLinkButton";
import { ArrowLeft, Tv, Sparkles, SearchX, ExternalLink } from "lucide-react";
import { tvApps, tvCategories } from "@/data/tvApps";
import { useDebounced } from "@/hooks/useDebounced";
import { toast } from "sonner";

const PAGE_SIZE = 40;

const FLAG_LABELS: Record<string, string> = {
  "🖱️": "Partial remote",
  "📺": "No TV icon",
  "🤖": "Root required",
  "🚫": "Incompatible some",
  "⚠️": "Non-free bits",
  "💰": "Paid features",
  "🛑": "Dev stopped",
};

const linkColor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("source")) return "bg-primary text-primary-foreground";
  if (l.includes("f-droid") || l.includes("izzy")) return "bg-tertiary text-tertiary-foreground";
  if (l.includes("play")) return "bg-secondary text-secondary-foreground";
  if (l.includes("website")) return "bg-quaternary text-quaternary-foreground";
  return "bg-card text-foreground";
};

const parseFlags = (raw: string) =>
  Array.from(raw).filter((c) => FLAG_LABELS[c]);

const TvApps = () => {
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query, 200);
  const [activeCat, setActiveCat] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    document.title = "Android TV FOSS Apps — Nextup Resources";
  }, []);

  const categories = useMemo(() => ["All", ...tvCategories], []);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return tvApps.filter((a) => {
      if (activeCat !== "All" && a.category !== activeCat) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    });
  }, [debounced, activeCat]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [debounced, activeCat]);

  const shown = filtered.slice(0, visible);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisible((v) => v + PAGE_SIZE);
      setLoadingMore(false);
    }, 300);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>
        <section className="pt-32 pb-8 dot-grid violet-haze">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-secondary text-secondary-foreground border-2 border-foreground/80 shadow-pop font-bold text-sm">
                <Tv className="w-4 h-4" strokeWidth={2.5} />
                <span>Android TV</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-1 font-heading">
                📺 Android TV FOSS Apps
              </h1>
              <SquigglyUnderline color="hsl(var(--secondary))" width={300} />
              <p className="text-lg text-muted-foreground mt-5">
                A curated collection of open-source Android TV apps — launchers, players, browsers,
                and utilities — sourced from{" "}
                <a
                  href="https://github.com/Generator/Awesome-Android-TV-FOSS-Apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-wavy underline-offset-4"
                >
                  Awesome-Android-TV-FOSS-Apps
                </a>
                .
              </p>

              <div className="mt-7 max-w-xl mx-auto">
                <SearchBox
                  value={query}
                  onChange={setQuery}
                  placeholder="Search TV apps, categories, keywords…"
                  ariaLabel="Search Android TV FOSS apps"
                />
              </div>

              <div className="mt-5 -mx-4 sm:mx-0 overflow-x-auto scrollbar-hide">
                <div className="flex sm:flex-wrap justify-start sm:justify-center gap-2 px-4 sm:px-2 pb-2 min-w-max sm:min-w-0">
                  {categories.map((cat) => {
                    const count =
                      cat === "All"
                        ? tvApps.length
                        : tvApps.filter((a) => a.category === cat).length;
                    const active = activeCat === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCat(cat)}
                        aria-pressed={active}
                        className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 border-foreground/80 transition-all ${
                          active
                            ? "bg-primary text-primary-foreground shadow-pop"
                            : "bg-card text-foreground hover:-translate-y-0.5"
                        }`}
                      >
                        {cat}
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                            active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-foreground/30 text-xs font-bold text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
                {filtered.length} apps · {tvApps.length} total
              </div>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {shown.length === 0 ? (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary text-secondary-foreground border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                  <SearchX className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">No apps found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try a different keyword or pick another category.
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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {shown.map((app, idx) => {
                  const flags = parseFlags(app.flags);
                  const primary = app.links[0];
                  return (
                    <div
                      key={`${app.name}-${idx}`}
                      className="pop-card p-5 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl bg-secondary text-secondary-foreground border-2 border-foreground/80 flex items-center justify-center shadow-pop shrink-0">
                          <Tv className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border-2 border-foreground/40 bg-card text-foreground">
                            {app.category}
                          </span>
                          <QuickFavorite name={app.name} type="tv-app" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-foreground font-heading mb-1 break-words">
                        {app.name}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {app.links.map((l) => (
                          <span
                            key={l.label}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border-2 border-foreground/40 ${linkColor(l.label)}`}
                          >
                            {l.label}
                          </span>
                        ))}
                        {flags.map((f) => (
                          <span
                            key={f}
                            title={FLAG_LABELS[f]}
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold border-2 border-foreground/40 bg-muted text-foreground"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mt-auto">
                        {primary && (
                          <a
                            href={primary.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => toast.success("Opening link…")}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-primary text-primary-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform text-xs"
                          >
                            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Open {primary.label}
                          </a>
                        )}
                        {primary && <CopyLinkButton url={primary.url} />}
                      </div>
                    </div>
                  );
                })}
                {loadingMore && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="pop-card p-5 animate-pulse">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="w-11 h-11 rounded-2xl bg-muted" />
                          <div className="w-16 h-5 rounded-full bg-muted" />
                        </div>
                        <div className="h-5 w-3/4 bg-muted rounded mb-3" />
                        <div className="flex gap-1.5 mb-3">
                          <div className="h-4 w-14 bg-muted rounded-full" />
                          <div className="h-4 w-10 bg-muted rounded-full" />
                        </div>
                        <div className="h-8 w-full bg-muted rounded-full mt-4" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="text-center mt-10">
              {visible < filtered.length ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:translate-y-0 disabled:cursor-wait"
                >
                  {loadingMore ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-foreground/80 border-t-transparent animate-spin" />
                      Loading…
                    </>
                  ) : (
                    <>Load more ({filtered.length - visible} remaining)</>
                  )}
                </button>
              ) : filtered.length > PAGE_SIZE ? (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted text-muted-foreground font-bold border-2 border-foreground/30 cursor-not-allowed"
                >
                  ✓ All {filtered.length} apps shown
                </button>
              ) : null}
            </div>

            <div className="text-center mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/foss-apps"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tertiary text-tertiary-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform"
              >
                🐙 FOSS Apps →
              </Link>
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

export default TvApps;
