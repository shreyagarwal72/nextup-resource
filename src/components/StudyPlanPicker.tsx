import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, CalendarRange, Rocket, Target, GraduationCap } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";

type Plan = {
  id: string;
  title: string;
  duration: string;
  icon: any;
  accent: "primary" | "secondary" | "tertiary" | "quaternary";
  goal: string;
  steps: { label: string; route: string }[];
};

const PLANS: Plan[] = [
  {
    id: "daily",
    title: "Daily Sprint",
    duration: "30–60 min / day",
    icon: CalendarDays,
    accent: "primary",
    goal: "Small, focused sessions — perfect for building a streak.",
    steps: [
      { label: "Pick a bite-sized course", route: "/courses" },
      { label: "Grab a quick ebook", route: "/ebooks" },
      { label: "Try one AI tool", route: "/ai" },
    ],
  },
  {
    id: "weekly",
    title: "Weekly Deep-Dive",
    duration: "3–5 hrs / week",
    icon: CalendarRange,
    accent: "secondary",
    goal: "Longer sessions across curated collections and resources.",
    steps: [
      { label: "Placement bundles", route: "/special-courses" },
      { label: "Design & code resources", route: "/resources" },
      { label: "Developer roadmap", route: "/developer-roadmap" },
    ],
  },
  {
    id: "career",
    title: "Career Track",
    duration: "1–3 months",
    icon: Rocket,
    accent: "tertiary",
    goal: "Full ramp: roadmap + placement bundles + practice ebooks.",
    steps: [
      { label: "Follow the roadmap", route: "/developer-roadmap" },
      { label: "Placement material", route: "/special-courses" },
      { label: "Companion ebooks", route: "/ebooks" },
    ],
  },
  {
    id: "explore",
    title: "Explore & Play",
    duration: "Free-form",
    icon: Target,
    accent: "quaternary",
    goal: "Browse apps, AI tools, and hidden gems at your own pace.",
    steps: [
      { label: "Apps & websites", route: "/apps" },
      { label: "AI tool directory", route: "/ai" },
      { label: "Android TV apps", route: "/tv-apps" },
    ],
  },
];

const accentBg = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  tertiary: "bg-tertiary text-tertiary-foreground",
  quaternary: "bg-quaternary text-quaternary-foreground",
};

const StudyPlanPicker = () => {
  const navigate = useNavigate();
  const { enableStudyMode } = useStudyMode();
  const [selected, setSelected] = useState<string | null>(null);

  const handleStart = (plan: Plan) => {
    enableStudyMode();
    const first = plan.steps[0];
    navigate(first.route);
  };

  const active = PLANS.find((p) => p.id === selected);

  return (
    <section className="py-12 dot-grid">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-tertiary text-tertiary-foreground border-2 border-foreground/80 shadow-pop font-bold text-sm">
            <GraduationCap className="w-4 h-4" strokeWidth={2.5} />
            <span>Study Plan Picker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-2">
            Choose your pace
          </h2>
          <p className="text-muted-foreground">
            Pick a plan and jump straight to the right resources. Study Mode turns on automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {PLANS.map((p) => {
            const Icon = p.icon;
            const isSelected = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`pop-card p-5 text-left transition-all ${
                  isSelected ? "ring-4 ring-foreground/80 -translate-y-1" : ""
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl border-2 border-foreground/80 flex items-center justify-center shadow-pop mb-3 ${accentBg[p.accent]}`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{p.title}</h3>
                <p className="text-xs text-muted-foreground font-bold mb-2">{p.duration}</p>
                <p className="text-sm text-foreground/80">{p.goal}</p>
              </button>
            );
          })}
        </div>

        {active && (
          <div className="max-w-3xl mx-auto mt-8 pop-card p-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  Your plan
                </p>
                <h3 className="font-heading font-bold text-xl">{active.title}</h3>
              </div>
              <button
                onClick={() => handleStart(active)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform ${accentBg[active.accent]}`}
              >
                <Rocket className="w-4 h-4" strokeWidth={2.5} />
                Start now
              </button>
            </div>
            <ol className="space-y-2">
              {active.steps.map((s, i) => (
                <li key={s.route}>
                  <button
                    onClick={() => {
                      enableStudyMode();
                      navigate(s.route);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-foreground/80 bg-card hover:bg-muted/40 transition-colors text-left"
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm border-2 border-foreground/80 ${accentBg[active.accent]}`}
                    >
                      {i + 1}
                    </span>
                    <span className="font-bold">{s.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{s.route}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudyPlanPicker;
