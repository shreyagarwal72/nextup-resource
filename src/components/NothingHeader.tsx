import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { StudyModeToggle } from "./StudyModeToggle";
import { useFavorites } from "@/hooks/useFavorites";
import NotificationCenter from "./NotificationCenter";

const NothingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    { to: "/favorites", label: "Favorites" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="mx-3 sm:mx-4 mt-3 sm:mt-4 pointer-events-auto">
        <div className={`transition-all duration-300 border border-dashed ${isScrolled ? "border-border bg-background/95" : "border-transparent bg-background/80"}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 items-center justify-center border border-dashed border-border group-hover:border-primary transition-colors duration-200">
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">N</span>
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-primary" />
                <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-primary" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-[0.15em]">
                Nextup
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                    isActive(link.to)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary" />
                  )}
                  {link.to === "/favorites" && totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-primary text-primary-foreground text-[8px] flex items-center justify-center font-bold">
                      {totalCount > 9 ? "9+" : totalCount}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <NotificationCenter />
              <StudyModeToggle />
              <ThemeToggle />
              <Link
                to="/settings"
                className="hidden md:flex p-1.5 border border-dashed border-transparent hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </Link>
              <Link to="/courses" className="hidden md:flex nth-btn primary text-[10px] py-1.5 px-3">
                Get Started
              </Link>

              {/* Mobile menu */}
              <button
                className="md:hidden p-1.5 border border-dashed border-border hover:border-primary transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <Menu className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-200 ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100"}`} />
                  <X className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-200 ${isMenuOpen ? "opacity-100" : "opacity-0 -rotate-90"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden mx-3 sm:mx-4 mt-1 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="border border-dashed border-border bg-background overflow-hidden">
          <nav className="px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 border-l-2 ${
                  isActive(link.to)
                    ? "text-primary border-primary"
                    : "text-muted-foreground hover:text-foreground border-transparent hover:border-muted-foreground"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-12px)",
                }}
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  {link.to === "/favorites" && totalCount > 0 && (
                    <span className="min-w-[14px] h-[14px] bg-primary text-primary-foreground text-[8px] flex items-center justify-center font-bold">
                      {totalCount > 9 ? "9+" : totalCount}
                    </span>
                  )}
                </span>
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-dashed border-border flex gap-2">
              <Link
                to="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground border border-dashed border-border hover:border-foreground transition-all"
              >
                <Settings className="w-3.5 h-3.5" />
                Settings
              </Link>
              <Link
                to="/courses"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 nth-btn primary text-[10px] py-2"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NothingHeader;
