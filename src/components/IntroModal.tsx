import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Heart,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  GraduationCap,
  MoreHorizontal,
  SlidersHorizontal,
  Check,
  Palette,
} from "lucide-react";
import { useDesignSystem, DesignSystem } from "@/components/ThemeProvider";
import { Tape, NotebookHoles, RubberStamp } from "@/components/ui/tape";
import { isBotOrScreenshotEnv } from "@/lib/botDetection";

const STORAGE_KEY = "intro-seen-v3";
export const OPEN_INTRO_EVENT = "nextup:open-intro";

type Step = {
  icon: any;
  title: string;
  body: string;
  bullets?: string[];
  accent: "primary" | "secondary" | "tertiary" | "quaternary";
};

const THEME_OPTIONS: { id: DesignSystem; label: string; desc: string; isDefault?: boolean }[] = [
  { id: "looseleaf", label: "Looseleaf", desc: "Hand-drawn notebook paper & washi tape", isDefault: true },
  { id: "geometric", label: "Geometric", desc: "Sharp, high-contrast neo-brutalist cards" },
  { id: "clay", label: "Claymorphism", desc: "Soft 3D tactile pillowy surfaces" },
  { id: "squid-game", label: "Squid Game", desc: "Minimal hot pink & dark circle/triangle/square" },
  { id: "minecraft", label: "Minecraft", desc: "Retro 8-bit pixel UI textures" },
];

