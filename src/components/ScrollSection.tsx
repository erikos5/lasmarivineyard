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
  
  // Parallax transforms
  const backgroundY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`${-50 * parallaxIntensity}%`, `${50 * parallaxIntensity}%`]
  );
  
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-20 * parallaxIntensity}%`, `${20 * parallaxIntensity}%`]
  );

  // Simplified effects to prevent conflicts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    const triggers: ScrollTrigger[] = [];
    
    // Only create necessary triggers
    if (pinned && sectionRef.current) {
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
      triggers.push(pinTrigger);
    }
    
    if (storyReveal && contentRef.current) {
      const children = Array.from(contentRef.current.children);
      
      children.forEach((child, index) => {
        gsap.fromTo(child as Element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: child as Element,
              start: "top 90%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    }
    
    if (cinematicZoom && backgroundRef.current) {
      gsap.fromTo(backgroundRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }
    
    return () => {
      triggers.forEach(trigger => trigger.kill());
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
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