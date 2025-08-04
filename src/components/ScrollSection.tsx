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

  // GSAP ScrollTrigger effects
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Pinned section
      if (pinned && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      }
      
      // Story reveal animation
      if (storyReveal && contentRef.current) {
        gsap.fromTo(contentRef.current.children,
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
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
      
      // Cinematic zoom effect
      if (cinematicZoom && backgroundRef.current) {
        gsap.fromTo(backgroundRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      }
    });
    
    return () => ctx.revert();
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