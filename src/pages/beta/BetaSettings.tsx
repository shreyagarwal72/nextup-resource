import { Settings as SettingsIcon, Palette, ArrowUpDown, Sparkles, Layers, GraduationCap } from "lucide-react";
import { useBetaUI } from "@/hooks/useBetaUI";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference, SortPreference } from "@/hooks/useSortPreference";
import "@/styles/material3.css";

const themes = [
  {
    id: "glass",
    name: "Liquid Glass",
    description: "iOS-inspired glassmorphism with translucent surfaces",
    icon: Sparkles,
  },
  {
    id: "material3",
    name: "Material 3",
    description: "Google's expressive design with dynamic color",
    icon: Layers,
  },
  {
    id: "study",
    name: "Study Mode",
    description: "Calm, focused theme for educational content",
    icon: GraduationCap,
  },
] as const;

const sortOptions: { id: SortPreference; label: string; description: string }[] = [
  { id: "alphabetical", label: "Alphabetical", description: "Sort items A-Z by title" },
  { id: "category", label: "By Category", description: "Group items by their category" },
  { id: "newest", label: "Newest First", description: "Show recently added items first" },
];

const BetaSettings = () => {
  const { isBetaEnabled, enableBetaUI, disableBetaUI } = useBetaUI();
  const { isStudyMode, enableStudyMode, disableStudyMode } = useStudyMode();
  const { sortPreference, setSortPreference } = useSortPreference();

  const activeTheme = isStudyMode ? "study" : isBetaEnabled ? "material3" : "glass";

  const handleThemeChange = (themeId: string) => {
    if (isBetaEnabled) disableBetaUI();
    if (isStudyMode) disableStudyMode();

    if (themeId === "material3") {
      enableBetaUI();
    } else if (themeId === "study") {
      enableStudyMode();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-16 px-4"
        style={{
          background: "linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)",
        }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center md3-animate-enter"
            style={{ background: "hsl(var(--md-sys-color-primary))" }}
          >
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h1
            className="md3-display-small mb-4 md3-animate-enter md3-stagger-1"
            style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
          >
            Settings
          </h1>
          <p
            className="md3-body-large max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
            style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
          >
            Customize your Nextup experience
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Theme Selection */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
              <h2 className="md3-headline-small" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                Theme
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themes.map((theme, index) => {
                const isActive = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`md3-card p-5 text-left md3-animate-enter md3-stagger-${index + 1} transition-all duration-200`}
                    style={{
                      border: isActive ? "2px solid hsl(var(--md-sys-color-primary))" : "2px solid transparent",
                      background: isActive
                        ? "hsl(var(--md-sys-color-primary-container))"
                        : undefined,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                      style={{
                        background: isActive
                          ? "hsl(var(--md-sys-color-primary))"
                          : "hsl(var(--md-sys-color-surface-variant))",
                      }}
                    >
                      <theme.icon
                        className="w-6 h-6"
                        style={{
                          color: isActive ? "white" : "hsl(var(--md-sys-color-on-surface-variant))",
                        }}
                      />
                    </div>
                    <h3
                      className="md3-title-medium mb-1"
                      style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
                    >
                      {theme.name}
                    </h3>
                    <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                      {theme.description}
                    </p>
                    {isActive && (
                      <div
                        className="mt-3 md3-chip text-xs"
                        style={{
                          background: "hsl(var(--md-sys-color-primary))",
                          color: "hsl(var(--md-sys-color-on-primary))",
                        }}
                      >
                        Active
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Preference */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ArrowUpDown className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
              <h2 className="md3-headline-small" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                Content Sorting
              </h2>
            </div>
            <div className="md3-card overflow-hidden">
              {sortOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => setSortPreference(option.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200"
                  style={{
                    borderBottom:
                      index < sortOptions.length - 1
                        ? "1px solid hsl(var(--md-sys-color-outline-variant))"
                        : undefined,
                    background:
                      sortPreference === option.id
                        ? "hsl(var(--md-sys-color-primary-container) / 0.4)"
                        : undefined,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                    style={{
                      borderColor:
                        sortPreference === option.id
                          ? "hsl(var(--md-sys-color-primary))"
                          : "hsl(var(--md-sys-color-outline))",
                      background:
                        sortPreference === option.id
                          ? "hsl(var(--md-sys-color-primary))"
                          : "transparent",
                    }}
                  >
                    {sortPreference === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="md3-title-small" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                      {option.label}
                    </p>
                    <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                      {option.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BetaSettings;
