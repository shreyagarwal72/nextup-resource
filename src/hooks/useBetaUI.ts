import { useState, useEffect } from 'react';

const BETA_UI_KEY = 'nextup-beta-ui-enabled';
const SECRET_CODE = 'material3beta';

export const useBetaUI = () => {
  const [isBetaEnabled, setIsBetaEnabled] = useState(false);
  const [inputBuffer, setInputBuffer] = useState('');

  useEffect(() => {
    // Check if beta UI is enabled from localStorage
    const stored = localStorage.getItem(BETA_UI_KEY);
    if (stored === 'true') {
      setIsBetaEnabled(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newBuffer = (inputBuffer + e.key).slice(-SECRET_CODE.length);
      setInputBuffer(newBuffer);
      
      if (newBuffer === SECRET_CODE) {
        toggleBetaUI();
        setInputBuffer('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputBuffer]);

  const toggleBetaUI = () => {
    const newValue = !isBetaEnabled;
    setIsBetaEnabled(newValue);
    localStorage.setItem(BETA_UI_KEY, String(newValue));
  };

  const enableBetaUI = () => {
    setIsBetaEnabled(true);
    localStorage.setItem(BETA_UI_KEY, 'true');
  };

  const disableBetaUI = () => {
    setIsBetaEnabled(false);
    localStorage.setItem(BETA_UI_KEY, 'false');
  };

  return { isBetaEnabled, toggleBetaUI, enableBetaUI, disableBetaUI };
};
