import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Heart,
  X,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
  Search,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";

const STORAGE_KEY = "intro-seen-v4";
export const OPEN_INTRO_EVENT = "nextup:open-intro";

type Step = {
  icon: any;
  title: string;
  body: string;
  bullets?: string[];
  accent: "primary" | "secondary" | "tertiary" | "quaternary";
};

const STEPS: Step[] = [
  {
    icon: PartyPopper,
    accent: "primary",
    title: "Welcome to Nextup ✨",
    body: "Your playful hub for premium courses, free resources, ebooks, AI tools, and curated Android apps. Let's take a 60-second tour.",
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
    body: "Toggle Study Mode from the header for a calm, focus-only view. On the Courses page, pick a Study Plan (Daily, Weekly, Career, Explore) and we auto-route you.",
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

const accentBg: Record<Step["accent"], string> = {
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

const IntroModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [dontShow, setDontShow] = useState(true);

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
      setOpen(true);
    };
    window.addEventListener(OPEN_INTRO_EVENT, handler);
    return () => window.removeEventListener(OPEN_INTRO_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") setStep((s) => Math.min(STEPS.length - 1, s + 1));
      else if (e.key === "ArrowLeft") setStep((s) => Math.max(0, s - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    try {
      if (dontShow) localStorage.setItem(STORAGE_KEY, "1");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

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
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-card border-2 border-foreground/80 rounded-3xl shadow-pop">
        <button
          onClick={close}
          aria-label="Close tutorial"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card border-2 border-foreground/80 shadow-pop-soft flex items-center justify-center hover:-translate-y-0.5 transition-transform z-10"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {/* Progress bar */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-2">
            <span>Step {step + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted border-2 border-foreground/30 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%`, transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-5 animate-fade-in" key={step}>
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-foreground/80 shadow-pop mb-3 ${accentBg[current.accent]}`}
            >
              <Icon className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h2 id="intro-title" className="text-2xl sm:text-3xl font-extrabold font-heading mb-2">
              {current.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              {current.body}
            </p>
          </div>

          {current.bullets && (
            <ul className="rounded-2xl border-2 border-foreground/30 p-4 mb-5 bg-background/50 space-y-2">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 mb-4">
            {STEPS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to step ${i + 1}`}
                onClick={() => setStep(i)}
                className={`h-2 rounded-full border-2 border-foreground/80 transition-all ${
                  i === step ? "w-6 bg-primary" : "w-2 bg-card hover:bg-muted"
                }`}
              />
            ))}
          </div>

          {!isLast ? (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={isFirst}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-card text-foreground font-bold border-2 border-foreground/80 shadow-pop-soft hover:-translate-y-0.5 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back
              </button>
              <button
                onClick={close}
                className="text-xs text-muted-foreground font-bold underline underline-offset-4 hover:text-foreground"
              >
                Skip tour
              </button>
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform"
              >
                Next <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
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
          )}

          <label className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground mt-5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="w-4 h-4 accent-primary rounded border-2 border-foreground/80"
            />
            Don't show this tutorial again
          </label>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
