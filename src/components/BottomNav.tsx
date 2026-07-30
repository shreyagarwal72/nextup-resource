import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
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
  Map,
  Dumbbell,
  Tv,
  Plug,
  Gamepad2,
  Cpu,
  Bug,
  Palette,
} from "lucide-react";

type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

const links: { to: string; icon: any; label: string; accent: Accent }[] = [
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
  { to: "/developer-roadmap", icon: Map, label: "Roadmap", accent: "tertiary" },
  { to: "/special-courses", icon: Briefcase, label: "Placement", accent: "tertiary" },
  // Ring 4 — Quaternary
  { to: "/android-re", icon: Bug, label: "Android RE", accent: "quaternary" },
  { to: "/design-md", icon: Palette, label: "Design.md", accent: "quaternary" },
  { to: "/api-hub", icon: Plug, label: "API Hub", accent: "quaternary" },
  { to: "/games", icon: Gamepad2, label: "Games", accent: "quaternary" },
  { to: "/iot", icon: Cpu, label: "IoT", accent: "quaternary" },
];

const textCls: Record<Accent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  quaternary: "text-quaternary",
};
const bgCls: Record<Accent, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  quaternary: "bg-quaternary",
};

const NavItem = ({
  to,
  icon: Icon,
  label,
  accent,
  active,
  itemRef,
}: {
  to: string;
  icon: any;
  label: string;
  accent: Accent;
  active: boolean;
  itemRef?: (el: HTMLAnchorElement | null) => void;
}) => (
  <Link
    ref={itemRef}
    to={to}
    className={`relative flex shrink-0 snap-center flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
      active ? textCls[accent] : "text-muted-foreground"
    }`}
  >
    {active && (
      <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full ${bgCls[accent]}`} />
    )}
    <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
    <span
      className={`text-[10px] whitespace-nowrap ${active ? `font-bold ${textCls[accent]}` : "font-medium"}`}
    >
      {label}
    </span>
  </Link>
);

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [location.pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-2 mb-2 bg-card border-2 border-foreground/80 rounded-2xl shadow-pop">
        <div className="relative">
          {/* Edge fades hint that the row scrolls */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 rounded-l-2xl bg-gradient-to-r from-card to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 rounded-r-2xl bg-gradient-to-l from-card to-transparent z-10" />
          <div
            className="flex items-center gap-1 overflow-x-auto no-scrollbar snap-x snap-mandatory px-3 py-1.5"
            style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
          >
            {links.map((link) => {
              const active = isActive(link.to);
              return (
                <NavItem
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  accent={link.accent}
                  active={active}
                  itemRef={active ? (el) => (activeRef.current = el) : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
