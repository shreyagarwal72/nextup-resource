import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Bot, Heart, X, PartyPopper, Search, GraduationCap, MoreHorizontal, Pause, Play } from "lucide-react";
import type { Accent, PaletteHsl } from "./IntroScene";

// The 3D scene (three.js + @react-three/fiber) is only fetched once someone
// actually opens the intro — not on every page load.
const IntroScene = lazy(() => import("./IntroScene"));

const STORAGE_KEY = "intro-seen-v4";
export const OPEN_INTRO_EVENT = "nextup:open-intro";

type Step = {
  icon: any;
  title: string;
  body: string;
  bullets?: string[];
  accent: Accent;
};

const STEPS: Step[] = [
  {
    icon: PartyPopper,
    accent: "primary",
    title: "Welcome to Nextup ✨",
    body: "Your playful hub for premium courses, free resources, ebooks, AI tools, and curated Android apps. Sit back — here's the 30-second tour.",
  },
  {
    icon: BookOpen,
    accent: "tertiary",
    title: "Learn from curated content",
    body: "Everything is organized so you never dig around. Jump between sections from the top navigation.",
    bullets: [
      "Premium Courses — 50+ curated learning bundles",
      "Free Resources — templates, packs, creative assets",
      "Ebooks & Placement Material — company-prep bundles",
    ],
  },
  {
    icon: Bot,
    accent: "secondary",
    title: "AI Tools & Apps directory",
    body: "Discover hand-picked AI tools, mobile apps, and websites — grouped and searchable.",
    bullets: [
      "AI Tools — the best AI apps by category",
      "Apps & Sites — productivity + learning picks",
      "FOSS / Shizuku / Morphe / Material You — Android power tools",
    ],
  },
  {
    icon: Search,
    accent: "quaternary",
    title: "Search everything, fast",
    body: "Use the global search on the home page to instantly find courses, tools, apps, or ebooks across the whole catalog.",
    bullets: [
      "Fuzzy match — typos are OK",
      "Jump directly to the item's page",
      "Filter by section on results",
    ],
  },
  {
    icon: GraduationCap,
    accent: "tertiary",
    title: "Study Mode & Study Plans",
    body: "Toggle Study Mode from the header for a calm, focus-only view. On the Courses page, pick a Study Plan and we auto-route you.",
    bullets: [
      "Only educational content stays visible",
      "A slim banner shows your study counts",
      "Exit any time from the banner or header",
    ],
  },
  {
    icon: MoreHorizontal,
    accent: "primary",
    title: "Navigation tips",
    body: "The layout adapts to your device — same content, cleanest possible surface.",
    bullets: [
      "Desktop: use the “More ▾” dropdown for extra pages",
      "Mobile: swipe the bottom bar sideways to see every page",
      "Bell icon (top-right) opens the What's New inbox",
    ],
  },
  {
    icon: Heart,
    accent: "secondary",
    title: "Favorites & personalisation",
    body: "Bookmark anything with the heart icon — your favorites live locally in your browser. Toggle light/dark theme from the header.",
  },
];

// ~4.2s base read time per step, plus extra time per bullet line
const STEP_DURATIONS = STEPS.map((s) => 4200 + (s.bullets ? s.bullets.length * 900 : 0));

const accentBg: Record<Accent, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  tertiary: "bg-tertiary text-tertiary-foreground",
  quaternary: "bg-quaternary text-quaternary-foreground",
};

export const openIntroModal = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(OPEN_INTRO_EVENT));
};

// Reads the app's live HSL design tokens (e.g. "262 83% 66%") so the 3D
// scene always matches the current theme (light / dark / study mode).
const readHslVar = (name: string): string => {
  if (typeof window === "undefined") return "0 0% 60%";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "0 0% 60%";
};

const readPaletteHsl = (): PaletteHsl => ({
  primary: readHslVar("--primary"),
  secondary: readHslVar("--secondary"),
  tertiary: readHslVar("--tertiary"),
  quaternary: readHslVar("--quaternary"),
  edge: readHslVar("--foreground"),
});

// Reveals text character-by-character — the "live narrator" effect, without audio.
const useReveal = (text: string, speed = 16) => {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return shown;
};

const IntroModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const paletteHsl = useMemo(() => (open ? readPaletteHsl() : null), [open]);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const id = setTimeout(() => setOpen(true), 400);
        return () => clearTimeout(id);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      setStep(0);
      setFinished(false);
      setPaused(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_INTRO_EVENT, handler);
    return () => window.removeEventListener(OPEN_INTRO_EVENT, handler);
  }, []);

  // Auto-advance loop, driven by requestAnimationFrame so pausing doesn't reset progress.
  useEffect(() => {
    if (!open || finished) return undefined;

    let raf: number;
    let last = performance.now();
    let elapsed = 0;
    setProgress(0);

    const tick = (now: number) => {
      if (!pausedRef.current) elapsed += now - last;
      last = now;
      const duration = STEP_DURATIONS[step];
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        if (step < STEPS.length - 1) setStep((s) => s + 1);
        else setFinished(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, step, finished]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const current = STEPS[step];
  const Icon = current.icon;
  const revealedTitle = useReveal(current.title, 22);
  const revealedBody = useReveal(finished ? "" : current.body, 14);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-foreground/80 bg-card shadow-pop overflow-hidden animate-scale-in">
        <button
          onClick={close}
          aria-label="Skip tour"
          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-card text-foreground font-bold text-xs border-2 border-foreground/80 shadow-pop-soft hover:-translate-y-0.5 transition-transform"
        >
          <X className="w-3.5 h-3.5" />
          Skip
        </button>

        {/* 3D scene */}
        <div
          className="relative h-52 sm:h-64 w-full overflow-hidden rounded-t-3xl border-b-2 border-foreground/80 bg-gradient-to-b from-background to-card cursor-pointer"
          onClick={() => !finished && setPaused((p) => !p)}
          role={finished ? undefined : "button"}
          aria-label={finished ? undefined : paused ? "Resume tour" : "Pause tour"}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-foreground/40 border-t-foreground animate-spin" />
              </div>
            }
          >
            {paletteHsl && <IntroScene accent={current.accent} paletteHsl={paletteHsl} />}
          </Suspense>

          {!finished && (
            <div className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-foreground/70 text-background text-[11px] font-bold backdrop-blur-sm">
              {paused ? (
                <>
                  <Play className="w-3 h-3" />
                  Paused — tap to resume
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3" />
                  Tap to pause
                </>
              )}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!finished && (
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-foreground/60 mb-1.5">
              <span>
                Step {step + 1} of {STEPS.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="px-6 py-6">
          {!finished ? (
            <div>
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-foreground/80 shadow-pop mb-3 ${accentBg[current.accent]}`}
              >
                <Icon className="w-7 h-7" />
              </div>

              <h2 id="intro-title" className="text-xl sm:text-2xl font-extrabold mb-2">
                {revealedTitle}
                <span className="animate-pulse">|</span>
              </h2>

              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                {revealedBody}
              </p>

              {current.bullets && revealedBody === current.body && (
                <ul className="mt-3 space-y-1.5 animate-fade-in">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 id="intro-title" className="text-xl sm:text-2xl font-extrabold mb-2">
                You're all set 🎉
              </h2>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-5">
                That's the tour. Jump in and start exploring.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/courses"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform"
                >
                  Explore courses →
                </Link>
                <Link
                  to="/faq"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-secondary text-secondary-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform"
                >
                  Need help? FAQ
                </Link>
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-card text-foreground font-bold border-2 border-foreground/80 shadow-pop-soft hover:-translate-y-0.5 transition-transform"
                >
                  Look around
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
