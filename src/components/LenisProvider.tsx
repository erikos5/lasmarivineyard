'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LoadingAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-olive-900 via-olive-800 to-olive-900 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fefaf1' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Grape Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            transition: { 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2 
            }
          }}
        >
          <div className="relative">
            {/* Grape Cluster */}
            <motion.div 
              className="grid grid-cols-3 gap-1"
              animate={{ 
                y: [0, -5, 0],
                transition: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            >
              {/* Row 1 */}
              <motion.div 
                className="w-3 h-3 bg-burgundy-600 rounded-full col-start-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              {/* Row 2 */}
              <motion.div 
                className="w-3 h-3 bg-burgundy-600 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              />
              <motion.div 
                className="w-3 h-3 bg-burgundy-600 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="w-3 h-3 bg-burgundy-600 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              {/* Row 3 */}
              <motion.div 
                className="w-3 h-3 bg-burgundy-700 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              <motion.div 
                className="w-3 h-3 bg-burgundy-700 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="w-3 h-3 bg-burgundy-700 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
              {/* Row 4 */}
              <motion.div 
                className="w-3 h-3 bg-burgundy-700 rounded-full col-start-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
              />
            </motion.div>
            
            {/* Vine Leaf */}
            <motion.div
              className="absolute -top-2 -right-1 w-4 h-3 bg-olive-600 rounded-full transform rotate-45"
              initial={{ rotate: 45, scale: 0 }}
              animate={{ 
                rotate: [45, 50, 45],
                scale: 1,
                transition: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5 
                }
              }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8, 
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
        >
          <motion.h2 
            className="font-playfair text-3xl lg:text-4xl font-bold text-cream-50 tracking-tight"
            animate={{ 
              opacity: [0.8, 1, 0.8],
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          >
            LASMARI VINEYARD
          </motion.h2>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cream-50 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <motion.p 
            className="font-inter text-cream-200/80 text-sm tracking-wide uppercase"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.6, delay: 1.2 }
            }}
          >
            Crafting Excellence Since 1892
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-12 w-64 h-1 bg-cream-50/20 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.6, delay: 1 }
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cream-50 to-burgundy-300 rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: { 
                duration: 2.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 1.2 
              }
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Faster loading with smoother transition
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // Reduced from 4000ms to 2800ms

    // Prepare content transition
    const contentTimer = setTimeout(() => {
      setIsContentReady(true);
    }, 2500); // Start content prep slightly earlier

    // Initialize Lenis with slower, more luxurious settings
    const lenis = new Lenis({
      duration: 2.5, // Increased from 1.2 to 2.5 for slower scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Keep the smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6, // Reduced from 1 to 0.6 for slower wheel scrolling
      touchMultiplier: 1.5, // Reduced from 2 to 1.5 for slower touch scrolling
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose lenis to window for other components to use
    (window as any).lenis = lenis;

    // Update ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent sync issues
    gsap.ticker.lagSmoothing(0);

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(contentTimer);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 bg-gradient-to-br from-olive-900 via-olive-800 to-olive-900 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1] 
              }
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="w-full h-full" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fefaf1' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat'
                }}
              />
            </div>

            <motion.div 
              className="relative z-10 text-center"
              exit={{ 
                y: -30,
                opacity: 0,
                transition: { 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
            >
              {/* Animated Grape Icon */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    duration: 1, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.2 
                  }
                }}
                exit={{
                  scale: 0.8,
                  rotate: 10,
                  transition: { duration: 0.6 }
                }}
              >
                <div className="relative">
                  {/* Grape Cluster */}
                  <motion.div 
                    className="grid grid-cols-3 gap-1"
                    animate={{ 
                      y: [0, -3, 0],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }
                    }}
                  >
                    {/* Row 1 */}
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-600 rounded-full col-start-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    />
                    {/* Row 2 */}
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-600 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-600 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-600 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                    {/* Row 3 */}
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-700 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-700 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-700 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    />
                    {/* Row 4 */}
                    <motion.div 
                      className="w-3 h-3 bg-burgundy-700 rounded-full col-start-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                    />
                  </motion.div>
                  
                  {/* Vine Leaf */}
                  <motion.div
                    className="absolute -top-2 -right-1 w-4 h-3 bg-olive-600 rounded-full transform rotate-45"
                    initial={{ rotate: 45, scale: 0 }}
                    animate={{ 
                      rotate: [45, 50, 45],
                      scale: 1,
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 0.5 
                      }
                    }}
                  />
                </div>
              </motion.div>

              {/* Loading Text */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1] 
                  }
                }}
              >
                <motion.h2 
                  className="font-playfair text-3xl lg:text-4xl font-bold text-cream-50 tracking-tight"
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                    transition: { 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }
                  }}
                >
                  LASMARI VINEYARD
                </motion.h2>
                
                {/* Loading Dots */}
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-cream-50 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                
                <motion.p 
                  className="font-inter text-cream-200/80 text-sm tracking-wide uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { duration: 0.6, delay: 1 }
                  }}
                >
                  Crafting Excellence Since 1892
                </motion.p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="mt-12 w-64 h-1 bg-cream-50/20 rounded-full overflow-hidden mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.8 }
                }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cream-50 to-burgundy-300 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: "100%",
                    transition: { 
                      duration: 2, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 1 
                    }
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        key="content"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ 
          opacity: isContentReady ? 1 : 0,
          y: isContentReady ? 0 : 20,
          scale: isContentReady ? 1 : 0.98,
          transition: { 
            duration: 1.4, 
            delay: !isLoading ? 0.2 : 0,
            ease: [0.22, 1, 0.36, 1] 
          }
        }}
      >
        {children}
      </motion.div>
    </>
  );
} 