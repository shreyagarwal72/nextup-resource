import { useState, useEffect, useCallback } from 'react';

export const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      setCurrentText(fullWord.substring(0, currentText.length - 1));
    } else {
      setCurrentText(fullWord.substring(0, currentText.length + 1));
    }

    if (!isDeleting && currentText === fullWord) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [currentText, currentWordIndex, isDeleting, words, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return currentText;
};
