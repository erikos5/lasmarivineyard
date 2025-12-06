'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CinematicHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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

  const handleTitleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    
    const rect = titleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  };

  const handleTitleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // GSAP ScrollTrigger with proper, non-overlapping ranges
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Hero section has precise range: from top to when it's fully scrolled out
      if (bgRef.current) {
        gsap.set(bgRef.current, { 
          willChange: 'transform',
          force3D: true 
        });
        
        gsap.to(bgRef.current, {
          yPercent: 30,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top", // Ends exactly when hero exits viewport
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
      
      // Content fade with same precise range
      if (contentRef.current) {
        gsap.set(contentRef.current, { 
          willChange: 'transform, opacity',
          force3D: true 
        });
        
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -100,
          scale: 0.95,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "80% top", // Finishes before section fully exits
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    });
    
    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#introduction');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative h-screen overflow-hidden bg-evergreen-800"
    >
      {/* Cinematic Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 transform-gpu" data-parallax>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/backgrounds/hero-authentic-corfiot-heritage.png")',
          }}
        />
        {/* Cinematic overlay with gradient */}
        <div className="absolute inset-0 bg-cinematic-gradient" />
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            {/* Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              <span className="bg-pink-100/20 backdrop-blur-sm text-cream-50 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-inter text-[10px] sm:text-sm font-medium tracking-wide sm:tracking-widest uppercase border border-cream-50/30 whitespace-nowrap">
                Est. 1892 • Five Generations • Corfu, Greece
              </span>
            </motion.div>

            {/* Cinematic Title with Magnetic Effect */}
            <motion.div
              ref={titleRef}
              className="font-playfair font-bold tracking-tight text-cream-50 leading-[0.8] cursor-default select-none"
              style={{
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleTitleMouseMove}
              onMouseLeave={handleTitleMouseLeave}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span 
                className="block drop-shadow-2xl" 
                style={{ transform: "translateZ(40px)" }}
                whileHover={{ 
                  textShadow: "0 0 60px rgba(254, 250, 241, 0.6)",
                  transition: { duration: 0.3 }
                }}
              >
                AUTHENTIC
              </motion.span>
              <motion.span 
                className="block text-cream-200/90 drop-shadow-2xl" 
                style={{ transform: "translateZ(80px)" }}
                whileHover={{ 
                  color: "rgba(254, 250, 241, 1)",
                  textShadow: "0 0 60px rgba(246, 232, 232, 0.4)",
                  transition: { duration: 0.3 }
                }}
              >
                CORFIOT
              </motion.span>
              <motion.span 
                className="block text-pink-200/80 drop-shadow-2xl" 
                style={{ transform: "translateZ(120px)" }}
                whileHover={{ 
                  color: "rgba(246, 232, 232, 1)",
                  textShadow: "0 0 60px rgba(246, 232, 232, 0.5)",
                  transition: { duration: 0.3 }
                }}
              >
                HERITAGE
              </motion.span>
            </motion.div>
            
            {/* Elegant Subtitle */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xl lg:text-3xl text-cream-100/90 font-inter leading-relaxed tracking-wide">
                Discover the soul of Mediterranean winemaking through five generations of passion,<br className="hidden lg:block" />
                tradition, and an unwavering commitment to authenticity.
              </p>
            </motion.div>

            {/* Journey CTA */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                onClick={scrollToNext}
                className="group inline-flex items-center space-x-3 text-cream-50/80 hover:text-cream-50 transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-inter text-lg tracking-wider uppercase">Begin Your Journey</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="group-hover:translate-y-1 transition-transform duration-300"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>


      {/* Vintage Film Bars */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cream-50/20 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cream-50/20 to-transparent z-10" />
    </section>
  );
};

export default CinematicHero;