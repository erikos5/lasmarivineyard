'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const MobileHero = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('welcome');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-evergreen-800 to-evergreen-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=2000&q=80")'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-evergreen-900/80 via-evergreen-800/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-cream-200 font-inter text-sm uppercase tracking-widest"
          >
            Est. 1892
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-playfair text-4xl font-bold text-cream-50 leading-tight"
          >
            AUTHENTIC
            <br />
            <span className="text-pink-400">CORFIOT</span>
            <br />
            HERITAGE
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-cream-200 font-inter text-base leading-relaxed"
          >
            Five generations of winemaking tradition in the heart of northern Corfu
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            onClick={() => {
              const experiencesSection = document.getElementById('lasmari-experience');
              if (experiencesSection) {
                experiencesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold px-8 py-3 text-sm rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Discover Our Story
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cream-50 hover:text-pink-400 transition-colors duration-300"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="font-inter text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default MobileHero;
