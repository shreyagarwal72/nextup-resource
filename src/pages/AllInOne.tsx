import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Terminal,
  Lock,
  Unlock,
  ExternalLink,
  Search,
  X,
  ChevronDown,
  ArrowLeft,
  Boxes,
} from "lucide-react";
import { useAllInOne, type AllInOneEntry } from "@/hooks/useAllInOne";
import { useDebounced } from "@/hooks/useDebounced";

const CARDS_COLLAPSED = 12;
const BOOT_LINES = [
  "$ locating vault…",
  "$ verifying hold signature… ok",
  "$ decrypting index.json",
  "$ mounting 26 sectors / 680+ entries",
  "$ ACCESS GRANTED",
];

/** Sequential terminal boot animation shown once per session. Tap/click skips it. */
const BootSequence = ({ onDone }: { onDone: () => void }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= BOOT_LINES.length) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 200 : 260);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  return (
    <div
      onClick={onDone}
      className="fixed inset-0 z-[100] bg-black text-green-400 font-mono flex items-center justify-center cursor-pointer px-6"
    >
      <div className="w-full max-w-md">
        {BOOT_LINES.slice(0, shown).map((line, i) => (
          <p
            key={i}
            className={`text-sm sm:text-base mb-1.5 ${
              line.includes("GRANTED") ? "text-emerald-300 font-bold" : "text-green-400/90"
            }`}
          >
            {line}
          </p>
        ))}
        {shown < BOOT_LINES.length && (
          <span className="inline-block w-2.5 h-4 bg-green-400 animate-pulse align-middle" />
        )}
      </div>
      <p className="fixed bottom-6 left-0 right-0 text-center text-[11px] text-green-400/40 font-mono">
        tap to skip
      </p>
    </div>
  );
};

