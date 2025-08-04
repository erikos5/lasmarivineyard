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
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Very subtle parallax to prevent flickering and text coverage
  const backgroundY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`${-15 * parallaxIntensity}%`, `${15 * parallaxIntensity}%`]
  );
  
  // No content parallax to prevent text coverage issues
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `0%`] // Disabled content parallax
  );

  // GSAP ScrollTrigger effects with proper ranges to avoid conflicts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];
      
      // Pinned section
      if (pinned && sectionRef.current) {
        const pinTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
        triggers.push(pinTrigger);
      }
      
      // Story reveal animation with unique trigger ranges
      if (storyReveal && contentRef.current) {
        const children = Array.from(contentRef.current.children);
        
        gsap.set(children, { 
          willChange: 'transform, opacity',
          force3D: true 
        });
        
        gsap.fromTo(children,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%", // Starts when section enters viewport
              end: "top 30%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            }
          }
        );
      }
      
      // Cinematic zoom effect - disabled to prevent conflicts
      // Background zoom will be handled by CSS only for smoother performance
      
      return () => {
        triggers.forEach(trigger => trigger.kill());
      };
    });
    
    return () => {
      ctx.revert();
    };
  }, [pinned, storyReveal, cinematicZoom]);

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
      {/* Background Layer - Fixed positioning to prevent text coverage */}
      {backgroundImage && (
        <motion.div
          ref={backgroundRef}
          className="absolute inset-0 z-0"
          style={{ 
            y: parallaxIntensity > 0 ? backgroundY : undefined,
          }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundAttachment: 'fixed', // Prevents background from interfering with content
              transform: 'translateZ(0)', // GPU acceleration without conflicts
            }}
          />
          {/* Overlay with proper z-index */}
          <div 
            className="absolute inset-0 z-1"
            style={{ backgroundColor: overlayColor }}
          />
        </motion.div>
      )}
      
      {/* Content Layer - Fixed positioning to prevent coverage */}
      <div
        ref={contentRef}
        className="relative z-20"
        style={{
          minHeight: '100vh',
          backgroundColor: 'transparent',
        }}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default ScrollSection;