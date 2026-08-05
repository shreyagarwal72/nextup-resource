import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import { useSettings, type Settings as SettingsShape } from "@/hooks/useSettings";
import { haptics } from "@/lib/haptics";
import { openIntroModal } from "@/components/IntroModal";
import { updatePageMeta } from "@/lib/og-image";
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
}) => (
  <button
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`relative h-8 w-14 shrink-0 rounded-full border-2 border-foreground/80 transition-colors duration-300 ${
      checked ? "bg-primary" : "bg-muted"
    }`}
  >
    <span
      className={`absolute top-[3px] h-[22px] w-[22px] rounded-full border-2 border-foreground/80 bg-card transition-all duration-300 ease-bounce ${
        checked ? "left-[30px]" : "left-[3px]"
      }`}
    />
  </button>
);

const Settings = () => {
  const { settings, toggle, reset } = useSettings();
  const [cleared, setCleared] = useState(false);
  const dirty = useRef(false);

  useEffect(() => {
    updatePageMeta({
      title: "Settings — Nextup Resources",
      description:
        "Personalise Nextup Resources: haptic feedback, bottom nav labels, animations, assistant and more.",
      url: "/settings",
    });
  }, []);

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

          <div className="space-y-3">
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              const checked = settings[item.key];
              return (
                <div
                  key={item.key}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="animate-pop-in opacity-0 flex items-center gap-4 rounded-2xl border-2 border-foreground/80 bg-card p-4 shadow-pop-soft"
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

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <button
              onClick={() => openIntroModal()}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-foreground/80 bg-card px-4 py-3 font-bold shadow-pop-soft transition-transform duration-200 ease-bounce hover:-translate-y-0.5 active:scale-95"
            >
              <BookOpen className="h-4 w-4" strokeWidth={2.5} /> Replay tour
            </button>
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-foreground/80 bg-card px-4 py-3 font-bold shadow-pop-soft transition-transform duration-200 ease-bounce hover:-translate-y-0.5 active:scale-95"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={2.5} /> Reset defaults
            </button>
            <button
              onClick={clearCaches}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-foreground/80 bg-card px-4 py-3 font-bold shadow-pop-soft transition-transform duration-200 ease-bounce hover:-translate-y-0.5 active:scale-95"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2.5} />
              {cleared ? "Cache cleared" : "Clear cache"}
            </button>
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