const STEPS: Step[] = [
  {
    icon: Sparkles,
    accent: "primary",
    title: "Welcome to Nextup Resources",
    body: "Your curated catalog for expert courses, developer resources, ebooks, AI tools, and verified Android tools. Choose your preferred style to begin.",
  },
  {
    icon: BookOpen,
    accent: "tertiary",
    title: "Curated learning content",
    body: "Everything is organized so you never dig around. Jump between sections directly from the top navigation.",
    bullets: [
      "Premium Courses: 50+ vetted learning bundles",
      "Free Resources: templates, icon packs, creative assets",
      "Ebooks & Placement Material: interview-prep guides",
    ],
  },
  {
    icon: Bot,
    accent: "secondary",
    title: "AI Tools & Apps directory",
    body: "Discover hand-picked AI tools, mobile apps, and websites, grouped and searchable.",
    bullets: [
      "AI Tools: top AI tools categorized by workflow",
      "Apps & Sites: productivity and learning picks",
      "FOSS & Android: curated power tools and utilities",
    ],
  },
  {
    icon: Search,
    accent: "quaternary",
    title: "Instant catalog search",
    body: "Tap Search in the header or press Ctrl+K (Cmd+K on Mac) to instantly find courses, tools, apps, or ebooks across the entire catalog.",
    bullets: [
      "Fuzzy search with typo tolerance",
      "Direct navigation to resource details",
      "Filter by section and tag",
    ],
  },
  {
    icon: GraduationCap,
    accent: "tertiary",
    title: "Study Mode & Focus paths",
    body: "Toggle Study Mode from the header for a calm, distraction-free view. On the Courses page, pick a study plan to auto-route your learning.",
    bullets: [
      "Curated educational content in focus view",
      "A slim header indicator for progress",
      "Exit at any time from the top bar",
    ],
  },
  {
    icon: MoreHorizontal,
    accent: "primary",
    title: "Navigation & shortcuts",
    body: "The layout adapts seamlessly to your screen, keeping surfaces clean and responsive.",
    bullets: [
      "Desktop: use the navigation pills or More menu",
      "Mobile: bottom navigation bar for quick access",
      "Notification bell opens recent updates",
    ],
  },
  {
    icon: SlidersHorizontal,
    accent: "quaternary",
    title: "Customise your experience",
    body: "Open Settings to tailor the site to your preferences. All preferences save locally in your browser.",
    bullets: [
      "Theme selection: switch visual styles whenever you want",
      "Haptic feedback on mobile tap interactions",
      "Toggle animations and bottom bar labels",
    ],
  },
  {
    icon: Heart,
    accent: "secondary",
    title: "Personal favorites & theme modes",
    body: "Bookmark items with the heart icon to access them locally. Switch light and dark mode anytime from the header.",
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
  const { designSystem, setDesignSystem } = useDesignSystem();
  const isLL = designSystem === "looseleaf";

  useEffect(() => {
    // 1. Immediately abort if running in any automated browser, bot, crawler, Lighthouse, or Sitepeel
    if (isBotOrScreenshotEnv()) return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    // 2. Require an active human gesture (scroll, pointer, keypress) before auto-popping on cold visits.
    // Automated screenshot tools take viewport snapshots on load without user interactions.
    let triggered = false;
    let timer: any = null;

    const triggerIntro = () => {
      if (triggered) return;
      triggered = true;
      cleanup();
      timer = setTimeout(() => {
        try {
          if (!localStorage.getItem(STORAGE_KEY)) {
            setOpen(true);
          }
        } catch {
          /* ignore */
        }
      }, 1500);
    };

    const cleanup = () => {
      window.removeEventListener("scroll", triggerIntro);
      window.removeEventListener("pointerdown", triggerIntro);
      window.removeEventListener("keydown", triggerIntro);
    };

    window.addEventListener("scroll", triggerIntro, { passive: true });
    window.addEventListener("pointerdown", triggerIntro, { passive: true });
    window.addEventListener("keydown", triggerIntro, { passive: true });

    return () => {
      cleanup();
      if (timer) clearTimeout(timer);
    };
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

  if (!open || isBotOrScreenshotEnv()) return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/45 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className={`relative w-full max-w-xl max-h-[92vh] overflow-y-auto ${
          isLL
            ? "ll-page bg-card border-2 border-foreground/85 shadow-card"
            : designSystem === "clay"
            ? "clay-intro-panel bg-card border-2 border-foreground/80 rounded-3xl shadow-pop"
            : designSystem === "squid-game"
            ? "squid-card bg-card border-2 border-primary/60 rounded-2xl shadow-pop"
            : designSystem === "minecraft"
            ? "mc-panel-card bg-card border-2 border-black !rounded-none"
            : "bg-card border-2 border-foreground/80 rounded-3xl shadow-pop"
        }`}
      >
        {/* Authentic Looseleaf Tape & Binder Holes */}
        {isLL && (
          <>
            <Tape variant="masking" position="top-center" width={100} height={24} />
            <NotebookHoles />
          </>
        )}

        <button
          onClick={close}
          aria-label="Close tutorial"
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-card border-2 border-foreground/80 flex items-center justify-center hover:-translate-y-0.5 transition-transform z-20 ${
            isLL ? "ll-circle" : "shadow-pop-soft"
          }`}
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {/* Progress bar */}
        <div className={`px-6 pt-6 ${isLL ? "pl-14" : ""}`}>
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

        <div className={`p-6 sm:p-8 ${isLL ? "pl-14 sm:pl-16" : ""}`}>
          <div className="text-center mb-5 animate-fade-in" key={step}>
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-foreground/80 shadow-pop mb-3 ${accentBg[current.accent]} ${
                isLL ? "ll-circle" : ""
              }`}
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

          {/* Interactive Theme Picker on Step 0 */}
          {isFirst && (
            <div className="my-5 p-4 rounded-2xl border-2 border-foreground/30 bg-background/60">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Choose Your Preferred Theme
                  </span>
                </div>
                {isLL && <RubberStamp text="ACTIVE" color="green" tilt={2} />}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Choose your preferred theme">
                {THEME_OPTIONS.map((t) => {
                  const selected = designSystem === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setDesignSystem(t.id)}
                      className={`flex flex-col text-left p-3 rounded-xl border-2 transition-all relative ${
                        selected
                          ? "border-primary bg-primary/10 shadow-pop-soft -translate-y-0.5"
                          : "border-foreground/30 bg-card hover:border-foreground/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-heading font-extrabold text-sm text-foreground flex items-center gap-1.5">
                          {t.label}
                          {t.isDefault && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-primary/20 text-primary uppercase">
                              Default
                            </span>
                          )}
                        </span>
                        {selected && (
                          <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground leading-snug">
                        {t.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
          <div className="flex justify-center gap-1.5 mb-5">
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
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-card text-foreground font-bold border-2 border-foreground/80 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 ${
                  isLL ? "ll-btn" : "shadow-pop-soft hover:-translate-y-0.5"
                }`}
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
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold border-2 border-foreground/80 transition-transform ${
                  isLL ? "ll-btn" : "shadow-pop hover:-translate-y-0.5"
                }`}
              >
                Next <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                to="/courses"
                onClick={close}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold border-2 border-foreground/80 transition-transform ${
                  isLL ? "ll-btn" : "shadow-pop hover:-translate-y-0.5"
                }`}
              >
                Explore courses
              </Link>
              <Link
                to="/faq"
                onClick={close}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-secondary text-secondary-foreground font-bold border-2 border-foreground/80 transition-transform ${
                  isLL ? "ll-btn" : "shadow-pop hover:-translate-y-0.5"
                }`}
              >
                Need help? FAQ
              </Link>
              <button
                onClick={close}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-card text-foreground font-bold border-2 border-foreground/80 transition-transform ${
                  isLL ? "ll-btn" : "shadow-pop-soft hover:-translate-y-0.5"
                }`}
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
