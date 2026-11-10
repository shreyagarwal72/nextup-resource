import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, type ReactNode, useContext, useLayoutEffect, useMemo, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export type DesignSystem = "geometric" | "clay" | "squid-game" | "minecraft" | "looseleaf";

type DesignSystemContextValue = {
  designSystem: DesignSystem;
  setDesignSystem: (designSystem: DesignSystem) => void;
};

const DESIGN_SYSTEM_KEY = "nextup-design-system";
const DesignSystemContext = createContext<DesignSystemContextValue | undefined>(undefined);

const getStoredDesignSystem = (): DesignSystem => {
  if (typeof window === "undefined") return "looseleaf";
  const stored = window.localStorage.getItem(DESIGN_SYSTEM_KEY);
  if (stored === "minecraft") return "minecraft";
  if (stored === "squid-game") return "squid-game";
  if (stored === "clay") return "clay";
  if (stored === "geometric") return "geometric";
  if (stored === "looseleaf") return "looseleaf";
  return "looseleaf";
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) throw new Error("useDesignSystem must be used inside ThemeProvider");
  return context;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [designSystem, setDesignSystemState] = useState<DesignSystem>(getStoredDesignSystem);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("claymorphism", designSystem === "clay");
    root.classList.toggle("geometric", designSystem === "geometric");
    root.classList.toggle("squid-game", designSystem === "squid-game");
    root.classList.toggle("minecraft-theme", designSystem === "minecraft");
    root.classList.toggle("looseleaf", designSystem === "looseleaf");
    root.dataset.designSystem = designSystem;
    window.localStorage.setItem(DESIGN_SYSTEM_KEY, designSystem);

    const fontId = "nextup-design-fonts";
    let href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    if (designSystem === "clay") {
      href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Nunito:wght@700;800;900&display=swap";
    } else if (designSystem === "squid-game") {
      href = "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Black+Ops+One&family=Outfit:wght@400;600;800&display=swap";
    } else if (designSystem === "looseleaf") {
      href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap";
    } else if (designSystem === "minecraft") {
      href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap";
    }
    let fontLink = document.getElementById(fontId) as HTMLLinkElement | null;
    if (!fontLink) {
      fontLink = document.createElement("link");
      fontLink.id = fontId;
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
    fontLink.href = href;
  }, [designSystem]);

  const value = useMemo<DesignSystemContextValue>(() => ({
    designSystem,
    setDesignSystem: (next) => setDesignSystemState(next),
  }), [designSystem]);

  return (
    <DesignSystemContext.Provider value={value}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        {children}
      </NextThemesProvider>
    </DesignSystemContext.Provider>
  );
}
