import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDesignSystem, type DesignSystem } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSettings, type Settings as SettingsShape } from "@/hooks/useSettings";
import { haptics } from "@/lib/haptics";
import { openIntroModal } from "@/components/IntroModal";
import {
  Vibrate,
  Tags,
  Sparkles,
  MessageCircle,
  ArrowUpCircle,
  RotateCcw,
  Trash2,
  BookOpen,
  SlidersHorizontal,
  Palette,
  SunMoon,
} from "lucide-react";

type Item = {
  key: keyof SettingsShape;
  icon: any;
  title: string;
  desc: string;
  accent: "primary" | "secondary" | "tertiary" | "quaternary";
};

const ITEMS: Item[] = [
  {
    key: "haptics",
    icon: Vibrate,
    title: "Haptic feedback",
    desc: "Subtle vibration on taps. Android only — silently ignored elsewhere.",
    accent: "primary",
  },
  {
    key: "navLabels",
    icon: Tags,
    title: "App names in bottom nav",
    desc: "Show the text label next to the active icon in the mobile dock.",
    accent: "secondary",
  },
  {
    key: "animations",
    icon: Sparkles,
    title: "Animations & transitions",
    desc: "Turn off for a flat, instant interface with no motion.",
    accent: "tertiary",
  },
  {
    key: "chatWidget",
    icon: MessageCircle,
    title: "Resourcely assistant",
    desc: "Show the floating chat launcher on every page.",
    accent: "quaternary",
  },
  {
    key: "scrollTopButton",
    icon: ArrowUpCircle,
    title: "Scroll-to-top button",
    desc: "Show the quick jump button after scrolling down a page.",
    accent: "primary",
  },
];

const dotBg: Record<Item["accent"], string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  tertiary: "bg-tertiary text-tertiary-foreground",
  quaternary: "bg-quaternary text-quaternary-foreground",
};

const Toggle = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => <Switch checked={checked} onCheckedChange={onChange} aria-label={label} className="h-8 w-14 [&>span]:h-[22px] [&>span]:w-[22px] data-[state=checked]:[&>span]:translate-x-[28px]" />;

const Settings = () => {
  const { settings, toggle, reset } = useSettings();
  const { designSystem, setDesignSystem } = useDesignSystem();
  const [cleared, setCleared] = useState(false);
  const dirty = useRef(false);
  const isClay = designSystem === "clay";
  const settingSurface = isClay
    ? "clay-card"
    : "rounded-2xl border-2 border-foreground/80 bg-card shadow-pop-soft";

  // Title/description/canonical are set centrally by <SEOManager />
  // (see the "settings" entry in pageSEOConfigs, src/lib/og-image.ts).

  // Leaving Settings after changing something does a hard refresh, so every
  // page (including cached PWA shells) picks the new preferences up cleanly.
  useEffect(
    () => () => {
      if (dirty.current) window.location.reload();
    },
    [],
  );

  const onToggle = (key: keyof SettingsShape) => {
    toggle(key);
    dirty.current = true;
    // Always buzz here so the haptics switch itself confirms, even when the
    // preference was just turned off.
    haptics.force(20);
  };

  const chooseDesignSystem = (next: DesignSystem) => {
    setDesignSystem(next);
    haptics.medium();
  };


  const clearCaches = async () => {
    try {
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.allSettled(keys.map((k) => caches.delete(k)));
      }
    } catch {
      /* ignore */
    }
    setCleared(true);
    setTimeout(() => setCleared(false), 2500);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-card border-2 border-foreground/80 shadow-pop font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2.5} />
              <span>Preferences</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">Settings</h1>
            <p className="mt-2 text-muted-foreground">
              Everything is stored only in this browser — nothing leaves your device.
            </p>
          </div>

          <section className="mb-8" aria-labelledby="appearance-heading">
            <div className="mb-3 flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" strokeWidth={2.5} />
              <h2 id="appearance-heading" className="font-heading text-xl font-extrabold">Appearance</h2>
            </div>

            <div className="space-y-3">
              <div className={`${settingSurface} p-4 sm:p-5`}>
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Palette className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="font-heading font-extrabold">Design style</h3>
                    <p className="text-sm text-muted-foreground">Choose the site’s shapes, depth, and motion. This does not change light or dark mode.</p>
                  </div>
                </div>
                <div className={`grid grid-cols-2 gap-2 rounded-[22px] p-1.5 ${isClay ? "clay-input" : "border-2 border-foreground/30 bg-muted"}`} role="radiogroup" aria-label="Design style">
                  {([
                    ["geometric", "Playful Geometric"],
                    ["clay", "Claymorphism"],
                  ] as const).map(([value, label]) => {
                    const active = designSystem === value;
                    return (
                      <Button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        variant={active ? "default" : "ghost"}
                        onClick={() => chooseDesignSystem(value)}
                        className="h-auto min-h-11 whitespace-normal px-3 py-2 text-center leading-tight"
                      >
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className={`${settingSurface} flex items-center gap-4 p-4`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tertiary text-tertiary-foreground">
                  <SunMoon className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-extrabold">Light or dark mode</h3>
                  <p className="text-sm text-muted-foreground">Switch color brightness independently from the design style.</p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </section>

          <section aria-labelledby="preferences-heading">
            <h2 id="preferences-heading" className="sr-only">Feature preferences</h2>
          <div className="space-y-3">
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              const checked = settings[item.key];
              return (
                <div
                  key={item.key}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className={`animate-pop-in opacity-0 flex items-center gap-4 p-4 ${settingSurface}`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground/80 ${dotBg[item.accent]}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-extrabold leading-tight">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Toggle checked={checked} onChange={() => onToggle(item.key)} label={item.title} />
                </div>
              );
            })}
          </div>
          </section>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Button
              variant="outline"
              onClick={() => openIntroModal()}
              className="h-auto px-4 py-3"
            >
              <BookOpen className="h-4 w-4" strokeWidth={2.5} /> Replay tour
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                reset();
                dirty.current = true;
              }}
              className="h-auto px-4 py-3"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={2.5} /> Reset defaults
            </Button>
            <Button
              variant="outline"
              onClick={clearCaches}
              className="h-auto px-4 py-3"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2.5} />
              {cleared ? "Cache cleared" : "Clear cache"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </div>
  );
};

export default Settings;
