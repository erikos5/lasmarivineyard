'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const SectionWrapper = ({ 
  children, 
  className = '', 
  id,
  delay = 0,
  stagger = false,
  direction = 'up'
}: SectionWrapperProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 40 };
      case 'down': return { y: -40 };
      case 'left': return { x: -40 };
      case 'right': return { x: 40 };
      default: return { y: 40 };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
        ...(stagger && {
          staggerChildren: 0.1,
          delayChildren: delay + 0.2,
        }),
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {stagger ? (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.section>
  );
};

export default SectionWrapper; 