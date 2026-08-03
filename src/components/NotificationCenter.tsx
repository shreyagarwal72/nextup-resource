import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Bell, X, Clock, Cpu, Gamepad2, Plug, Bug, Palette, LayoutGrid, Filter, MonitorSmartphone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type AnnouncementType = "page" | "feature";

interface Announcement {
  title: string;
  description: string;
  type: AnnouncementType;
  date: string; // ISO date
  link: string;
}

// Static launch announcements. Update this list by hand when you ship a new
// page or feature — this panel no longer auto-derives from content data.
const announcements: Announcement[] = [
  {
    title: "Operating Systems",
    description: "A new catalog of open-source OS kernels, web-based OS clones, and indie web-desktops.",
    type: "page",
    date: "2026-08-03",
    link: "/os",
  },
  {
    title: "IoT",
    description: "A new page covering IoT tools, boards, and open-source projects.",
    type: "page",
    date: "2026-07-28",
    link: "/iot",
  },
  {
    title: "Games",
    description: "A new page for game downloads and recommendations.",
    type: "page",
    date: "2026-07-28",
    link: "/games",
  },
  {
    title: "API Hub",
    description: "A new page listing free and open public APIs for developers.",
    type: "page",
    date: "2026-07-28",
    link: "/api-hub",
  },
  {
    title: "Android RE",
    description: "A new page for Android reverse-engineering tools and resources.",
    type: "page",
    date: "2026-07-28",
    link: "/android-re",
  },
  {
    title: "Design.md",
    description: "A new page covering design systems and UI references.",
    type: "page",
    date: "2026-07-28",
    link: "/design-md",
  },
  {
    title: "New bottom navigation",
    description: "The bottom nav now has a scrollable icon strip plus a category-grouped launcher for every page on the site.",
    type: "feature",
    date: "2026-07-28",
    link: "/",
  },
];

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<AnnouncementType | "all">("all");
  const [isLoading, setIsLoading] = useState(false);

  // Brief skeleton flash when opening the panel or switching filter chips.
  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 320);
    return () => clearTimeout(t);
  }, [isOpen, filter]);

  const sortedAnnouncements = useMemo(
    () => [...announcements].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const typeIcon = (title: string, type: AnnouncementType) => {
    if (type === "feature") return <LayoutGrid className="w-4 h-4" strokeWidth={2.5} />;
    switch (title) {
      case "IoT": return <Cpu className="w-4 h-4" strokeWidth={2.5} />;
      case "Games": return <Gamepad2 className="w-4 h-4" strokeWidth={2.5} />;
      case "API Hub": return <Plug className="w-4 h-4" strokeWidth={2.5} />;
      case "Android RE": return <Bug className="w-4 h-4" strokeWidth={2.5} />;
      case "Design.md": return <Palette className="w-4 h-4" strokeWidth={2.5} />;
      case "Operating Systems": return <MonitorSmartphone className="w-4 h-4" strokeWidth={2.5} />;
      default: return <Bell className="w-4 h-4" strokeWidth={2.5} />;
    }
  };

  const typeColor = (type: AnnouncementType) => {
    return type === "feature"
      ? "bg-secondary text-secondary-foreground"
      : "bg-primary text-primary-foreground";
  };

  const daysAgo = (date: string) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff}d ago`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-full border-2 border-foreground/80 bg-card shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-pop-active active:translate-x-0.5 active:translate-y-0.5 transition-all duration-300 text-muted-foreground hover:text-primary"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" strokeWidth={2.5} />
        {sortedAnnouncements.length > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-foreground/80 ring-2 ring-card">
            {sortedAnnouncements.length > 9 ? "9+" : sortedAnnouncements.length}
          </span>
        )}
      </button>

      {createPortal(
        <>
          <div
            className={`fixed inset-0 z-[9998] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 bottom-0 z-[9999] w-full max-w-sm transition-transform duration-500 pointer-events-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            <div className="h-full bg-background flex flex-col border-l-2 border-foreground/80">
              <div className="flex items-center justify-between p-5 border-b-2 border-foreground/20">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  <h2 className="text-lg font-bold text-foreground font-heading">What's New</h2>
                  {sortedAnnouncements.length > 0 && (
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full border-2 border-foreground/80">
                      {sortedAnnouncements.length}
                    </span>
                  )}
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full border-2 border-foreground/30 hover:bg-muted transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" strokeWidth={2.5} />
                </button>
              </div>

              <div className="px-4 pt-3 pb-2 border-b-2 border-foreground/10">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  <Filter className="w-3 h-3" strokeWidth={2.5} />
                  Filter by type
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
                  {(["all", "page", "feature"] as const).map((f) => {
                    const count = f === "all" ? sortedAnnouncements.length : sortedAnnouncements.filter((i) => i.type === f).length;
                    if (f !== "all" && count === 0) return null;
                    const active = filter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold border-2 border-foreground/80 transition-all ${
                          active ? "bg-primary text-primary-foreground shadow-pop-sm" : "bg-card text-foreground hover:-translate-y-0.5"
                        }`}
                      >
                        {f === "all" ? "All" : f === "page" ? "New pages" : "Features"} · {count}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {(() => {
                  const shown = filter === "all" ? sortedAnnouncements : sortedAnnouncements.filter((i) => i.type === filter);

                  if (isLoading) {
                    return (
                      <div className="space-y-3" aria-label="Loading updates">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-card border-2 border-foreground/20 flex items-start gap-3"
                          >
                            <Skeleton className="w-9 h-9 rounded-full border-2 border-foreground/20" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-3.5 w-4/5" />
                              <Skeleton className="h-3 w-2/5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  if (shown.length === 0) {
                    return (
                      <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <div className="w-14 h-14 rounded-2xl border-2 border-foreground/80 bg-card flex items-center justify-center shadow-pop mb-4">
                          <Bell className="w-6 h-6 text-muted-foreground/60" strokeWidth={2.5} />
                        </div>
                        <p className="text-foreground font-bold font-heading">
                          {filter === "all" ? "All caught up!" : "No matches"}
                        </p>
                        <p className="text-sm text-muted-foreground/70 mt-1 max-w-[240px]">
                          {filter === "all"
                            ? "New pages and features will show up here."
                            : "Nothing here yet — try a different filter."}
                        </p>
                        {filter !== "all" && (
                          <button
                            onClick={() => setFilter("all")}
                            className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-xs border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform"
                          >
                            Show all updates
                          </button>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div className="space-y-3">
                      {shown.map((item, i) => (
                        <Link
                          key={`${item.type}-${item.title}-${i}`}
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="block p-4 rounded-xl bg-card border-2 border-foreground/20 hover:border-primary hover:-translate-y-0.5 hover:shadow-pop transition-all duration-300 animate-fade-in-up"
                          style={{ animationDelay: `${i * 0.04}s` }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-foreground/80 ${typeColor(item.type)}`}>
                              {typeIcon(item.title, item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-foreground line-clamp-2">
                                {item.type === "page" ? `New page: ${item.title}` : item.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                  {item.type === "page" ? "new page" : "feature"}
                                </span>
                                <span className="text-xs text-muted-foreground/40">•</span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                  <Clock className="w-3 h-3" /> {daysAgo(item.date)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default NotificationCenter;
