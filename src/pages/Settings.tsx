import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Settings as SettingsIcon, Palette, ArrowUpDown, Sparkles, Layers, GraduationCap, Info, Globe, Zap, LayoutGrid, Trash2, Moon, Sun, CircleDot } from "lucide-react";
import { useAppTheme, AppTheme } from "@/hooks/useAppTheme";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference, SortPreference } from "@/hooks/useSortPreference";
import { useAnimations, useCompactMode } from "@/hooks/useAnimations";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "next-themes";
import { toast } from "@/hooks/use-toast";

const themes: { id: AppTheme; name: string; description: string; icon: any; gradient: string }[] = [
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
    id: "nothing",
    name: "Nothing",
    description: "Dot-matrix industrial aesthetic with monospace type and red accents",
    icon: CircleDot,
    gradient: "from-red-500/20 via-neutral-500/20 to-black/20",
  },
];

const themeNames: Record<AppTheme, string> = {
  glass: "Liquid Glass",
  material3: "Material 3",
  nothing: "Nothing",
};

const sortOptions: { id: SortPreference; label: string; description: string }[] = [
  { id: "alphabetical", label: "Alphabetical", description: "Sort items A-Z by title" },
  { id: "category", label: "By Category", description: "Group items by their category" },
  { id: "newest", label: "Newest First", description: "Show recently added items first" },
];

const ToggleSwitch = ({ enabled, onToggle, activeColor = "bg-primary" }: { enabled: boolean; onToggle: () => void; activeColor?: string }) => (
  <button
    onClick={onToggle}
    className={`relative w-12 h-7 rounded-full transition-all duration-300 ${enabled ? activeColor : "bg-muted-foreground/30"}`}
  >
    <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${enabled ? "left-[22px]" : "left-0.5"}`} />
  </button>
);

const Settings = () => {
  const { appTheme, setAppTheme } = useAppTheme();
  const { isStudyMode, toggleStudyMode } = useStudyMode();
  const { sortPreference, setSortPreference } = useSortPreference();
  const { animationsEnabled, toggleAnimations } = useAnimations();
  const { compactMode, toggleCompactMode } = useCompactMode();
  const { clearFavorites, totalCount } = useFavorites();
  const { theme, setTheme } = useTheme();

  const handleClearFavorites = () => {
    clearFavorites();
    toast({ title: "Favorites cleared", description: "All favorites have been removed" });
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
          <div className="flex items-center gap-3 mb-10 animate-slide-up-ios">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center animate-ios-pop">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground text-sm">Customize your experience</p>
            </div>
          </div>

          {/* Theme Selection */}
          <section className="mb-10 animate-fade-in-up delay-100">
            <div className="flex items-center gap-2 mb-5">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Theme</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themes.map((t, index) => {
                const isActive = appTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setAppTheme(t.id)}
                    className={`glass-heavy rounded-2xl p-5 text-left transition-all duration-500 ease-apple-spring hover-spring liquid-border ${
                      isActive ? "ring-2 ring-primary shadow-glass-lg scale-[1.02]" : "hover:shadow-glass"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-full h-14 rounded-xl bg-gradient-to-br ${t.gradient} mb-3 flex items-center justify-center`}>
                      <t.icon className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">{t.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{t.description}</p>
                    {isActive && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full animate-ios-pop">Active</div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Dark Mode Toggle */}
          <section className="mb-10 animate-fade-in-up delay-200">
            <div className="flex items-center gap-2 mb-5">
              <Moon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
            </div>
            <div className="glass-heavy rounded-2xl p-5 liquid-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${theme === "dark" ? "bg-indigo-500/20" : "bg-muted"}`}>
                    {theme === "dark" ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Switch between light and dark appearance</p>
                  </div>
                </div>
                <ToggleSwitch enabled={theme === "dark"} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} activeColor="bg-indigo-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Synced across all themes
              </p>
            </div>
          </section>

          {/* Study Mode Toggle */}
          <section className="mb-10 animate-fade-in-up delay-250">
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Study Mode</h2>
            </div>
            <div className="glass-heavy rounded-2xl p-5 liquid-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isStudyMode ? "bg-emerald-500/20" : "bg-muted"}`}>
                    <GraduationCap className={`w-5 h-5 ${isStudyMode ? "text-emerald-500" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Focus Mode</p>
                    <p className="text-xs text-muted-foreground">Show only educational content with calm theme</p>
                  </div>
                </div>
                <ToggleSwitch enabled={isStudyMode} onToggle={toggleStudyMode} activeColor="bg-emerald-500" />
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-10 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Accessibility</h2>
            </div>
            <div className="glass-heavy rounded-2xl liquid-border divide-y divide-border/30">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${animationsEnabled ? "bg-orange-500/20" : "bg-muted"}`}>
                    <Zap className={`w-5 h-5 ${animationsEnabled ? "text-orange-500" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Animations</p>
                    <p className="text-xs text-muted-foreground">Enable smooth transitions and effects</p>
                  </div>
                </div>
                <ToggleSwitch enabled={animationsEnabled} onToggle={toggleAnimations} activeColor="bg-orange-500" />
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${compactMode ? "bg-cyan-500/20" : "bg-muted"}`}>
                    <LayoutGrid className={`w-5 h-5 ${compactMode ? "text-cyan-500" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-xs text-muted-foreground">Reduce spacing for more content density</p>
                  </div>
                </div>
                <ToggleSwitch enabled={compactMode} onToggle={toggleCompactMode} activeColor="bg-cyan-500" />
              </div>
            </div>
          </section>

          {/* Sort Preference */}
          <section className="mb-10 animate-fade-in-up delay-400">
            <div className="flex items-center gap-2 mb-5">
              <ArrowUpDown className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Content Sorting</h2>
            </div>
            <div className="glass-heavy rounded-2xl overflow-hidden liquid-border">
              {sortOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => setSortPreference(option.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-300 ${
                    index < sortOptions.length - 1 ? "border-b border-border/30" : ""
                  } ${sortPreference === option.id ? "bg-primary/5" : "hover:bg-primary/5"}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    sortPreference === option.id ? "border-primary bg-primary" : "border-muted-foreground/40"
                  }`}>
                    {sortPreference === option.id && <div className="w-2 h-2 rounded-full bg-primary-foreground animate-ios-pop" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Data Management */}
          <section className="mb-10 animate-fade-in-up delay-500">
            <div className="flex items-center gap-2 mb-5">
              <Trash2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Data</h2>
            </div>
            <div className="glass-heavy rounded-2xl p-5 liquid-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-destructive/20">
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Clear Favorites</p>
                    <p className="text-xs text-muted-foreground">{totalCount} item{totalCount !== 1 ? "s" : ""} saved</p>
                  </div>
                </div>
                <button
                  onClick={handleClearFavorites}
                  disabled={totalCount === 0}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Clear All
                </button>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="mb-10 animate-fade-in-up delay-600">
            <div className="flex items-center gap-2 mb-5">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">About</h2>
            </div>
            <div className="glass-heavy rounded-2xl p-5 liquid-border space-y-3">
               <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="text-sm font-medium text-foreground">2.4.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Content Items</span>
                <span className="text-sm font-medium text-foreground">55+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">PWA Support</span>
                <span className="text-sm font-medium text-emerald-500">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Theme</span>
                <span className="text-sm font-medium text-primary">{themeNames[appTheme]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available Themes</span>
                <span className="text-sm font-medium text-foreground">3</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Settings;
