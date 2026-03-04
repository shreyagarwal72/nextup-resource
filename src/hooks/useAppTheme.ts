import { useState, useEffect } from 'react';

export type AppTheme = 'glass' | 'material3';

const THEME_KEY = 'nextup-app-theme';
const BETA_UI_KEY = 'nextup-beta-ui-enabled';

export const useAppTheme = () => {
  const [appTheme, setAppThemeState] = useState<AppTheme>(() => {
    if (typeof window === 'undefined') return 'glass';
    const beta = localStorage.getItem(BETA_UI_KEY);
    if (beta === 'true') return 'material3';
    return (localStorage.getItem(THEME_KEY) as AppTheme) || 'glass';
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
