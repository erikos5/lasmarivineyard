'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const soulTitleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for main title
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const heroSpringX = useSpring(heroMouseX, { stiffness: 150, damping: 20 });
  const heroSpringY = useSpring(heroMouseY, { stiffness: 150, damping: 20 });
  const heroRotateX = useTransform(heroSpringY, [-0.5, 0.5], [5, -5]);
  const heroRotateY = useTransform(heroSpringX, [-0.5, 0.5], [-5, 5]);
  const heroTranslateX = useTransform(heroSpringX, [-0.5, 0.5], [-15, 15]);
  const heroTranslateY = useTransform(heroSpringY, [-0.5, 0.5], [-15, 15]);
  
  // Mouse tracking for SOUL title
  const soulMouseX = useMotionValue(0);
  const soulMouseY = useMotionValue(0);
  const soulSpringX = useSpring(soulMouseX, { stiffness: 150, damping: 20 });
  const soulSpringY = useSpring(soulMouseY, { stiffness: 150, damping: 20 });
  const soulRotateX = useTransform(soulSpringY, [-0.5, 0.5], [5, -5]);
  const soulRotateY = useTransform(soulSpringX, [-0.5, 0.5], [-5, 5]);
  const soulTranslateX = useTransform(soulSpringX, [-0.5, 0.5], [-12, 12]);
  const soulTranslateY = useTransform(soulSpringY, [-0.5, 0.5], [-12, 12]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroTitleRef.current) return;
    
    const rect = heroTitleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    heroMouseX.set(x * 0.3);
    heroMouseY.set(y * 0.3);
  };

  const handleSoulMouseMove = (e: React.MouseEvent) => {
    if (!soulTitleRef.current) return;
    
    const rect = soulTitleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    soulMouseX.set(x * 0.3);
    soulMouseY.set(y * 0.3);
  };

  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  const handleSoulMouseLeave = () => {
    soulMouseX.set(0);
    soulMouseY.set(0);
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Parallax effect on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: bgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
      }
      
      // Content fade out on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -100,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      }
    });
    
    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image with GSAP Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2000&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Massive Typography with Magnetic Effect */}
            <motion.div
              ref={heroTitleRef}
              className="font-playfair text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-cream-50 leading-none cursor-default select-none"
              style={{
                rotateX: heroRotateX,
                rotateY: heroRotateY,
                x: heroTranslateX,
                y: heroTranslateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span 
                className="block" 
                style={{ transform: "translateZ(20px)" }}
                whileHover={{ color: "rgba(254, 250, 241, 1)" }}
                transition={{ duration: 0.3 }}
              >
                AUTHENTIC
              </motion.span>
              <motion.span 
                className="block text-cream-200/90" 
                style={{ transform: "translateZ(40px)" }}
                whileHover={{ color: "rgba(254, 250, 241, 0.8)" }}
                transition={{ duration: 0.3 }}
              >
                CORFIOT
              </motion.span>
            </motion.div>
            
            {/* Subtitle */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-lg sm:text-xl text-cream-100/90 font-inter leading-relaxed tracking-wide uppercase text-center mb-8">
                Discover &quot;Lasmari Wine&quot;, the Greek way of feeling<br />
                good by enjoying the beautiful things in life.<br />
                Immerse yourself in the beauty of Corfu and<br />
                unveil its world.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Typography with Magnetic Effect */}
      <motion.div
        className="absolute bottom-32 left-0 right-0 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-max section-padding text-center">
          <motion.div
            ref={soulTitleRef}
            className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-50/90 tracking-tight cursor-default select-none"
            style={{
              rotateX: soulRotateX,
              rotateY: soulRotateY,
              x: soulTranslateX,
              y: soulTranslateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleSoulMouseMove}
            onMouseLeave={handleSoulMouseLeave}
            whileHover={{ 
              scale: 1.05,
              color: "rgba(254, 250, 241, 1)",
              transition: { duration: 0.3 }
            }}
          >
            SOUL
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-cream-50/80 hover:text-cream-50 transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero; 