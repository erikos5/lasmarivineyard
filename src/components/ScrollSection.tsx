'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  parallaxIntensity?: number;
  pinned?: boolean;
  backgroundImage?: string;
  overlayColor?: string;
  cinematicZoom?: boolean;
  storyReveal?: boolean;
}

const ScrollSection = ({
  children,
  id,
  className = '',
  parallaxIntensity = 0.5,
  pinned = false,
  backgroundImage,
  overlayColor = 'rgba(46, 59, 41, 0.4)',
  cinematicZoom = false,
  storyReveal = false,
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Disabled Framer Motion parallax to prevent interference
  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"]
  // });
  
  // const backgroundY = useTransform(
  //   scrollYProgress, 
  //   [0, 1], 
  //   [`${-50 * parallaxIntensity}%`, `${50 * parallaxIntensity}%`]
  // );
  
  // const contentY = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [`${-20 * parallaxIntensity}%`, `${20 * parallaxIntensity}%`]
  // );

  // No GSAP effects - just simple CSS for smooth performance
  useEffect(() => {
    // Only use pinning if absolutely necessary
    if (pinned && sectionRef.current && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
      
      return () => {
        pinTrigger.kill();
      };
    }
    
    // All other effects use CSS-only for performance
    return () => {};
  }, [pinned]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
      initial={storyReveal ? { opacity: 0 } : undefined}
      whileInView={storyReveal ? { opacity: 1 } : undefined}
      transition={storyReveal ? { duration: 0.8 } : undefined}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Layer - No Motion conflicts */}
      {backgroundImage && (
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: overlayColor }}
          />
        </div>
      )}
      
      {/* Content Layer - Clean, no conflicting transforms */}
      <div
        ref={contentRef}
        className="relative z-10"
      >
        {children}
      </div>
    </motion.section>
  );
};

export default ScrollSection;