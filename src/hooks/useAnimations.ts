import { useState, useEffect } from 'react';

const ANIMATIONS_KEY = 'nextup-animations-enabled';
const COMPACT_KEY = 'nextup-compact-mode';
const HAPTICS_KEY = 'nextup-haptics-enabled';

export const useAnimations = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ANIMATIONS_KEY);
      return stored === null ? true : stored === 'true';
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem(ANIMATIONS_KEY, String(animationsEnabled));
    if (!animationsEnabled) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [animationsEnabled]);

  return { animationsEnabled, setAnimationsEnabled, toggleAnimations: () => setAnimationsEnabled(p => !p) };
};

export const useCompactMode = () => {
  const [compactMode, setCompactMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(COMPACT_KEY) === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(COMPACT_KEY, String(compactMode));
    if (compactMode) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
  }, [compactMode]);

  return { compactMode, setCompactMode, toggleCompactMode: () => setCompactMode(p => !p) };
};
