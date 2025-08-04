'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Story', href: '#story' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Visit', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform navbar background based on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(254, 250, 241, 0)', 'rgba(254, 250, 241, 0.95)']
  );

  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
        isScrolled ? 'backdrop-blur-subtle shadow-lg' : ''
      }`}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            style={{ scale: logoScale }}
            className="flex items-center"
          >
            <motion.h1
              className={`font-playfair text-2xl font-bold transition-colors duration-400 ${
                isScrolled ? 'text-olive-900' : 'text-cream-50'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Lasmari
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative font-inter font-medium transition-colors duration-400 ${
                  isScrolled ? 'text-olive-900' : 'text-cream-50'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {item.name}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-current`}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden ${isScrolled ? 'text-olive-900' : 'text-cream-50'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left font-inter font-medium transition-colors duration-400 ${
                  isScrolled ? 'text-olive-900' : 'text-cream-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 