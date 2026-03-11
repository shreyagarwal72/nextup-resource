import { useState, useEffect } from 'react';

export type AppTheme = 'glass' | 'material3' | 'nothing';

const THEME_KEY = 'nextup-app-theme';
const BETA_UI_KEY = 'nextup-beta-ui-enabled';

export const useAppTheme = () => {
  const [appTheme, setAppThemeState] = useState<AppTheme>(() => {
    if (typeof window === 'undefined') return 'glass';
    const stored = localStorage.getItem(THEME_KEY) as AppTheme;
    if (stored === 'nothing') return 'nothing';
    const beta = localStorage.getItem(BETA_UI_KEY);
    if (beta === 'true') return 'material3';
    return stored || 'glass';
  });

  const setAppTheme = (theme: AppTheme) => {
    setAppThemeState(theme);
    localStorage.setItem(THEME_KEY, theme);
    
    if (theme === 'material3') {
      localStorage.setItem(BETA_UI_KEY, 'true');
    } else {
      localStorage.setItem(BETA_UI_KEY, 'false');
    }
    
    window.location.reload();
  };

  return { appTheme, setAppTheme };
};
