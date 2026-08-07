import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, ChevronDown, Github, Zap, Sparkles, Layers, Send, Tv, Dumbbell, Briefcase, Download, HelpCircle, Plug, Gamepad2, Cpu, Settings as SettingsIcon, MonitorSmartphone, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { StudyModeToggle } from "./StudyModeToggle";
import { useFavorites } from "@/hooks/useFavorites";
import NotificationCenter from "./NotificationCenter";
import GlobalSearch from "./GlobalSearch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

/** True on macOS/iOS, where the shortcut hint should read "⌘K" instead of "Ctrl K". */
const isApplePlatform = () =>
  typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);

/** How long (ms) the logo must be held before the hidden vault unlocks. */
const HOLD_MS = 2600;
/** Below this, a press is treated as a normal tap-to-home instead of an aborted hold. */
const TAP_MS = 220;

const RING_SIZE = 46;
const RING_RADIUS = 21;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

/**
 * The "N" logo. Tap = go home, as always.
 * Press and hold ~2.5s = unlock the hidden /all-in-one vault page.
 * No visible hint is given until you're already holding — it's meant to be found, not advertised.
 */
const LogoLongPress = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0); // 0..1
  const [holding, setHolding] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const firedRef = useRef(false);

  const clear = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startRef.current = null;
    setHolding(false);
    setProgress(0);
  }, []);

  const tick = useCallback(() => {
    if (startRef.current === null) return;
    const elapsed = Date.now() - startRef.current;
    const p = Math.min(1, elapsed / HOLD_MS);
    setProgress(p);
    if (p >= 1 && !firedRef.current) {
      firedRef.current = true;
      if (navigator.vibrate) navigator.vibrate([30, 40, 60]);
      clear();
      navigate("/all-in-one");
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [clear, navigate]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== undefined && e.button !== 0) return;
    firedRef.current = false;
    startRef.current = Date.now();
    setHolding(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const onPointerUp = () => {
    const elapsed = startRef.current ? Date.now() - startRef.current : 0;
    const wasFired = firedRef.current;
    clear();
    if (!wasFired && elapsed < TAP_MS) {
      navigate("/");
    }
    // else: released mid-hold without completing — do nothing, stay put.
  };

  const onPointerLeave = () => {
    if (holding) clear();
  };

  useEffect(() => clear, [clear]);

  const dashOffset = RING_CIRC * (1 - progress);

  return (
    <button
      type="button"
      aria-label="Nextup Resources — home"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
      onContextMenu={(e) => e.preventDefault()}
      className="relative flex items-center gap-2 sm:gap-3 group select-none touch-none appearance-none bg-transparent p-0 border-0"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center">
        {holding && (
          <svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            className="absolute -inset-[3px] -rotate-90 pointer-events-none"
          >
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              className="text-primary"
              strokeDasharray={RING_CIRC}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 30ms linear" }}
            />
          </svg>
        )}
        <div
          className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary border-2 border-foreground/80 shadow-pop transition-all duration-300 ease-bounce group-hover:shadow-pop-hover group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${
            holding ? "scale-95" : ""
          }`}
        >
          <span className="text-base sm:text-lg font-extrabold text-primary-foreground font-heading">N</span>
        </div>
      </span>
      <span className="hidden xs:inline sm:inline text-sm sm:text-lg font-bold text-foreground font-heading truncate max-w-[140px] sm:max-w-none">
        <span className="sm:hidden">Nextup</span>
        <span className="hidden sm:inline">Nextup Resources</span>
      </span>
    </button>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const location = useLocation();
  const { totalCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMac(isApplePlatform()), []);

  // Global "quick access" shortcut for search: Ctrl+K (Windows/Linux) or Cmd+K (Mac),
  // works from anywhere in the app since Header is mounted on every page.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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
    { to: "/api-hub", label: "API Hub", icon: Plug },
    { to: "/os", label: "Operating Systems", icon: MonitorSmartphone },
    { to: "/games", label: "Games", icon: Gamepad2 },
    { to: "/iot", label: "IoT", icon: Cpu },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
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
            {/* Logo — tap for home, hold ~2.5s to unlock the hidden vault */}
            <LogoLongPress />

            {/* Desktop Navigation — scrolls within its own row instead of spilling onto
                the icon cluster when the row is too tight to fit every pill (e.g. mobile
                "Desktop site" mode, which often reports an in-between viewport width). */}
            <nav className="hidden md:flex min-w-0 flex-1 items-center justify-center gap-0.5 lg:gap-1 px-2 overflow-x-auto no-scrollbar">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-pill relative shrink-0 px-2.5 lg:px-4 text-[13px] lg:text-sm ${
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`nav-pill relative shrink-0 inline-flex items-center gap-1 px-2.5 lg:px-4 text-[13px] lg:text-sm ${
                      moreLinks.some((l) => isActive(l.to))
                        ? "bg-tertiary text-tertiary-foreground font-bold border-2 border-foreground/80"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="More pages"
                  >
                    More <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-64 p-2 bg-card border-2 border-foreground/80 shadow-pop rounded-2xl max-h-[70vh] overflow-y-auto animate-slide-down-pop"
                >
                  {moreLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <DropdownMenuItem key={link.to} asChild className="focus:bg-muted/60 rounded-xl">
                        <Link
                          to={link.to}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold cursor-pointer transition-transform duration-200 ease-bounce hover:translate-x-1 ${
                            isActive(link.to)
                              ? "bg-tertiary text-tertiary-foreground"
                              : "text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" strokeWidth={2.5} />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            <div className="flex items-center gap-1.5 lg:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search Nextup Resources"
                title="Search (Ctrl+K)"
                className="group flex items-center gap-2 h-10 rounded-full border-2 border-foreground/80 bg-card shadow-pop pl-2.5 pr-2.5 sm:pr-3 hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Search className="w-4 h-4 text-foreground shrink-0" strokeWidth={2.5} />
                <span className="hidden lg:inline text-xs font-bold text-muted-foreground">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded-md border-2 border-foreground/30 bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {isMac ? "⌘K" : "Ctrl K"}
                </kbd>
              </button>
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

              <div className="hidden lg:block">
                <Button size="default" asChild>
                  <Link to="/courses">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;
