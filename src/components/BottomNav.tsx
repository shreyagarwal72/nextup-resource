import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, FolderOpen, Bot, Heart, MoreHorizontal } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";

const primaryLinks = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/courses", icon: BookOpen, label: "Courses" },
  { to: "/resources", icon: FolderOpen, label: "Resources" },
  { to: "/ai", icon: Bot, label: "AI" },
  { to: "/favorites", icon: Heart, label: "Favorites" },
];

const moreLinks = [
  { to: "/ebooks", label: "Ebooks" },
  { to: "/apps", label: "Apps & Websites" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
  { to: "/install", label: "Install App" },
];

const BottomNav = () => {
  const location = useLocation();
  const { totalCount } = useFavorites();
  const [showMore, setShowMore] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 bg-foreground/20" onClick={() => setShowMore(false)}>
          <div
            className="absolute bottom-20 left-3 right-3 bg-card border-2 border-foreground/80 rounded-2xl shadow-pop p-3 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-2">
              {moreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setShowMore(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 text-center ${
                    isActive(link.to)
                      ? "bg-tertiary text-tertiary-foreground border-2 border-foreground/80"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="mx-2 mb-2 bg-card border-2 border-foreground/80 rounded-2xl shadow-pop">
          <div className="flex items-center justify-around px-1 py-1.5" style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}>
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {active && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-primary" />
                  )}
                  <div className="relative">
                    <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                    {link.to === "/favorites" && totalCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center border border-foreground/80">
                        {totalCount > 9 ? "9+" : totalCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold ${active ? "text-primary" : ""}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
            {/* More button */}
            <button
              onClick={() => setShowMore(!showMore)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                showMore ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <MoreHorizontal className="w-5 h-5" strokeWidth={showMore ? 2.5 : 2} />
              <span className="text-[10px] font-bold">More</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
