'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', isPage: true },
  { name: 'Our Story', href: '/our-story', isPage: true },
  { name: 'Experiences', href: '/experiences', isPage: true },
  { name: 'Gallery', href: '/gallery', isPage: true },
  { name: 'Visit', href: '#contact', isPage: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Dynamic navbar background - cinematic style
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(46, 59, 41, 0)', 'rgba(46, 59, 41, 0.95)']
  );

  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  // Text color transitions
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(249, 247, 244, 1)', 'rgba(249, 247, 244, 0.9)']
  );

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.isPage) {
      router.push(item.href);
    } else {
      // For anchor links (like #contact)
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname === href) return true;
    return false;
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
            className="flex items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            <motion.h1
              style={{ color: textColor }}
              className="font-playfair text-2xl font-bold"
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
                onClick={() => handleNavigation(item)}
                style={{ color: textColor }}
                className={`relative font-inter font-medium ${
                  isActivePage(item.href) ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {item.name}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 ${
                    isActivePage(item.href) ? 'bg-pink-400' : 'bg-current'
                  }`}
                  initial={{ width: isActivePage(item.href) ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            style={{ color: textColor }}
            className="md:hidden"
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
                onClick={() => handleNavigation(item)}
                style={{ color: textColor }}
                className={`block w-full text-left font-inter font-medium ${
                  isActivePage(item.href) ? 'opacity-100' : 'opacity-80'
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