const EntryCard = ({ entry }: { entry: AllInOneEntry }) => (
  <a
    href={entry.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative border border-green-400/25 bg-black/60 rounded-md p-3.5 flex flex-col gap-1.5 hover:border-green-400/70 hover:bg-green-400/5 transition-colors"
  >
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-mono font-bold text-sm text-green-300 leading-snug break-words">
        {entry.name}
      </h3>
      <ExternalLink
        className="w-3.5 h-3.5 text-green-400/40 group-hover:text-green-400 shrink-0 mt-0.5 transition-colors"
        strokeWidth={2}
      />
    </div>
    {entry.description && (
      <p className="text-xs text-green-400/50 font-mono leading-relaxed line-clamp-3">
        {entry.description}
      </p>
    )}
  </a>
);

const CategoryBlock = ({
  category,
  entries,
  expanded,
  onToggle,
}: {
  category: string;
  entries: AllInOneEntry[];
  expanded: boolean;
  onToggle: () => void;
}) => {
  const shown = expanded ? entries : entries.slice(0, CARDS_COLLAPSED);

  return (
    <div
      id={category.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}
      className="mb-10 scroll-mt-24"
    >
      <div className="flex items-center gap-2.5 mb-3 border-b border-green-400/20 pb-2">
        <span className="text-green-400/50 font-mono text-xs">#</span>
        <h2 className="font-mono font-bold text-base sm:text-lg text-green-300 tracking-wide">
          {category}
        </h2>
        <span className="text-[10px] font-mono text-green-400/40 px-1.5 py-0.5 rounded border border-green-400/20">
          {entries.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {shown.map((entry, i) => (
          <EntryCard key={`${entry.name}-${i}`} entry={entry} />
        ))}
      </div>

      {entries.length > CARDS_COLLAPSED && (
        <div className="text-center mt-4">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded border border-green-400/30 text-green-400/70 hover:text-green-300 hover:border-green-400/60 font-mono text-xs transition-colors"
          >
            {expanded ? "collapse" : `expand all ${entries.length}`}
            <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.5} />
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
  const [booted, setBooted] = useState(false);
  const skippedBefore = useRef(sessionStorage.getItem("vaultBooted") === "1");

  useEffect(() => {
    document.title = "// vault";

    // Deliberately keep this page out of search engines and off any sitemap crawl.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    if (skippedBefore.current) setBooted(true);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleBootDone = () => {
    sessionStorage.setItem("vaultBooted", "1");
    setBooted(true);
  };

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
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-x-hidden">
      {/* subtle CRT scanline + glitch styling, scoped to this page only */}
      <style>{`
        @keyframes vault-flicker {
          0%, 96%, 100% { opacity: 1; }
          97% { opacity: 0.72; }
          98% { opacity: 1; }
          99% { opacity: 0.85; }
        }
        .vault-scanlines::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(74, 222, 128, 0.035) 0px,
            rgba(74, 222, 128, 0.035) 1px,
            transparent 1px,
            transparent 3px
          );
          z-index: 1;
        }
        .vault-title { animation: vault-flicker 6s infinite; }
      `}</style>

      {!booted && <BootSequence onDone={handleBootDone} />}

      <div className="vault-scanlines">
        <div className="relative z-[2]">
          {/* Minimal bar — deliberately not the site Header */}
          <div className="border-b border-green-400/20 sticky top-0 bg-black/90 backdrop-blur z-20">
            <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Unlock className="w-4 h-4 text-green-400" strokeWidth={2.5} />
                <span className="vault-title font-bold text-sm sm:text-base tracking-widest">
                  ALL_IN_ONE<span className="text-green-400/40">.vault</span>
                </span>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-green-400/60 hover:text-green-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                exit
              </Link>
            </div>
          </div>

          <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-10 pb-24">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded border border-green-400/30 text-[11px] text-green-400/70">
                <Lock className="w-3 h-3" strokeWidth={2.5} />
                hidden index — not linked anywhere on the site
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-green-300 mb-2 flex items-center gap-2.5">
                <Boxes className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2} />
                All In One
              </h1>
              <p className="text-sm text-green-400/50 max-w-2xl leading-relaxed">
                Every category, every link, one dump. A curated index of dev, security, gaming, business
                and misc resource collections — {totalCount || "680+"} entries across {categories.length || 26} sectors.
              </p>

              <div className="mt-6 relative max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400/40" strokeWidth={2.5} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="grep --entries..."
                  aria-label="Search the vault"
                  className="w-full bg-black border border-green-400/30 focus:border-green-400/70 rounded pl-10 pr-10 py-2.5 text-sm text-green-300 placeholder:text-green-400/30 outline-none transition-colors"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400/40 hover:text-green-300"
                  >
                    <X className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                )}
              </div>

              {!loading && !error && (
                <div className="mt-4 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                  {["All", ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCat(cat)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
                        activeCat === cat
                          ? "bg-green-400 text-black border-green-400 font-bold"
                          : "border-green-400/25 text-green-400/60 hover:text-green-300 hover:border-green-400/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {!loading && !error && (
                <p className="mt-3 text-[11px] text-green-400/35">
                  showing {filteredCount} / {totalCount}
                </p>
              )}
            </div>

            {loading && (
              <div className="max-w-md mx-auto text-center py-16">
                <Terminal className="w-6 h-6 mx-auto mb-3 text-green-400/50 animate-pulse" strokeWidth={2} />
                <p className="text-xs text-green-400/50">reading index…</p>
              </div>
            )}

            {error && (
              <div className="max-w-md mx-auto text-center py-16 border border-red-500/30 rounded">
                <p className="text-sm text-red-400 font-bold mb-1">index unreachable</p>
                <p className="text-xs text-green-400/40">check your connection and retry.</p>
              </div>
            )}

            {!loading && !error && Object.keys(filtered).length === 0 && (
              <div className="max-w-md mx-auto text-center py-16">
                <p className="text-sm text-green-400/60 mb-3">no matches.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveCat("All");
                  }}
                  className="text-xs px-4 py-1.5 rounded border border-green-400/40 text-green-300 hover:bg-green-400/10 transition-colors"
                >
                  reset
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              Object.entries(filtered).map(([cat, entries]) => (
                <CategoryBlock
                  key={cat}
                  category={cat}
                  entries={entries}
                  expanded={!!expanded[cat] || !!debounced.trim()}
                  onToggle={() => toggleExpand(cat)}
                />
              ))}

            <div className="mt-14 pt-6 border-t border-green-400/15 text-center">
              <p className="text-[11px] text-green-400/30 font-mono mb-4">
                found by holding the logo. keep it to yourself.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded border border-green-400/30 text-green-400/70 hover:text-green-300 hover:border-green-400/60 text-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                back to daylight
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllInOne;
