import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";
import SearchBox from "@/components/SearchBox";
import { ArrowLeft, Cpu, ExternalLink, SearchX, ChevronDown, Github } from "lucide-react";
import { useAwesomeIot, type IotEntry } from "@/hooks/useAwesomeIot";
import { useDebounced } from "@/hooks/useDebounced";

const CARDS_COLLAPSED = 9;

type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

// Static class lookup — Tailwind can't pick up `bg-${accent}`-style interpolated
// strings at build time, so every accent needs its own literal entry here.
const accentClasses: Record<Accent, { text: string; bg: string; chip: string }> = {
  primary: { text: "text-primary", bg: "bg-primary", chip: "bg-primary/10 text-primary" },
  secondary: { text: "text-secondary", bg: "bg-secondary", chip: "bg-secondary/10 text-secondary" },
  tertiary: { text: "text-tertiary", bg: "bg-tertiary", chip: "bg-tertiary/10 text-tertiary" },
  quaternary: { text: "text-quaternary", bg: "bg-quaternary", chip: "bg-quaternary/10 text-quaternary" },
};

const accents: Accent[] = ["primary", "secondary", "tertiary", "quaternary"];

const IotCard = ({ item, accent }: { item: IotEntry; accent: Accent }) => {
  const { text, chip } = accentClasses[accent];
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pop-card p-4 flex flex-col gap-2 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-heading font-extrabold text-base ${text} leading-snug`}>{item.name}</h3>
        <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" strokeWidth={2.5} />
      </div>
      <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
      <span className={`inline-flex items-center gap-1 mt-1 w-fit px-2 py-0.5 rounded-full text-[11px] font-bold ${chip}`}>
        <Github className="w-3 h-3" strokeWidth={2.5} />
        Source
      </span>
    </a>
  );
};

const CategorySection = ({
  category,
  items,
  expanded,
  onToggle,
  accent,
}: {
  category: string;
  items: IotEntry[];
  expanded: boolean;
  onToggle: () => void;
  accent: Accent;
}) => {
  const shown = expanded ? items : items.slice(0, CARDS_COLLAPSED);
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
          {items.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {shown.map((item, i) => (
          <IotCard key={`${item.name}-${i}`} item={item} accent={accent} />
        ))}
      </div>

      {items.length > CARDS_COLLAPSED && (
        <div className="text-center mt-3">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border-2 border-foreground/80 bg-card hover:-translate-y-0.5 shadow-pop-soft transition-all"
          >
            {expanded ? "Show less" : `Show all ${items.length}`}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
};

const Iot = () => {
  const { loading, error, data } = useAwesomeIot();
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query, 200);
  const [activeCat, setActiveCat] = useState<string>("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = "IoT — Open Source Internet of Things Projects";
  }, []);

  const categories = useMemo(() => (data ? Object.keys(data) : []), [data]);

  const totalCount = useMemo(
    () => (data ? Object.values(data).reduce((sum, list) => sum + list.length, 0) : 0),
    [data]
  );

  const filtered = useMemo(() => {
    if (!data) return {} as Record<string, IotEntry[]>;
    const q = debounced.trim().toLowerCase();
    const result: Record<string, IotEntry[]> = {};
    for (const cat of categories) {
      if (activeCat !== "All" && activeCat !== cat) continue;
      let list = data[cat];
      if (q) {
        list = list.filter(
          (it) =>
            it.name.toLowerCase().includes(q) ||
            it.description.toLowerCase().includes(q) ||
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
                <Cpu className="w-4 h-4" strokeWidth={2.5} />
                <span>IoT</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-1 font-heading">
                🔌 Open Source IoT
              </h1>
              <SquigglyUnderline color="hsl(var(--primary))" width={300} />
              <p className="text-lg text-muted-foreground mt-5">
                A curated catalog of Internet of Things hardware, software, protocols and standards — sourced from the community-maintained{" "}
                <a
                  href="https://github.com/HQarroum/awesome-iot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-wavy underline-offset-4"
                >
                  awesome-iot
                </a>{" "}
                list.
              </p>

              <div className="mt-7 max-w-xl mx-auto">
                <SearchBox
                  value={query}
                  onChange={setQuery}
                  placeholder="Search IoT projects by name or description..."
                  ariaLabel="Search open source IoT projects"
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
                  <Cpu className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {filteredCount} of {totalCount} projects
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
                <p className="text-sm text-muted-foreground">Loading the IoT catalog…</p>
              </div>
            )}

            {error && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-destructive/10 text-destructive border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                  <Cpu className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Couldn't load the catalog</h3>
                <p className="text-sm text-muted-foreground">
                  The IoT list couldn't be fetched right now. Check your connection and try again shortly.
                </p>
              </div>
            )}

            {!loading && !error && Object.keys(filtered).length === 0 && (
              <div className="max-w-md mx-auto text-center pop-card p-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-tertiary text-tertiary-foreground border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                  <SearchX className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">No projects found</h3>
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
              Object.entries(filtered).map(([cat, items], i) => (
                <CategorySection
                  key={cat}
                  category={cat}
                  items={items}
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
                    href="https://github.com/HQarroum/awesome-iot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline decoration-wavy underline-offset-4"
                  >
                    HQarroum/awesome-iot
                  </a>{" "}
                  — a community-maintained list of Internet of Things projects and resources. ❤️
                </p>
              </div>
            )}

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

export default Iot;
