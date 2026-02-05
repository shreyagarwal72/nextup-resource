import { useState, useEffect } from 'react';

const STUDY_MODE_KEY = 'nextup-study-mode';

export const useStudyMode = () => {
  const [isStudyMode, setIsStudyMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STUDY_MODE_KEY) === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(STUDY_MODE_KEY, String(isStudyMode));
    
    // Add/remove study class on document root
    if (isStudyMode) {
      document.documentElement.classList.add('study-mode');
    } else {
      document.documentElement.classList.remove('study-mode');
    }
  }, [isStudyMode]);

  const toggleStudyMode = () => {
    setIsStudyMode(prev => !prev);
  };

  const enableStudyMode = () => setIsStudyMode(true);
  const disableStudyMode = () => setIsStudyMode(false);

  return {
    isStudyMode,
    toggleStudyMode,
    enableStudyMode,
    disableStudyMode,
  };
};
