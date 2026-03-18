'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

const HIDDEN_PATHS = ['/book', '/admin'];

const FloatingBookNow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const shouldHide = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (shouldHide) {
      setIsVisible(false);
      return;
    }

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [shouldHide]);

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <Link href="/book">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-8 z-50 group cursor-pointer"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

            {/* Button */}
            <motion.div
              className="relative flex items-center gap-3 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-evergreen-900 pl-5 pr-6 py-3.5 rounded-full shadow-2xl transition-all duration-300 border border-pink-300/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <CalendarDays className="w-5 h-5" />
              <span className="font-inter font-bold text-base tracking-wide">
                Book Now
              </span>
            </motion.div>

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 border-2 border-pink-400/60 rounded-full"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </Link>
      )}
    </AnimatePresence>
  );
};

export default FloatingBookNow;
