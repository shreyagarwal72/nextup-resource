import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, type ReactNode, useContext, useLayoutEffect, useMemo, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export type DesignSystem = "geometric" | "clay";

type DesignSystemContextValue = {
  designSystem: DesignSystem;
  setDesignSystem: (designSystem: DesignSystem) => void;
};

const DESIGN_SYSTEM_KEY = "nextup-design-system";
const DesignSystemContext = createContext<DesignSystemContextValue | undefined>(undefined);

const getStoredDesignSystem = (): DesignSystem => {
  if (typeof window === "undefined") return "geometric";
  return window.localStorage.getItem(DESIGN_SYSTEM_KEY) === "clay" ? "clay" : "geometric";
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
    root.dataset.designSystem = designSystem;
    window.localStorage.setItem(DESIGN_SYSTEM_KEY, designSystem);

    const fontId = "nextup-design-fonts";
    const href = designSystem === "clay"
      ? "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Nunito:wght@700;800;900&display=swap"
      : "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
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
