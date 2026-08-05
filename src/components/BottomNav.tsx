import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { haptics } from "@/lib/haptics";

import {
  Home,
  BookOpen,
  FolderOpen,
  Bot,
  Globe,
  BookText,
  Send,
  Github,
  Zap,
  Briefcase,
  Sparkles,
  Layers,
  Map as MapIcon,
  Dumbbell,
  Tv,
  Plug,
  MonitorSmartphone,
  Gamepad2,
  Cpu,
  Bug,
  Palette,
  LayoutGrid,
  X,
  Settings as SettingsIcon,
} from "lucide-react";

type Accent = "primary" | "secondary" | "tertiary" | "quaternary";
type NavLinkItem = { to: string; icon: any; label: string; accent: Accent };

const links: NavLinkItem[] = [
  // Ring 1 — Primary
  { to: "/", icon: Home, label: "Home", accent: "primary" },
  { to: "/resources", icon: FolderOpen, label: "Resources", accent: "primary" },
  { to: "/courses", icon: BookOpen, label: "Courses", accent: "primary" },
  { to: "/ebooks", icon: BookText, label: "Ebooks", accent: "primary" },
  { to: "/apps", icon: Globe, label: "Apps", accent: "primary" },
  // Ring 2 — Secondary
  { to: "/foss-apps", icon: Github, label: "FOSS", accent: "secondary" },
  { to: "/shizuku-apps", icon: Zap, label: "Shizuku", accent: "secondary" },
  { to: "/morphe", icon: Sparkles, label: "Morphe", accent: "secondary" },
  { to: "/material-you", icon: Layers, label: "MatYou", accent: "secondary" },
  { to: "/tv-apps", icon: Tv, label: "TV Apps", accent: "secondary" },
  // Ring 3 — Tertiary
  { to: "/ai", icon: Bot, label: "AI", accent: "tertiary" },
  { to: "/telegram-tweaks", icon: Send, label: "Telegram", accent: "tertiary" },
  { to: "/guru-mann-fitness", icon: Dumbbell, label: "Fitness", accent: "tertiary" },
  { to: "/developer-roadmap", icon: MapIcon, label: "Roadmap", accent: "tertiary" },
  { to: "/special-courses", icon: Briefcase, label: "Placement", accent: "tertiary" },
  // Ring 4 — Quaternary
  { to: "/android-re", icon: Bug, label: "Android RE", accent: "quaternary" },
  { to: "/design-md", icon: Palette, label: "Design.md", accent: "quaternary" },
  { to: "/api-hub", icon: Plug, label: "API Hub", accent: "quaternary" },
  { to: "/os", icon: MonitorSmartphone, label: "OS", accent: "quaternary" },
  { to: "/games", icon: Gamepad2, label: "Games", accent: "quaternary" },
  { to: "/iot", icon: Cpu, label: "IoT", accent: "quaternary" },
  { to: "/settings", icon: SettingsIcon, label: "Settings", accent: "quaternary" },
];

const groups: { title: string; accent: Accent }[] = [
  { title: "Main", accent: "primary" },
  { title: "Android", accent: "secondary" },
  { title: "Learn & Tools", accent: "tertiary" },
  { title: "Explore", accent: "quaternary" },
];

/** Routes that actually contain study material — the only ones shown in Study Mode. */
const STUDY_ROUTES = new Set([
  "/",
  "/courses",
  "/resources",
  "/ebooks",
  "/special-courses",
  "/developer-roadmap",
  "/ai",
  "/api-hub",
  "/settings",
]);


const textCls: Record<Accent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  quaternary: "text-quaternary",
};
const bgCls: Record<Accent, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  tertiary: "bg-tertiary text-tertiary-foreground",
  quaternary: "bg-quaternary text-quaternary-foreground",
};

