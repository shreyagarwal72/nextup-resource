import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="glass" size="icon" className="rounded-xl">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="glass"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <Sun className={`h-5 w-5 transition-all duration-500 ${
        theme === "dark" 
          ? "rotate-90 scale-0 opacity-0" 
          : "rotate-0 scale-100 opacity-100"
      }`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-500 ${
        theme === "dark" 
          ? "rotate-0 scale-100 opacity-100" 
          : "-rotate-90 scale-0 opacity-0"
      }`} />
    </Button>
  );
}
