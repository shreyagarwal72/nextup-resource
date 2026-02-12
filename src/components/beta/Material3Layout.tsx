import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Package, BookText, Smartphone, Heart, Menu, X, Search, Sun, Moon, HelpCircle, Settings, Bot } from "lucide-react";
import { useTheme } from "next-themes";
import { useStudyMode } from "@/hooks/useStudyMode";
import { StudyModeToggle } from "@/components/StudyModeToggle";
import "@/styles/material3.css";

interface Material3LayoutProps {
  children: ReactNode;
  onExitBeta: () => void;
}

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/courses", icon: BookOpen, label: "Courses" },
  { path: "/resources", icon: Package, label: "Resources" },
  { path: "/ebooks", icon: BookText, label: "Ebooks" },
  { path: "/apps", icon: Smartphone, label: "Apps" },
  { path: "/ai", icon: Bot, label: "AI" },
  { path: "/favorites", icon: Heart, label: "Favorites" },
  { path: "/faq", icon: HelpCircle, label: "FAQ" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

const Material3Layout = ({ children, onExitBeta }: Material3LayoutProps) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { isStudyMode } = useStudyMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`material3-theme ${theme === "dark" ? "dark" : ""} ${isStudyMode ? "study-mode" : ""} min-h-screen md3-surface`}>
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 md3-surface" style={{ boxShadow: "var(--md-sys-elevation-level2)" }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Leading */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="md3-tonal-button p-2 rounded-full md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                     style={{ background: "hsl(var(--md-sys-color-primary))" }}>
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="md3-title-large font-semibold hidden sm:block" 
                      style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                  Nextup
                </span>
              </Link>
              
              {/* Study Mode Indicator */}
              {isStudyMode && (
                <div className="hidden md:flex md3-study-indicator">
                  <BookOpen className="w-3.5 h-3.5" />
                  Study Mode
                </div>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="md3-search-bar w-full">
                <Search className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
                <input
                  type="text"
                  placeholder="Search courses, resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none md3-body-large"
                  style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
                />
              </div>
            </div>

            {/* Trailing */}
            <div className="flex items-center gap-2">
              <StudyModeToggle variant="material3" />
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="md3-tonal-button p-2 rounded-full"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link
                to="/settings"
                className="md3-tonal-button text-sm px-3 py-1"
              >
                Switch Theme
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Rail - Desktop */}
      <nav className="hidden md:flex fixed left-0 top-16 bottom-0 w-20 flex-col items-center py-6 gap-2 z-40 md3-surface-container">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 ${
                isActive ? "md3-chip selected" : ""
              }`}
              style={{
                color: isActive 
                  ? "hsl(var(--md-sys-color-on-secondary-container))" 
                  : "hsl(var(--md-sys-color-on-surface-variant))"
              }}
            >
              {isActive && (
                <div 
                  className="absolute inset-0 rounded-2xl md3-animate-fade-through"
                  style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}
                />
              )}
              <item.icon className="w-6 h-6 relative z-10" />
              <span className="md3-label-small relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="md:ml-20 pb-20 md:pb-0">
        <div className="md3-animate-fade-through">
          {children}
        </div>
      </main>

      {/* Navigation Bar - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 md3-navigation-bar">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 6).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`md3-navigation-item relative ${isActive ? "active" : ""}`}
              >
                {isActive && <div className="md3-nav-indicator" />}
                <item.icon className="w-6 h-6 relative z-10" />
                <span className="md3-label-small relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Navigation Drawer - Mobile */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-50 md3-animate-fade-through"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div 
            className="fixed left-0 top-0 bottom-0 w-80 z-50 md3-surface p-6 md3-animate-shared-axis"
            style={{ boxShadow: "var(--md-sys-elevation-level3)" }}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="md3-headline-small" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                Nextup Resources
              </span>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="md3-tonal-button p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {isStudyMode && (
              <div className="md3-study-indicator mb-6 justify-center">
                <BookOpen className="w-4 h-4" />
                Study Mode Active
              </div>
            )}
            
            <div className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all md3-stagger-${index + 1} md3-animate-enter ${
                      isActive ? "" : ""
                    }`}
                    style={{
                      background: isActive ? "hsl(var(--md-sys-color-secondary-container))" : "transparent",
                      color: isActive 
                        ? "hsl(var(--md-sys-color-on-secondary-container))" 
                        : "hsl(var(--md-sys-color-on-surface-variant))"
                    }}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="md3-label-large">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                Material 3 Expressive
              </p>
              <p className="md3-body-small mt-1" style={{ color: "hsl(var(--md-sys-color-outline))" }}>
                Go to Settings to switch theme
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Material3Layout;
