import { Link } from "react-router-dom";
import {
  BookOpen,
  FolderOpen,
  BookText,
  Globe,
  Bot,
  Github,
  Zap,
  Sparkles,
  Layers,
  Tv,
  Send,
  Dumbbell,
  Map as MapIcon,
  Briefcase,
  Bug,
  Palette,
  Plug,
  Gamepad2,
  Cpu,
  Heart,
  Compass,
  ArrowUpRight,
} from "lucide-react";

type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

const accentBg: Record<Accent, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  tertiary: "bg-tertiary text-tertiary-foreground",
  quaternary: "bg-quaternary text-quaternary-foreground",
};

const groups: { title: string; items: { to: string; label: string; icon: any; accent: Accent }[] }[] = [
  {
    title: "Learn",
    items: [
      { to: "/courses", label: "Courses", icon: BookOpen, accent: "primary" },
      { to: "/ebooks", label: "Ebooks", icon: BookText, accent: "primary" },
      { to: "/special-courses", label: "Placement", icon: Briefcase, accent: "primary" },
      { to: "/developer-roadmap", label: "Roadmap", icon: MapIcon, accent: "primary" },
      { to: "/guru-mann-fitness", label: "Fitness", icon: Dumbbell, accent: "primary" },
    ],
  },
  {
    title: "Build & Create",
    items: [
      { to: "/resources", label: "Resources", icon: FolderOpen, accent: "tertiary" },
      { to: "/design-md", label: "Design.md", icon: Palette, accent: "tertiary" },
      { to: "/api-hub", label: "API Hub", icon: Plug, accent: "tertiary" },
      { to: "/android-re", label: "Android RE", icon: Bug, accent: "tertiary" },
      { to: "/iot", label: "IoT", icon: Cpu, accent: "tertiary" },
    ],
  },
  {
    title: "Android & Apps",
    items: [
      { to: "/apps", label: "Apps & Sites", icon: Globe, accent: "secondary" },
      { to: "/foss-apps", label: "FOSS", icon: Github, accent: "secondary" },
      { to: "/shizuku-apps", label: "Shizuku", icon: Zap, accent: "secondary" },
      { to: "/morphe", label: "Morphe", icon: Sparkles, accent: "secondary" },
      { to: "/material-you", label: "Material You", icon: Layers, accent: "secondary" },
      { to: "/tv-apps", label: "Android TV", icon: Tv, accent: "secondary" },
    ],
  },
  {
    title: "Explore",
    items: [
      { to: "/ai", label: "AI Tools", icon: Bot, accent: "quaternary" },
      { to: "/telegram-tweaks", label: "Telegram", icon: Send, accent: "quaternary" },
      { to: "/games", label: "Games", icon: Gamepad2, accent: "quaternary" },
      { to: "/favorites", label: "Favorites", icon: Heart, accent: "quaternary" },
    ],
  },
];

/** Deep-link hub: every destination on the site, one tap from the home page. */
const QuickAccess = () => (
  <section className="py-14 relative" aria-labelledby="quick-access-heading">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-card border-2 border-foreground/80 shadow-pop font-bold text-sm">
          <Compass className="w-4 h-4" strokeWidth={2.5} />
          <span>Jump straight in</span>
        </div>
        <h2 id="quick-access-heading" className="text-3xl sm:text-4xl font-extrabold font-heading mb-2">
          Explore every section
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Direct links to all catalogs — no digging through menus.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.title}
            className="rounded-3xl border-2 border-foreground/80 bg-card p-5 shadow-pop-soft transition-all duration-300 ease-bounce hover:shadow-pop hover:-translate-y-0.5"
          >
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
              {group.title}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className="group animate-pop-in opacity-0 flex items-center gap-2 rounded-2xl border-2 border-foreground/80 bg-background px-3 py-2.5 text-sm font-bold shadow-pop-soft transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-pop active:scale-95"
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-foreground/80 ${accentBg[item.accent]}`}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="truncate">{item.label}</span>
                    <ArrowUpRight
                      className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5"
                      strokeWidth={3}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickAccess;
