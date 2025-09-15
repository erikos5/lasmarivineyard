'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const FloatingBackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Check if Lenis is available on window object
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options: { duration: number; easing: (t: number) => number }) => void } }).lenis;
    
    if (lenis && typeof lenis.scrollTo === 'function') {
      // Use Lenis smooth scroll if available
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      // Fallback to native scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Main button */}
          <div className="relative">
            {/* Background with gradient and blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-evergreen-800 p-4 rounded-full shadow-2xl transition-all duration-300 border border-pink-300/20">
              <ChevronUpIcon className="w-6 h-6 font-bold" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-evergreen-800 text-cream-50 px-3 py-2 rounded-lg text-sm font-inter whitespace-nowrap shadow-xl">
                Back to top
                <div className="absolute top-full right-4 w-2 h-2 bg-evergreen-800 rotate-45 transform -mt-1" />
              </div>
            </div>
          </div>

          {/* Animated ring effect */}
          <motion.div
            className="absolute inset-0 border-2 border-pink-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingBackToTop;
