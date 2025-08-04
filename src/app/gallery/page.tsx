'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowLeft, Grid, Image as ImageIcon, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const galleryCategories = [
  {
    title: "VINEYARD LANDSCAPES",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "WINE MAKING",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "TASTINGS & EVENTS",
    images: [
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618047-b0c4c67935d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582992979121-6ee4f1b5cc31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503457574462-bd27054394c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    title: "ESTATE & ARCHITECTURE",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516906736301-b7595215dd17?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533905785056-c34b3227497a?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryImagesRef = useRef<(HTMLDivElement | null)[]>([]);
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

  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
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
      
      // Gallery images animations
      galleryImagesRef.current.forEach((imageRef, index) => {
        if (imageRef) {
          // Staggered reveal animation
          gsap.fromTo(imageRef,
            { y: 60, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageRef,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              }
            }
          );
          
          // Image hover parallax
          const img = imageRef.querySelector('img');
          if (img) {
            gsap.set(img, { scale: 1.1 });
          }
        }
      });
    });
    
    return () => ctx.revert();
  }, [selectedCategory]);

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
                backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80")',
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
                  GALLERY
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
                  Discover the beauty of our vineyard through these captured moments of tradition, craftsmanship, and the natural splendor of Corfu.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Category Navigation */}
      <section className="py-16 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-50 border-b border-olive-200/50">
        <div className="container-max section-padding">
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {galleryCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => setSelectedCategory(index)}
                  className={`relative font-inter font-medium text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-500 backdrop-blur-sm border overflow-hidden ${
                    selectedCategory === index
                      ? 'bg-olive-900 text-cream-50 border-olive-900 shadow-xl'
                      : 'text-olive-900 hover:text-olive-700 bg-cream-50/70 hover:bg-cream-100/80 border-olive-200 hover:border-olive-300 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const x = (e.clientX - centerX) / (rect.width / 2);
                    const y = (e.clientY - centerY) / (rect.height / 2);
                    e.currentTarget.style.transform = `scale(1.05) translateY(-2px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0px) rotateX(0deg) rotateY(0deg)';
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Button content */}
                  <span className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                    {category.title}
                  </span>
                  
                  {/* Active indicator */}
                  {selectedCategory === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-900 rounded-full"
                      layoutId="activeCategory"
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-olive-500/20 to-olive-600/20 opacity-0"
                    whileHover={{ opacity: selectedCategory === index ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Subtle shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cream-50/10 to-transparent translate-x-[-100%]"
                    whileHover={{ translateX: '100%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-32 bg-cream-50">
        <div className="container-max section-padding">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {galleryCategories[selectedCategory].images.map((image, index) => (
              <motion.div
                key={index}
                ref={(el) => (galleryImagesRef.current[index] = el)}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedImage(image)}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                  <motion.img
                    src={image}
                    alt={`${galleryCategories[selectedCategory].title} ${index + 1}`}
                    className="w-full h-full object-cover scale-110"
                    style={{ willChange: 'transform' }}
                    whileHover={{
                      scale: 1.15,
                      transition: { duration: 0.6, ease: "easeOut" }
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" 
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                  />
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ 
                        scale: 1,
                        transition: { duration: 0.3, ease: "backOut" }
                      }}
                    >
                      <Eye className="w-8 h-8 text-cream-50" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-32 bg-olive-900">
        <div className="container-max section-padding">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { number: "130+", text: "Years of winemaking tradition" },
              { number: "50", text: "Acres of pristine vineyards" },
              { number: "25+", text: "Award-winning wines" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <motion.h3 
                  className="font-playfair text-4xl lg:text-5xl xl:text-6xl font-bold text-cream-50 mb-4 cursor-default"
                  whileHover={{ 
                    color: "rgba(254, 250, 241, 0.8)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {stat.number}
                </motion.h3>
                <motion.p 
                  className="text-cream-200 font-inter text-lg"
                  initial={{ 
                    opacity: 0, 
                    filter: "blur(2px)"
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    filter: "blur(0px)"
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2 + 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                >
                  {stat.text}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-8 right-8 text-cream-50 text-4xl hover:text-cream-200 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </motion.div>
      )}
    </main>
  );
} 