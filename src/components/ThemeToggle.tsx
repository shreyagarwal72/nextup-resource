import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-full border-2 border-foreground/80 bg-card shadow-pop">
        <Sun className="h-5 w-5" strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border-2 border-foreground/80 bg-card shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-pop-active active:translate-x-0.5 active:translate-y-0.5 transition-all duration-300 relative overflow-hidden"
      aria-label="Toggle theme"
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
