import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDesignSystem } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { designSystem } = useDesignSystem();
  const surfaceClass = designSystem === "clay" ? "clay-circle" : "border-2 border-foreground/80 bg-card shadow-pop";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={`p-2 rounded-full ${surfaceClass}`} aria-label="Color mode">
        <Sun className="h-5 w-5" strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-full ${surfaceClass} transition-all duration-300 relative overflow-hidden`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} color mode`}
      title="Light or dark mode"
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${
        theme === "dark"
          ? "rotate-90 scale-0 opacity-0"
          : "rotate-0 scale-100 opacity-100"
      }`} strokeWidth={2.5} />
      <Moon className={`absolute inset-0 m-auto h-5 w-5 transition-all duration-300 ${
        theme === "dark"
          ? "rotate-0 scale-100 opacity-100"
          : "-rotate-90 scale-0 opacity-0"
      }`} strokeWidth={2.5} />
    </button>
  );
}
