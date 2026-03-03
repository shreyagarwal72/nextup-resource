import { useState, useEffect } from 'react';

export type AppTheme = 'glass' | 'material3' | 'neubrutalism' | 'aurora' | 'cyberpunk' | 'claymorphism';

const THEME_KEY = 'nextup-app-theme';
const BETA_UI_KEY = 'nextup-beta-ui-enabled';

const themeClasses: Record<AppTheme, string> = {
  glass: '',
  material3: '',
  neubrutalism: 'theme-neubrutalism',
  aurora: 'theme-aurora',
  cyberpunk: 'theme-cyberpunk',
  claymorphism: 'theme-claymorphism',
};

export const useAppTheme = () => {
  const [appTheme, setAppThemeState] = useState<AppTheme>(() => {
    if (typeof window === 'undefined') return 'glass';
    // Check beta UI for backward compat
    const beta = localStorage.getItem(BETA_UI_KEY);
    if (beta === 'true') return 'material3';
    return (localStorage.getItem(THEME_KEY) as AppTheme) || 'glass';
  });

  useEffect(() => {
    // Apply theme class to document
    const root = document.documentElement;
    // Remove all theme classes
    Object.values(themeClasses).forEach(cls => {
      if (cls) root.classList.remove(cls);
    });
    // Add current theme class
    const cls = themeClasses[appTheme];
    if (cls) root.classList.add(cls);
  }, [appTheme]);

  const setAppTheme = (theme: AppTheme) => {
    setAppThemeState(theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // Sync with beta UI flag for material3
    if (theme === 'material3') {
      localStorage.setItem(BETA_UI_KEY, 'true');
    } else {
      localStorage.setItem(BETA_UI_KEY, 'false');
    }
    
    // Reload to apply theme fully
    window.location.reload();
  };

  return { appTheme, setAppTheme };
};
