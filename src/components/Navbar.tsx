'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', isPage: true },
  { name: 'Experiences', href: '/experiences', isPage: true },
  { name: 'Gallery', href: '/gallery', isPage: true },
  { name: 'Book Now', href: '/book', isPage: true },
  { name: 'Visit', href: '#contact', isPage: false },
];

// Pages with light backgrounds where navbar needs dark text + solid bg
const LIGHT_BG_PAGES = ['/book', '/admin'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const isGalleryPage = pathname === '/gallery';
  const isLightPage = LIGHT_BG_PAGES.some((p) => pathname.startsWith(p));

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    isLightPage
      ? ['rgba(72, 36, 32, 0.95)', 'rgba(72, 36, 32, 0.95)']
      : ['rgba(72, 36, 32, 0)', isGalleryPage ? 'rgba(72, 36, 32, 0)' : 'rgba(72, 36, 32, 0.95)']
  );

  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(250, 247, 242, 1)', 'rgba(250, 247, 242, 0.9)']
  );

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const handleNavigation = (item: typeof navItems[0]) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    if (item.isPage) {
      // Immediate navigation for smooth experience
      router.push(item.href);
    } else {
      // For anchor links (like #contact)
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
        isScrolled || isLightPage ? 'backdrop-blur-subtle shadow-lg' : ''
      }`}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between py-4 transform translate-x-4 md:translate-x-8 lg:translate-x-12">
          {/* Logo */}
          <motion.div
            style={{ scale: logoScale }}
            className="flex items-center cursor-pointer"
            onClick={() => {
              if (pathname === '/') {
                // If on homepage, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // If on other pages, navigate to homepage
                router.push('/');
              }
            }}
          >
            <img 
              src="/images/logo/logo-transparent.jpeg" 
              alt="Lasmari Vineyard" 
              className="h-12 md:h-14 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isBookNow = item.href === '/book';

              if (isBookNow) {
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className="font-inter font-semibold text-evergreen-900 bg-pink-400 hover:bg-pink-500 px-5 py-2 rounded-full transition-colors duration-200"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {item.name}
                  </motion.button>
                );
              }

              return (
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
              );
            })}
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
            {navItems.map((item, index) => {
              const isBookNow = item.href === '/book';

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  style={isBookNow ? undefined : { color: textColor }}
                  className={
                    isBookNow
                      ? 'block w-full text-left font-inter font-bold text-evergreen-900 bg-pink-400 px-5 py-3 rounded-full'
                      : `block w-full text-left font-inter font-medium ${
                          isActivePage(item.href) ? 'opacity-100' : 'opacity-80'
                        }`
                  }
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 