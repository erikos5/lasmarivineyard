'use client';

import { useEffect, ReactNode } from 'react';
import Swup from 'swup';

interface SwupProviderProps {
  children: ReactNode;
}

const SwupProvider = ({ children }: SwupProviderProps) => {
  useEffect(() => {
    const swup = new Swup({
      containers: ['#swup'],
      animateHistoryBrowsing: true,
      linkSelector: 'a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
      animationSelector: '[class*="transition-"]',
      cache: true,
      preload: true,
      skipPopStateHandling: (event: PopStateEvent) => {
        return false;
      }
    });

    // Custom transition events
    swup.hooks.on('animation:out:start', () => {
      document.documentElement.classList.add('is-animating', 'is-leaving');
    });

    swup.hooks.on('animation:in:end', () => {
      document.documentElement.classList.remove('is-animating', 'is-leaving', 'is-rendering');
    });

    swup.hooks.on('content:replace', () => {
      document.documentElement.classList.add('is-rendering');
      document.documentElement.classList.remove('is-leaving');
    });

    return () => {
      swup.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SwupProvider;
