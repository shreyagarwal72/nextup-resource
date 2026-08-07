import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";
import SearchBox from "@/components/SearchBox";
import QuickFavorite from "@/components/QuickFavorite";
import {
  ArrowLeft,
  Boxes,
  ExternalLink,
  SearchX,
  ChevronDown,
  PartyPopper,
  Trophy,
  Sparkles,
} from "lucide-react";
import { useAllInOne, type AllInOneEntry } from "@/hooks/useAllInOne";
import { useDebounced } from "@/hooks/useDebounced";

const CARDS_COLLAPSED = 9;

type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

const accentClasses: Record<Accent, { text: string; bg: string; chip: string }> = {
  primary: { text: "text-primary", bg: "bg-primary", chip: "bg-primary/10 text-primary" },
  secondary: { text: "text-secondary", bg: "bg-secondary", chip: "bg-secondary/10 text-secondary" },
  tertiary: { text: "text-tertiary", bg: "bg-tertiary", chip: "bg-tertiary/10 text-tertiary" },
  quaternary: { text: "text-quaternary", bg: "bg-quaternary", chip: "bg-quaternary/10 text-quaternary" },
};

const accents: Accent[] = ["primary", "secondary", "tertiary", "quaternary"];

/** Scattered confetti dots for the congrats banner. Purely decorative. */
const Confetti = () => {
  const dots = [
    { top: "10%", left: "6%", accent: "primary", delay: "0ms" },
    { top: "70%", left: "10%", accent: "tertiary", delay: "80ms" },
    { top: "20%", left: "92%", accent: "secondary", delay: "140ms" },
    { top: "78%", left: "90%", accent: "quaternary", delay: "220ms" },
    { top: "45%", left: "3%", accent: "quaternary", delay: "300ms" },
    { top: "50%", left: "96%", accent: "primary", delay: "360ms" },
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {dots.map((d, i) => (
        <span
          key={i}
          className={`absolute w-2.5 h-2.5 rounded-full border-2 border-foreground/80 animate-pop-in opacity-0 ${accentClasses[d.accent as Accent].bg}`}
          style={{ top: d.top, left: d.left, animationDelay: d.delay, animationFillMode: "forwards" }}
        />
      ))}
    </div>
  );
};

/** Celebratory "you found the secret vault" banner — this page only exists via the header long-press. */
const CongratsBanner = () => (
  <div className="relative max-w-2xl mx-auto mb-8 pop-card p-6 text-center overflow-visible bg-primary/5">
    <Confetti />
    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground border-2 border-foreground/80 shadow-pop mb-3">
      <Trophy className="w-6 h-6" strokeWidth={2.5} />
    </div>
    <h2 className="relative font-heading font-extrabold text-xl sm:text-2xl text-foreground flex items-center justify-center gap-2">
      <PartyPopper className="w-5 h-5 text-primary" strokeWidth={2.5} />
      Secret found!
      <PartyPopper className="w-5 h-5 text-primary -scale-x-100" strokeWidth={2.5} />
    </h2>
    <p className="relative text-sm text-muted-foreground mt-2">
      You held the logo long enough to unlock this page. It isn't linked anywhere on the
      site — nice find. 🎉
    </p>
  </div>
);

