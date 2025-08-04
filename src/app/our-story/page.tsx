'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Award, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const features = [
  {
    icon: Calendar,
    title: "Since 1892",
    description: "Five generations of winemaking excellence in the Mediterranean"
  },
  {
    icon: Users,
    title: "Family Legacy",
    description: "Passed down through generations, preserving authentic traditions"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized internationally for exceptional quality and craftsmanship"
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "Every bottle reflects our deep love for the land and the craft"
  }
];

export default function OurStoryPage() {
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const traditionTitleRef = useRef<HTMLDivElement>(null);
  const journeyTitleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform navbar background based on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(45, 55, 72, 0)', 'rgba(45, 55, 72, 0.95)']
  );
  
  // Mouse tracking for hero title
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const heroSpringX = useSpring(heroMouseX, { stiffness: 150, damping: 20 });
  const heroSpringY = useSpring(heroMouseY, { stiffness: 150, damping: 20 });
  const heroRotateX = useTransform(heroSpringY, [-0.5, 0.5], [5, -5]);
  const heroRotateY = useTransform(heroSpringX, [-0.5, 0.5], [-5, 5]);
  const heroTranslateX = useTransform(heroSpringX, [-0.5, 0.5], [-15, 15]);
  const heroTranslateY = useTransform(heroSpringY, [-0.5, 0.5], [-15, 15]);
  
  // Mouse tracking for tradition title
  const traditionMouseX = useMotionValue(0);
  const traditionMouseY = useMotionValue(0);
  const traditionSpringX = useSpring(traditionMouseX, { stiffness: 200, damping: 25 });
  const traditionSpringY = useSpring(traditionMouseY, { stiffness: 200, damping: 25 });
  const traditionRotateX = useTransform(traditionSpringY, [-0.5, 0.5], [8, -8]);
  const traditionRotateY = useTransform(traditionSpringX, [-0.5, 0.5], [-8, 8]);
  const traditionTranslateX = useTransform(traditionSpringX, [-0.5, 0.5], [-25, 25]);
  const traditionTranslateY = useTransform(traditionSpringY, [-0.5, 0.5], [-25, 25]);
  
  // Mouse tracking for journey title
  const journeyMouseX = useMotionValue(0);
  const journeyMouseY = useMotionValue(0);
  const journeySpringX = useSpring(journeyMouseX, { stiffness: 200, damping: 25 });
  const journeySpringY = useSpring(journeyMouseY, { stiffness: 200, damping: 25 });
  const journeyRotateX = useTransform(journeySpringY, [-0.5, 0.5], [8, -8]);
  const journeyRotateY = useTransform(journeySpringX, [-0.5, 0.5], [-8, 8]);
  const journeyTranslateX = useTransform(journeySpringX, [-0.5, 0.5], [-25, 25]);
  const journeyTranslateY = useTransform(journeySpringY, [-0.5, 0.5], [-25, 25]);

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

  const handleTraditionMouseMove = (e: React.MouseEvent) => {
    if (!traditionTitleRef.current) return;
    const rect = traditionTitleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    traditionMouseX.set(x * 0.5);
    traditionMouseY.set(y * 0.5);
  };

  const handleJourneyMouseMove = (e: React.MouseEvent) => {
    if (!journeyTitleRef.current) return;
    const rect = journeyTitleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    journeyMouseX.set(x * 0.5);
    journeyMouseY.set(y * 0.5);
  };

  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  const handleTraditionMouseLeave = () => {
    traditionMouseX.set(0);
    traditionMouseY.set(0);
  };

  const handleJourneyMouseLeave = () => {
    journeyMouseX.set(0);
    journeyMouseY.set(0);
  };

  // Scroll effect for navbar
  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

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
      
      // Image animations
      if (imageRef.current && imageInnerRef.current) {
        // Parallax effect on the image
        gsap.to(imageInnerRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        });
        
        // Slide-in animation
        gsap.fromTo(imageRef.current,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 75%",
              end: "top 25%",
              toggleActions: "play none none reverse",
            }
          }
        );
        
        // Image reveal with clip-path
        gsap.fromTo(imageInnerRef.current,
          { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Enhanced Navigation */}
      <motion.nav
        style={{ backgroundColor: navBackground }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          isScrolled ? 'backdrop-blur-lg shadow-lg' : ''
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-max section-padding py-4">
          <div className="flex items-center justify-between">
            {/* Back Button with Magnetic Effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="group flex items-center space-x-3 text-cream-50 hover:text-cream-200 transition-all duration-300 px-4 py-2 rounded-full bg-olive-800/30 hover:bg-olive-700/40 backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowLeft size={20} />
                </motion.div>
                <motion.span 
                  className="font-inter font-medium"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Back to Home
                </motion.span>
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-cream-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>
            
            {/* Logo with Magnetic Effect */}
            <motion.div
              className="relative cursor-default flex items-center"
              whileHover={{ scale: 1.05 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const x = (e.clientX - centerX) / (rect.width / 2);
                const y = (e.clientY - centerY) / (rect.height / 2);
                e.currentTarget.style.transform = `scale(1.05) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h1 
                className={`font-playfair text-xl lg:text-2xl font-bold transition-colors duration-400 ${
                  isScrolled ? 'text-olive-900' : 'text-cream-50'
                }`}
                style={{ transform: 'translateZ(20px)' }}
                whileHover={{ 
                  textShadow: isScrolled ? '0 0 20px rgba(45, 55, 72, 0.3)' : '0 0 20px rgba(254, 250, 241, 0.5)',
                  transition: { duration: 0.3 }
                }}
              >
                Lasmari
              </motion.h1>
            </motion.div>
          </div>
        </div>

      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
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
                backgroundImage: 'url("https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=2000&q=80")',
              }}
            />
            <div className="absolute inset-0 bg-black/30" />
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
                  OUR
                </motion.span>
                <motion.span 
                  className="block text-cream-200/90" 
                  style={{ transform: "translateZ(40px)" }}
                  whileHover={{ color: "rgba(254, 250, 241, 0.8)" }}
                  transition={{ duration: 0.3 }}
                >
                  STORY
                </motion.span>
              </motion.div>
              
              {/* Subtitle */}
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xl text-cream-100/90 font-inter leading-relaxed tracking-wide">
                  A tale of passion, tradition, and the relentless pursuit of winemaking excellence
                  spanning five generations in the heart of Corfu.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-32 bg-cream-50">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              {/* Magnetic Title */}
              <motion.div
                ref={traditionTitleRef}
                className="font-playfair text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-olive-900 leading-[0.9] cursor-default select-none mb-8"
                style={{
                  rotateX: traditionRotateX,
                  rotateY: traditionRotateY,
                  x: traditionTranslateX,
                  y: traditionTranslateY,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleTraditionMouseMove}
                onMouseLeave={handleTraditionMouseLeave}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="block"
                  style={{ transform: "translateZ(30px)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    color: '#374151',
                    transition: { duration: 0.3 }
                  }}
                >
                  ROOTED IN
                </motion.span>
                <motion.span
                  className="block text-olive-600"
                  style={{ transform: "translateZ(60px)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    color: '#1f2937',
                    transition: { duration: 0.3 }
                  }}
                >
                  TRADITION
                </motion.span>
              </motion.div>
              
              {/* Description with blur effect */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-lg leading-relaxed text-olive-700 font-inter"
                  initial={{ 
                    opacity: 0, 
                    x: -60,
                    filter: "blur(4px)"
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                >
                  Lasmari Vineyard began as a dream in 1892, when our great-great-grandfather first planted vines in the fertile soils of Corfu. What started as a small family operation has grown into one of Greece's most respected wineries, yet we've never forgotten our roots.
                </motion.p>
                <motion.p
                  className="text-lg leading-relaxed text-olive-700 font-inter"
                  initial={{ 
                    opacity: 0, 
                    x: -60,
                    filter: "blur(4px)"
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                >
                  Each generation has added their own chapter to our story, introducing new techniques while preserving the traditional methods that give our wines their distinctive character. Today, we continue this legacy with the same passion and dedication that inspired our founders.
                </motion.p>
              </motion.div>
            </motion.div>
            
            {/* Image with smooth reveal animations */}
            <div
              ref={imageRef}
              className="relative h-[500px] overflow-hidden rounded-lg shadow-2xl"
            >
              <div
                ref={imageInnerRef}
                className="absolute inset-0 scale-105"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1503457574462-bd27054394c1?auto=format&fit=crop&w=800&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  willChange: 'transform, clip-path',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
            </div>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-white rounded-lg shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <feature.icon className="w-12 h-12 text-olive-600 mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-bold text-olive-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-olive-700 font-inter">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-olive-900">
        <div className="container-max section-padding">
          {/* Magnetic Journey Title */}
          <motion.div
            ref={journeyTitleRef}
            className="font-playfair text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-cream-50 leading-[0.9] cursor-default select-none text-center mb-20"
            style={{
              rotateX: journeyRotateX,
              rotateY: journeyRotateY,
              x: journeyTranslateX,
              y: journeyTranslateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleJourneyMouseMove}
            onMouseLeave={handleJourneyMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              style={{ transform: "translateZ(40px)" }}
              whileHover={{ 
                color: "rgba(254, 250, 241, 1)",
                transition: { duration: 0.3 }
              }}
            >
              OUR JOURNEY
            </motion.span>
          </motion.div>
          
          <div className="space-y-16">
            {[
              { year: "1892", title: "The Beginning", description: "First vines planted by our founder on the hills of Corfu" },
              { year: "1920", title: "Expansion", description: "Added 50 more acres and built our first stone cellar" },
              { year: "1965", title: "Modernization", description: "Introduced modern winemaking techniques while preserving traditions" },
              { year: "1988", title: "Recognition", description: "First international awards and export to European markets" },
              { year: "2010", title: "Sustainability", description: "Converted to organic farming and sustainable practices" },
              { year: "2024", title: "Today", description: "Fifth generation continuing the legacy with innovation and passion" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="lg:w-1/4">
                  <span className="font-playfair text-3xl font-bold text-cream-200">
                    {item.year}
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <h3 className="font-playfair text-2xl font-bold text-cream-50 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-cream-200 font-inter text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 