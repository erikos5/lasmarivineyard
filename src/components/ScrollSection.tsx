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

  // GSAP ScrollTrigger effects with performance optimizations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Pinned section with better performance
      if (pinned && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }
      
      // Story reveal animation with reduced complexity
      if (storyReveal && contentRef.current) {
        const children = Array.from(contentRef.current.children);
        
        gsap.set(children, { 
          willChange: 'transform, opacity',
          force3D: true 
        });
        
        gsap.fromTo(children,
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            }
          }
        );
      }
      
      // Optimized cinematic zoom effect
      if (cinematicZoom && backgroundRef.current) {
        gsap.set(backgroundRef.current, { 
          willChange: 'transform',
          force3D: true 
        });
        
        gsap.fromTo(backgroundRef.current,
          { scale: 1.15 },
          {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            }
          }
        );
      }
    });
    
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
      {/* Background Layer */}
      {backgroundImage && (
        <motion.div
          ref={backgroundRef}
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div
            className={`w-full h-full bg-cover bg-center bg-no-repeat ${
              cinematicZoom ? 'animate-cinematic-zoom' : ''
            }`}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              willChange: 'transform',
            }}
          />
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: overlayColor }}
          />
        </motion.div>
      )}
      
      {/* Content Layer */}
      <motion.div
        ref={contentRef}
        className="relative z-10"
        style={{ y: parallaxIntensity > 0 ? contentY : undefined }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default ScrollSection;