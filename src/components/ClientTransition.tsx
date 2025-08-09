'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface ClientTransitionProps {
  children: ReactNode;
}

const ClientTransition = ({ children }: ClientTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'opacity', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ClientTransition;
