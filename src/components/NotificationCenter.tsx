import { useState, useMemo } from "react";
import { Bell, X, BookOpen, Package, Smartphone, Clock } from "lucide-react";
import { courses, resources, ebooks, apps } from "@/data/content";

interface NotificationItem {
  title: string;
  category: string;
  type: "course" | "resource" | "ebook" | "app";
  dateAdded: string;
  link: string;
}

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const recentItems = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const items: NotificationItem[] = [];

    courses.filter(c => c.dateAdded && new Date(c.dateAdded) >= sevenDaysAgo)
      .forEach(c => items.push({ title: c.title, category: c.category, type: "course", dateAdded: c.dateAdded!, link: c.link }));
    resources.filter(r => r.dateAdded && new Date(r.dateAdded) >= sevenDaysAgo)
      .forEach(r => items.push({ title: r.title, category: r.category, type: "resource", dateAdded: r.dateAdded!, link: r.link }));
    ebooks.filter(e => e.dateAdded && new Date(e.dateAdded) >= sevenDaysAgo)
      .forEach(e => items.push({ title: e.title, category: e.category, type: "ebook", dateAdded: e.dateAdded!, link: e.link }));
    apps.filter(a => a.dateAdded && new Date(a.dateAdded) >= sevenDaysAgo)
      .forEach(a => items.push({ title: a.title, category: a.category, type: "app", dateAdded: a.dateAdded!, link: a.link }));

    return items.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
  }, []);

  const typeIcon = (type: string) => {
    switch (type) {
      case "course": return <BookOpen className="w-4 h-4" />;
      case "resource": return <Package className="w-4 h-4" />;
      case "app": return <Smartphone className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case "course": return "bg-blue-500/15 text-blue-500";
      case "resource": return "bg-emerald-500/15 text-emerald-500";
      case "app": return "bg-orange-500/15 text-orange-500";
      default: return "bg-purple-500/15 text-purple-500";
    }
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
        className="relative p-2 rounded-xl glass-button press-feedback text-muted-foreground hover:text-primary transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {recentItems.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-ios-pop">
            {recentItems.length > 9 ? "9+" : recentItems.length}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[9999] w-full max-w-sm transition-transform duration-500 ease-[cubic-bezier(0.05,0.7,0.1,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full glass-ultra flex flex-col border-l border-border/30">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border/30">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">What's New</h2>
              {recentItems.length > 0 && (
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {recentItems.length}
                </span>
              )}
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-muted transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {recentItems.length > 0 ? (
              <div className="space-y-3">
                {recentItems.map((item, i) => (
                  <a
                    key={`${item.type}-${item.title}`}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-2xl bg-card/60 border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-sm animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor(item.type)}`}>
                        {typeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                          <span className="text-xs text-muted-foreground/40">•</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {daysAgo(item.dateAdded)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">All caught up!</p>
                <p className="text-sm text-muted-foreground/60 mt-1">New content will appear here weekly</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;
