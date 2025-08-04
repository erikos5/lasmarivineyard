'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowLeft, Clock, Users, Wine, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const experiences = [
  {
    title: "SIGNATURE TASTING",
    duration: "90 minutes",
    guests: "2-8 people",
    price: "€75 per person",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=2000&q=80",
    description: "Journey through our finest vintages with expert sommeliers in our historic wine cellar. Discover the nuances of Corfiot terroir through carefully selected wines paired with local delicacies.",
    includes: ["Private cellar tour", "5 wine tastings", "Artisanal cheese platter", "Take-home bottle"]
  },
  {
    title: "HARVEST EXPERIENCE",
    duration: "Full day",
    guests: "4-12 people",
    price: "€150 per person",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=2000&q=80",
    description: "Join our harvest season and experience the authentic rhythm of winemaking. From sunrise picking to sunset celebration, immerse yourself in our centuries-old traditions.",
    includes: ["Grape picking", "Traditional lunch", "Wine making workshop", "Harvest celebration dinner"],
    seasonal: true
  },
  {
    title: "CULINARY PAIRING",
    duration: "3 hours",
    guests: "2-10 people", 
    price: "€120 per person",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=2000&q=80",
    description: "An exquisite journey where our wines meet traditional Corfiot cuisine. Each course is thoughtfully paired with our estate wines to create unforgettable flavor harmonies.",
    includes: ["5-course tasting menu", "Wine pairings", "Chef interaction", "Recipe cards"]
  },
  {
    title: "PRIVATE ESTATE TOUR",
    duration: "2 hours",
    guests: "2-6 people",
    price: "€95 per person",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=2000&q=80",
    description: "Exclusive access to our historic estate with a family member guide. Explore hidden corners, learn family secrets, and taste exclusive reserve wines not available to the public.",
    includes: ["Family guide", "Historic cellars", "Reserve tastings", "Estate walk"]
  }
];

