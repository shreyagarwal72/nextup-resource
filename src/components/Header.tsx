import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, ChevronDown, Github, Zap, Sparkles, Layers, Send, Tv, Dumbbell, Briefcase, Download, HelpCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { StudyModeToggle } from "./StudyModeToggle";
import { useFavorites } from "@/hooks/useFavorites";
import NotificationCenter from "./NotificationCenter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/resources", label: "Resources" },
    { to: "/ebooks", label: "Ebooks" },
    { to: "/apps", label: "Apps" },
    { to: "/ai", label: "AI" },
  ];

  const moreLinks = [
    { to: "/developer-roadmap", label: "Developer Roadmap", icon: Sparkles },
    { to: "/special-courses", label: "Placement Bundles", icon: Briefcase },
    { to: "/morphe", label: "Morphe Builds", icon: Sparkles },
    { to: "/material-you", label: "Material You Apps", icon: Layers },
    { to: "/foss-apps", label: "FOSS Apps", icon: Github },
    { to: "/shizuku-apps", label: "Shizuku Apps", icon: Zap },
    { to: "/tv-apps", label: "Android TV Apps", icon: Tv },
    { to: "/telegram-tweaks", label: "Telegram Tweaks", icon: Send },
    { to: "/guru-mann-fitness", label: "Guru Mann Fitness", icon: Dumbbell },
    { to: "/install", label: "Install App", icon: Download },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
    { to: "/contact", label: "Contact", icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
      <div className="mx-3 sm:mx-4 mt-3 sm:mt-4 pointer-events-auto">
        <div
          className={`bg-card border-2 border-foreground/80 rounded-2xl transition-all duration-300 ${
            isScrolled ? "shadow-pop" : "shadow-pop-soft"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary border-2 border-foreground/80 shadow-pop transition-all duration-300 ease-bounce group-hover:shadow-pop-hover group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <span className="text-base sm:text-lg font-extrabold text-primary-foreground font-heading">N</span>
              </div>
              <span className="hidden xs:inline sm:inline text-sm sm:text-lg font-bold text-foreground font-heading truncate max-w-[140px] sm:max-w-none">
                <span className="sm:hidden">Nextup</span>
                <span className="hidden sm:inline">Nextup Resources</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-pill relative ${
                    isActive(link.to)
                      ? "bg-tertiary text-tertiary-foreground font-bold border-2 border-foreground/80"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.to === "/favorites" && totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center border-2 border-foreground/80 animate-pop-in">
                      {totalCount > 9 ? "9+" : totalCount}
                    </span>
                  )}
                </Link>
              ))}

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`nav-pill relative inline-flex items-center gap-1 ${
                      moreLinks.some((l) => isActive(l.to))
                        ? "bg-tertiary text-tertiary-foreground font-bold border-2 border-foreground/80"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="More pages"
                  >
                    More <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-64 p-2 bg-card border-2 border-foreground/80 shadow-pop rounded-2xl"
                >
                  <div className="grid grid-cols-1 gap-1 max-h-[70vh] overflow-y-auto">
                    {moreLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                            isActive(link.to)
                              ? "bg-tertiary text-tertiary-foreground"
                              : "hover:bg-muted/60 text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" strokeWidth={2.5} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <Link
                to="/favorites"
                aria-label={`Favorites${totalCount > 0 ? ` (${totalCount})` : ""}`}
                title="Favorites"
                className="relative w-10 h-10 rounded-full border-2 border-foreground/80 bg-card shadow-pop flex items-center justify-center hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Heart
                  className={`w-4 h-4 ${totalCount > 0 ? "text-primary fill-primary" : "text-foreground"}`}
                  strokeWidth={2.5}
                />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-foreground/80 animate-pop-in">
                    {totalCount > 9 ? "9+" : totalCount}
                  </span>
                )}
              </Link>
              <NotificationCenter />
              <StudyModeToggle />
              <ThemeToggle />

              <div className="hidden md:block">
                <Button size="default" asChild>
                  <Link to="/courses">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
