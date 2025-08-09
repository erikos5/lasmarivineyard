'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface MagneticTitleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const MagneticTitle = ({ text, className = '', style }: MagneticTitleProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Magnetic title effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    
    const rect = titleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={titleRef}
      className={`cursor-default select-none ${className}`}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-4 drop-shadow-2xl"
          style={{ transform: `translateZ(${20 + index * 10}px)` }}
          whileHover={{ 
            textShadow: "0 0 40px rgba(254, 250, 241, 0.6)",
            transition: { duration: 0.3 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default MagneticTitle;