const EntryCard = ({ entry, accent }: { entry: AllInOneEntry; accent: Accent }) => {
  const { text, chip } = accentClasses[accent];
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pop-card p-4 flex flex-col gap-2 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-heading font-extrabold text-base ${text} leading-snug`}>{entry.name}</h3>
        <div className="flex items-center gap-1 shrink-0">
          <QuickFavorite name={entry.name} type="all-in-one" />
          <ExternalLink className="w-4 h-4 text-muted-foreground mt-0.5" strokeWidth={2.5} />
        </div>
      </div>
      {entry.description && (
        <p className="text-sm text-muted-foreground line-clamp-3">{entry.description}</p>
      )}
      <span className={`inline-flex items-center gap-1 mt-1 w-fit px-2 py-0.5 rounded-full text-[11px] font-bold ${chip}`}>
        <Sparkles className="w-3 h-3" strokeWidth={2.5} />
        Resource
      </span>
    </a>
  );
};

const CategorySection = ({
  category,
  entries,
  expanded,
  onToggle,
  accent,
}: {
  category: string;
  entries: AllInOneEntry[];
  expanded: boolean;
  onToggle: () => void;
  accent: Accent;
}) => {
  const shown = expanded ? entries : entries.slice(0, CARDS_COLLAPSED);
  const { bg } = accentClasses[accent];

  return (
    <div
      id={category.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}
      className="mb-8 scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${bg}`} />
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-foreground">{category}</h2>
        <span className="text-xs font-bold text-muted-foreground px-2 py-0.5 rounded-full border-2 border-foreground/20">
          {entries.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {shown.map((entry, i) => (
          <EntryCard key={`${entry.name}-${i}`} entry={entry} accent={accent} />
        ))}
      </div>

      {entries.length > CARDS_COLLAPSED && (
        <div className="text-center mt-3">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border-2 border-foreground/80 bg-card hover:-translate-y-0.5 shadow-pop-soft transition-all"
          >
            {expanded ? "Show less" : `Show all ${entries.length}`}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
};

const AllInOne = () => {
  const { loading, error, data } = useAllInOne();
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query, 200);
  const [activeCat, setActiveCat] = useState<string>("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = "All In One — Secret Vault";

    // This page is deliberately unlisted — keep it out of search results.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const categories = useMemo(() => (data ? Object.keys(data) : []), [data]);

  const totalCount = useMemo(
    () => (data ? Object.values(data).reduce((sum, list) => sum + list.length, 0) : 0),
    [data]
  );

  const filtered = useMemo(() => {
    if (!data) return {} as Record<string, AllInOneEntry[]>;
    const q = debounced.trim().toLowerCase();
    const result: Record<string, AllInOneEntry[]> = {};
    for (const cat of categories) {
      if (activeCat !== "All" && activeCat !== cat) continue;
      let list = data[cat];
      if (q) {
        list = list.filter(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
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
                <Boxes className="w-4 h-4" strokeWidth={2.5} />
                <span>All In One</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-1 font-heading">
                🔓 The Secret Vault
              </h1>
              <SquigglyUnderline color="hsl(var(--primary))" width={300} />
              <p className="text-lg text-muted-foreground mt-5">
                Every category, every link, one dump — a hand-curated index of dev, security,
                gaming, business and misc resource collections.
              </p>

              <CongratsBanner />

              <div className="mt-2 max-w-xl mx-auto">
                <SearchBox
                  value={query}
                  onChange={setQuery}
                  placeholder="Search all resources..."
                  ariaLabel="Search the vault"
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
                  <Boxes className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {filteredCount} of {totalCount} resources
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {loading && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-8 h-8 mx-auto mb-4 rounded-full border-4 border-foreground/20 border-t-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Loading the vault…</p>
              </div>
            )}

            {error && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-destructive/10 text-destructive border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                  <Boxes className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Index unreachable</h3>
                <p className="text-sm text-muted-foreground">
                  Couldn't fetch <code className="text-xs">all-in-one.json</code> from GitHub right now.
                  This usually means the file hasn't been pushed to the repo's{" "}
                  <code className="text-xs">main</code> branch yet, or the fetch got blocked by a
                  network/ad-block rule. Check your connection and try again shortly.
                </p>
              </div>
            )}

            {!loading && !error && Object.keys(filtered).length === 0 && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-tertiary text-tertiary-foreground border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                  <SearchX className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">No matches found</h3>
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
              Object.entries(filtered).map(([cat, entries], i) => (
                <CategorySection
                  key={cat}
                  category={cat}
                  entries={entries}
                  expanded={!!expanded[cat] || !!debounced.trim()}
                  onToggle={() => toggleExpand(cat)}
                  accent={accents[i % accents.length]}
                />
              ))}

            <div className="text-center mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card text-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Back home
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

export default AllInOne;