/** Icon-only pill that expands with a spring when it becomes the active route. */
const DockItem = ({
  link,
  active,
  preview,
  showLabel,
  animations,
  itemRef,
}: {
  link: NavLinkItem;
  active: boolean;
  preview: boolean;
  showLabel: boolean;
  animations: boolean;
  itemRef: (el: HTMLAnchorElement | null) => void;
}) => {
  const Icon = link.icon;
  const lit = active || preview;
  return (
    <Link
      ref={itemRef}
      to={link.to}
      data-nav-to={link.to}
      draggable={false}
      aria-label={link.label}
      aria-current={active ? "page" : undefined}
      className={`group relative flex shrink-0 snap-center items-center gap-1.5 rounded-full border-2 px-2.5 py-2 ${
        animations ? "transition-all duration-300 ease-bounce active:scale-90" : "transition-none"
      } ${
        lit
          ? `${bgCls[link.accent]} border-foreground/80 shadow-pop-active`
          : "border-transparent text-muted-foreground hover:border-foreground/20 hover:bg-muted/60"
      } ${preview ? (animations ? "scale-110 ring-2 ring-foreground/30" : "ring-2 ring-foreground/30") : ""}`}
    >
      <Icon
        className={`w-5 h-5 ${animations ? "transition-transform duration-300 ease-bounce group-active:rotate-6" : ""}`}
        strokeWidth={lit ? 2.6 : 2}
      />
      <span
        className={`overflow-hidden whitespace-nowrap text-[11px] font-extrabold ${
          animations ? "transition-all duration-300 ease-bounce" : "transition-none"
        } ${showLabel ? "ml-0 max-w-[88px] opacity-100" : "max-w-0 opacity-0"}`}
      >
        {link.label}
      </span>


    </Link>
  );

};

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [open, setOpen] = useState(false);
  const { settings } = useSettings();

  const navigate = useNavigate();
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const stripRef = useRef<HTMLDivElement>(null);

  // ---- Drag-to-switch (independent of the label/showLabel logic) ----
  const [previewTo, setPreviewTo] = useState<string | null>(null);
  const drag = useRef({
    down: false,
    x: 0,
    y: 0,
    t: 0,
    active: false,
    hover: null as string | null,
  });
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const hitTest = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      return el?.closest<HTMLElement>("[data-nav-to]")?.dataset.navTo ?? null;
    };

    const start = (x: number, y: number) => {
      drag.current = { down: true, x, y, t: Date.now(), active: false, hover: null };
    };

    /** @returns true when the gesture is in drag-select mode (caller should block scroll). */
    const move = (x: number, y: number) => {
      const d = drag.current;
      if (!d.down) return false;
      const dx = x - d.x;
      const dy = y - d.y;
      if (!d.active) {
        // Deliberate press: a real horizontal move AND a short hold, so casual
        // scroll swipes and vertical page scrolls are left alone.
        const horizontal = Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.5;
        if (!horizontal || Date.now() - d.t < 150) return false;
        d.active = true;
      }
      const to = hitTest(x, y);
      if (to && to !== d.hover) {
        d.hover = to;
        setPreviewTo(to);
        haptics.medium();
      }
      return true;
    };

    const end = (commit: boolean) => {
      const d = drag.current;
      const target = d.hover;
      const wasActive = d.active;
      drag.current = { down: false, x: 0, y: 0, t: 0, active: false, hover: null };
      setPreviewTo(null);
      if (commit && wasActive && target && target !== pathRef.current) navigate(target);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) start(t.clientX, t.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      // preventDefault keeps the native strip scroll from stealing the gesture
      // *only* once drag-select mode has engaged; casual swipes still scroll.
      if (move(t.clientX, t.clientY) && e.cancelable) e.preventDefault();
    };
    const onTouchEnd = () => end(true);
    const onTouchCancel = () => end(false);

    // Mouse fallback (desktop/dev tools) — touch is the primary path.
    const onMouseDown = (e: MouseEvent) => start(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onMouseUp = () => drag.current.down && end(true);

    strip.addEventListener("touchstart", onTouchStart, { passive: true });
    strip.addEventListener("touchmove", onTouchMove, { passive: false });
    strip.addEventListener("touchend", onTouchEnd);
    strip.addEventListener("touchcancel", onTouchCancel);
    strip.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      strip.removeEventListener("touchstart", onTouchStart);
      strip.removeEventListener("touchmove", onTouchMove);
      strip.removeEventListener("touchend", onTouchEnd);
      strip.removeEventListener("touchcancel", onTouchCancel);
      strip.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [navigate]);

  /** Swallow the click that follows a real drag so we don't double-navigate. */
  const onStripClickCapture = (e: React.MouseEvent) => {
    if (drag.current.active) {
      e.preventDefault();
      e.stopPropagation();
    }
  };



  // Keep the active dock item centred as the route changes.
  // NOTE: intentionally NOT using scrollIntoView here — on a `fixed` nav it
  // causes some mobile browsers to also scroll the window/page, which was
  // the source of the page auto-scrolling down on every route change.
  // Scrolling the strip's own scrollLeft keeps this fully contained.
  useEffect(() => {
    const activeEl = itemRefs.current.get(location.pathname);
    const strip = stripRef.current;
    if (activeEl && strip) {
      const target =
        activeEl.offsetLeft - strip.clientWidth / 2 + activeEl.clientWidth / 2;
      strip.scrollTo({ left: target, behavior: "smooth" });
    }
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll + close on Escape while the launcher sheet is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const activeLink = links.find((l) => isActive(l.to));

  return (
    <>
      {/* Launcher sheet — every destination, grouped */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="All pages"
            className="absolute inset-x-2 bottom-2 max-h-[78vh] overflow-y-auto rounded-3xl border-2 border-foreground/80 bg-card p-4 shadow-pop animate-slide-up-pop"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-lg font-extrabold">All pages</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground/80 bg-card shadow-pop-soft transition-transform duration-200 ease-bounce active:scale-90"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            {groups.map((group) => {
              const items = links.filter((l) => l.accent === group.accent);
              return (
                <div key={group.title} className="mb-4 last:mb-0">
                  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    {group.title}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {items.map((link, i) => {
                      const Icon = link.icon;
                      const active = isActive(link.to);
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          style={{ animationDelay: `${i * 35}ms` }}
                          className={`flex animate-pop-in flex-col items-center gap-1.5 rounded-2xl border-2 border-foreground/80 px-2 py-3 text-center opacity-0 shadow-pop-soft transition-transform duration-200 ease-bounce active:scale-95 ${
                            active ? bgCls[link.accent] : "bg-card"
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${active ? "" : textCls[link.accent]}`} strokeWidth={2.5} />
                          <span className="text-[11px] font-bold leading-tight">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden" aria-label="Primary">
        <div
          className="mx-2 mb-2 flex items-center gap-1 rounded-full border-2 border-foreground/80 bg-card/95 pl-1.5 pr-2 py-1.5 shadow-pop backdrop-blur-md"
          style={{ marginBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        >
          {/* Launcher */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open all pages"
            aria-expanded={open}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground/80 shadow-pop-soft transition-transform duration-300 ease-bounce active:scale-90 ${
              open ? "rotate-90 bg-quaternary text-quaternary-foreground" : "bg-card"
            }`}
          >
            <LayoutGrid className="h-4.5 w-4.5" strokeWidth={2.5} />
          </button>

          <div className="relative min-w-0 flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-card to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-card to-transparent" />
            <div
              ref={stripRef}
              onDragStart={(e) => e.preventDefault()}
              onClickCapture={onStripClickCapture}

              className="no-scrollbar flex snap-x snap-proximity items-center gap-0.5 overflow-x-auto px-1 py-1 pr-2 -my-1 -mr-2"
            >
              {links.map((link) => {
                const active = isActive(link.to);
                const preview = previewTo === link.to;
                return (
                  <DockItem
                    key={link.to}
                    link={link}
                    active={active}
                    preview={preview}
                    animations={settings.animations}
                    showLabel={settings.navLabels || active || preview}
                    itemRef={(el) => {
                      if (el) itemRefs.current.set(link.to, el);
                      else itemRefs.current.delete(link.to);
                    }}
                  />
                );
              })}
            </div>

          </div>
        </div>

        {/* Live region so screen readers announce the current section */}
        <span className="sr-only" aria-live="polite">
          {activeLink ? `${activeLink.label} page` : ""}
        </span>
      </nav>
    </>
  );
};

export default BottomNav;
