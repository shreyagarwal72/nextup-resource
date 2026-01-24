import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useFavorites } from "@/hooks/useFavorites";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalCount } = useFavorites();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/resources", label: "Resources" },
    { to: "/favorites", label: "Favorites" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="mx-3 sm:mx-4 mt-3 sm:mt-4">
        <div className="glass-heavy rounded-2xl liquid-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 sm:h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/90 backdrop-blur-sm shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-base sm:text-lg font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-base sm:text-lg font-semibold text-foreground hidden xs:inline">
                Nextup Resources
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative ${
                    isActive(link.to)
                      ? "glass-button text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.to === "/favorites" && totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                      {totalCount > 9 ? "9+" : totalCount}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              
              <div className="hidden md:block">
                <Button variant="glassPrimary" size="default" asChild>
                  <Link to="/courses">Get Started</Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-xl glass-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu className={`absolute inset-0 h-6 w-6 text-foreground transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`} />
                  <X className={`absolute inset-0 h-6 w-6 text-foreground transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with predictive animation */}
      <div 
        className={`md:hidden mx-3 sm:mx-4 mt-2 transition-all duration-500 ease-out ${
          isMenuOpen 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="glass-heavy rounded-2xl overflow-hidden liquid-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? "glass-button text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: isMenuOpen ? 1 : 0
                }}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              variant="glassPrimary" 
              size="default" 
              className="mt-2" 
              asChild
              style={{ 
                transitionDelay: isMenuOpen ? `${navLinks.length * 50}ms` : "0ms"
              }}
            >
              <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