export default function ExperiencesPage() {
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const customTitleRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const experienceImageRefs = useRef<(HTMLDivElement | null)[]>([]);
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
  
  // Mouse tracking for custom title
  const customMouseX = useMotionValue(0);
  const customMouseY = useMotionValue(0);
  const customSpringX = useSpring(customMouseX, { stiffness: 200, damping: 25 });
  const customSpringY = useSpring(customMouseY, { stiffness: 200, damping: 25 });
  const customRotateX = useTransform(customSpringY, [-0.5, 0.5], [8, -8]);
  const customRotateY = useTransform(customSpringX, [-0.5, 0.5], [-8, 8]);
  const customTranslateX = useTransform(customSpringX, [-0.5, 0.5], [-25, 25]);
  const customTranslateY = useTransform(customSpringY, [-0.5, 0.5], [-25, 25]);

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

  const handleCustomMouseMove = (e: React.MouseEvent) => {
    if (!customTitleRef.current) return;
    const rect = customTitleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    customMouseX.set(x * 0.5);
    customMouseY.set(y * 0.5);
  };

  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  const handleCustomMouseLeave = () => {
    customMouseX.set(0);
    customMouseY.set(0);
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
      
      // Experience images animations
      experienceImageRefs.current.forEach((imageRef, index) => {
        if (imageRef) {
          const isReverse = index % 2 === 1;
          
          // Slide-in animation
          gsap.fromTo(imageRef,
            { x: isReverse ? -100 : 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageRef,
                start: "top 75%",
                end: "top 25%",
                toggleActions: "play none none reverse",
              }
            }
          );
          
          // Parallax effect
          const imageInner = imageRef.querySelector('img');
          if (imageInner) {
            gsap.to(imageInner, {
              yPercent: -15,
              ease: "none",
              scrollTrigger: {
                trigger: imageRef,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              }
            });
          }
        }
      });
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
                backgroundImage: 'url("https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=2000&q=80")',
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
                  WINE
                </motion.span>
                <motion.span 
                  className="block text-cream-200/90" 
                  style={{ transform: "translateZ(40px)" }}
                  whileHover={{ color: "rgba(254, 250, 241, 0.8)" }}
                  transition={{ duration: 0.3 }}
                >
                  EXPERIENCES
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
                  Immerse yourself in the world of Corfiot winemaking through our carefully curated experiences. From intimate tastings to hands-on harvest participation.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-32 bg-cream-50">
        <div className="container-max section-padding">
          <div className="space-y-32">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-20 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image with smooth reveal animations */}
                <div 
                  ref={(el) => (experienceImageRefs.current[index] = el)}
                  className={`relative h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl ${
                    index % 2 === 1 ? 'lg:col-start-1' : ''
                  }`}
                >
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover scale-110"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
                  {experience.seasonal && (
                    <motion.div 
                      className="absolute top-6 left-6 bg-burgundy-700 text-cream-50 px-4 py-2 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-inter text-sm font-medium">Seasonal</span>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className={`space-y-8 ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <div className="overflow-hidden">
                    {/* Experience Title with Magnetic Effect */}
                    <motion.h2
                      ref={(el) => (experienceRefs.current[index] = el)}
                      className="font-playfair text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-olive-900 leading-[0.9] cursor-default select-none mb-4"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      onMouseMove={(e) => {
                        const ref = experienceRefs.current[index];
                        if (!ref) return;
                        const rect = ref.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;
                        const x = (e.clientX - centerX) / (rect.width / 2);
                        const y = (e.clientY - centerY) / (rect.height / 2);
                        ref.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateX(${x * 10}px) translateY(${y * 10}px)`;
                      }}
                      onMouseLeave={() => {
                        const ref = experienceRefs.current[index];
                        if (ref) {
                          ref.style.transform = 'rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)';
                        }
                      }}
                    >
                      {experience.title.split(' ').map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          className={`block ${word === 'SIGNATURE' || word === 'HARVEST' || word === 'CULINARY' || word === 'PRIVATE' ? 'text-olive-600' : ''}`}
                          style={{ transform: `translateZ(${wordIndex * 20}px)` }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + wordIndex * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            color: word === 'SIGNATURE' || word === 'HARVEST' || word === 'CULINARY' || word === 'PRIVATE' ? '#1f2937' : '#374151',
                            transition: { duration: 0.3 }
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h2>
                    
                    {/* Description with blur effect */}
                    <motion.p
                      className="text-lg leading-relaxed text-olive-700 font-inter"
                      initial={{ 
                        opacity: 0, 
                        x: index % 2 === 1 ? -60 : 60,
                        filter: "blur(4px)"
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        filter: "blur(0px)"
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      viewport={{ once: true }}
                    >
                      {experience.description}
                    </motion.p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-olive-600" />
                      <div>
                        <p className="text-sm font-inter font-medium text-olive-600 uppercase tracking-wide">Duration</p>
                        <p className="text-olive-900 font-inter">{experience.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-olive-600" />
                      <div>
                        <p className="text-sm font-inter font-medium text-olive-600 uppercase tracking-wide">Guests</p>
                        <p className="text-olive-900 font-inter">{experience.guests}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Wine className="w-5 h-5 text-olive-600" />
                      <div>
                        <p className="text-sm font-inter font-medium text-olive-600 uppercase tracking-wide">Price</p>
                        <p className="text-olive-900 font-inter font-semibold">{experience.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Includes */}
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-olive-900 mb-4">Experience Includes</h3>
                    <ul className="space-y-2">
                      {experience.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-olive-600 rounded-full" />
                          <span className="text-olive-700 font-inter">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    className="inline-flex items-center justify-center px-12 py-4 bg-olive-900 text-cream-50 font-inter font-medium text-sm uppercase tracking-widest hover:bg-olive-800 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Experience
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-olive-900">
        <div className="container-max section-padding text-center">
          {/* Magnetic Custom Title */}
          <motion.div
            ref={customTitleRef}
            className="font-playfair text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-cream-50 leading-[0.9] cursor-default select-none mb-8"
            style={{
              rotateX: customRotateX,
              rotateY: customRotateY,
              x: customTranslateX,
              y: customTranslateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleCustomMouseMove}
            onMouseLeave={handleCustomMouseLeave}
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
              NEED SOMETHING CUSTOM?
            </motion.span>
          </motion.div>
          <motion.p
            className="text-xl text-cream-200 mb-12 max-w-2xl mx-auto font-inter leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We can create bespoke experiences tailored to your preferences, group size, and special occasions.
          </motion.p>
          <motion.button
            className="inline-flex items-center justify-center px-12 py-4 border-2 border-cream-50 text-cream-50 font-inter font-medium text-sm uppercase tracking-widest hover:bg-cream-50 hover:text-olive-900 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </main>
  );
} 