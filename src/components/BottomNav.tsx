import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, FolderOpen, Bot, Globe, BookText, Heart, Mail, HelpCircle, Download, MoreHorizontal } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

const primaryLinks = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/courses", icon: BookOpen, label: "Courses" },
  { to: "/resources", icon: FolderOpen, label: "Resources" },
  { to: "/ai", icon: Bot, label: "AI" },
  { to: "/apps", icon: Globe, label: "Apps" },
];

const moreLinks = [
  { to: "/ebooks", icon: BookText, label: "Ebooks" },
  { to: "/favorites", icon: Heart, label: "Favorites" },
  { to: "/contact", icon: Mail, label: "Contact" },
  { to: "/faq", icon: HelpCircle, label: "FAQs" },
  { to: "/install", icon: Download, label: "Install" },
];

const morePaths = moreLinks.map((l) => l.to);

const NavItem = ({ to, icon: Icon, label, active, badge }: { to: string; icon: any; label: string; active: boolean; badge?: number }) => (
  <Link
    to={to}
    className={`relative flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-200 ${
      active ? "text-primary" : "text-muted-foreground"
    }`}
  >
    {active && (
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-primary" />
    )}
    <div className="relative">
      <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
      {badge != null && badge > 0 && (
        <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center border border-foreground/80">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </div>
    {active && (
      <span className="text-[10px] font-bold text-primary mt-0.5 animate-fade-in">
        {label}
      </span>
    )}
  </Link>
);

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCount } = useFavorites();

  const isActive = (path: string) => location.pathname === path;
  const isOnMorePage = morePaths.includes(location.pathname);

  // Secondary nav (when on a "More" page)
  if (isOnMorePage) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="mx-2 mb-2 bg-card border-2 border-foreground/80 rounded-2xl shadow-pop">
          <div className="flex items-center justify-around px-1 py-1.5" style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}>
            {moreLinks.map((link) => (
              <NavItem
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                active={isActive(link.to)}
                badge={link.to === "/favorites" ? totalCount : undefined}
              />
            ))}
            {/* More button → switches back to primary (Home) */}
            <button
              onClick={() => navigate("/")}
              className="flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-200 text-muted-foreground"
            >
              <MoreHorizontal className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Primary nav
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-2 mb-2 bg-card border-2 border-foreground/80 rounded-2xl shadow-pop">
        <div className="flex items-center justify-around px-1 py-1.5" style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}>
          {primaryLinks.map((link) => (
            <NavItem
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={isActive(link.to)}
            />
          ))}
          {/* More button → switches to secondary (Ebooks) */}
          <button
            onClick={() => navigate("/ebooks")}
            className="flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-200 text-muted-foreground"
          >
            <MoreHorizontal className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
