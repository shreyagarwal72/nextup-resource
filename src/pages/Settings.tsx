import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Settings as SettingsIcon, Palette, ArrowUpDown, Sparkles, Layers, GraduationCap } from "lucide-react";
import { useBetaUI } from "@/hooks/useBetaUI";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference, SortPreference } from "@/hooks/useSortPreference";

const themes = [
  {
    id: "glass",
    name: "Liquid Glass",
    description: "iOS-inspired glassmorphism with translucent surfaces and fluid animations",
    icon: Sparkles,
    gradient: "from-blue-500/20 via-purple-500/20 to-cyan-500/20",
  },
  {
    id: "material3",
    name: "Material 3",
    description: "Google's expressive design with dynamic color and modern components",
    icon: Layers,
    gradient: "from-violet-500/20 via-pink-500/20 to-orange-500/20",
  },
  {
    id: "study",
    name: "Study Mode",
    description: "Calm, focused theme with filtered educational content only",
    icon: GraduationCap,
    gradient: "from-emerald-500/20 via-green-500/20 to-teal-500/20",
  },
] as const;

const sortOptions: { id: SortPreference; label: string; description: string }[] = [
  { id: "alphabetical", label: "Alphabetical", description: "Sort items A-Z by title" },
  { id: "category", label: "By Category", description: "Group items by their category" },
  { id: "newest", label: "Newest First", description: "Show recently added items first" },
];

const Settings = () => {
  const { isBetaEnabled, enableBetaUI, disableBetaUI } = useBetaUI();
  const { isStudyMode, enableStudyMode, disableStudyMode } = useStudyMode();
  const { sortPreference, setSortPreference } = useSortPreference();

  const activeTheme = isStudyMode ? "study" : isBetaEnabled ? "material3" : "glass";

  const handleThemeChange = (themeId: string) => {
    // First disable everything
    if (isBetaEnabled) disableBetaUI();
    if (isStudyMode) disableStudyMode();

    // Then enable the selected theme
    if (themeId === "material3") {
      enableBetaUI();
    } else if (themeId === "study") {
      enableStudyMode();
    }
    // "glass" = default, nothing to enable
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen pt-28 pb-20 relative overflow-hidden">
        <div className="liquid-blob w-72 h-72 bg-primary/10 top-20 -left-36" />
        <div className="liquid-blob w-64 h-64 bg-purple-400/10 -bottom-20 -right-32" style={{ animationDelay: "-4s" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center animate-ios-pop">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground text-sm">Customize your experience</p>
            </div>
          </div>

          {/* Theme Selection */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Theme</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themes.map((theme) => {
                const isActive = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`glass-heavy rounded-2xl p-5 text-left transition-all duration-300 ease-apple-spring hover-spring liquid-border ${
                      isActive
                        ? "ring-2 ring-primary shadow-glass-lg scale-[1.02]"
                        : "hover:shadow-glass"
                    }`}
                  >
                    <div className={`w-full h-16 rounded-xl bg-gradient-to-br ${theme.gradient} mb-4 flex items-center justify-center`}>
                      <theme.icon className={`w-7 h-7 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{theme.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{theme.description}</p>
                    {isActive && (
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full animate-ios-pop">
                        Active
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Sort Preference */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <ArrowUpDown className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Content Sorting</h2>
            </div>
            <div className="glass-heavy rounded-2xl overflow-hidden liquid-border">
              {sortOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => setSortPreference(option.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 ${
                    index < sortOptions.length - 1 ? "border-b border-border/30" : ""
                  } ${
                    sortPreference === option.id
                      ? "bg-primary/5"
                      : "hover:bg-primary/5"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      sortPreference === option.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40"
                    }`}
                  >
                    {sortPreference === option.id && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground animate-ios-pop" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Settings;
