'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
  className?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Section = ({
  id,
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  reverse = false,
  className = '',
  buttonText = "DISCOVER MORE",
  onButtonClick
}: SectionProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  
  // Transform values for movement and rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    
    const rect = titleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x * 0.5);
    mouseY.set(y * 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // GSAP ScrollTrigger animations for images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      if (imageRef.current && imageInnerRef.current) {
        // Subtle parallax effect on the image
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
        
        // Smooth slide-in animation from the side
        gsap.fromTo(imageRef.current,
          {
            x: reverse ? 100 : -100, // Slide from opposite side
            opacity: 0,
          },
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
        
        // Image inner reveal with clip-path
        gsap.fromTo(imageInnerRef.current,
          {
            clipPath: reverse ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
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
        
        // Gentle overlay fade
        if (overlayRef.current) {
          gsap.fromTo(overlayRef.current,
            { opacity: 0.6 },
            {
              opacity: 0.15,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 60%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      }
    });
    
    return () => ctx.revert();
  }, [reverse]);

  return (
    <section id={id} className={`min-h-screen ${className}`}>
      <motion.div 
        className={`grid lg:grid-cols-2 min-h-screen ${reverse ? 'lg:grid-flow-col-dense' : ''}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Text Content */}
        <motion.div
          className={`bg-cream-50 flex items-center justify-center p-12 lg:p-20 ${reverse ? 'lg:col-start-2' : ''}`}
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="max-w-lg space-y-8 overflow-hidden">
            {/* Magnetic Title - Completely independent */}
            <motion.div
              ref={titleRef}
              className="font-playfair text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight text-olive-900 leading-[0.9] cursor-default select-none"
              style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {title.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className={`block ${word === 'LASMARI' || word === 'EXPERIENCES' ? 'text-olive-600' : ''}`}
                  style={{
                    transform: `translateZ(${index * 30}px)`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    color: word === 'LASMARI' || word === 'EXPERIENCES' ? '#1f2937' : '#374151',
                    transition: { duration: 0.3 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Description with horizontal slide animation */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-lg leading-relaxed text-olive-700 font-inter"
                initial={{ 
                  opacity: 0, 
                  x: reverse ? 60 : -60,
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
                  ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
                }}
                viewport={{ once: true }}
              >
                {description}
              </motion.p>
            </motion.div>
            
            {/* Button with slide animation */}
            <motion.div
              initial={{ 
                opacity: 0, 
                x: reverse ? 40 : -40 
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
            >
              <motion.button
                className="inline-flex items-center justify-center px-12 py-4 bg-olive-900 text-cream-50 font-inter font-medium text-sm uppercase tracking-widest hover:bg-olive-800 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onButtonClick}
              >
                {buttonText}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Image with smooth reveal animations */}
        <div
          ref={imageRef}
          className={`relative min-h-[60vh] lg:min-h-screen overflow-hidden ${reverse ? 'lg:col-start-1' : ''}`}
        >
          <div
            ref={imageInnerRef}
            className="absolute inset-0 scale-105"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform, clip-path',
            }}
          />
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" 
          />
          
          {/* Optional overlay text */}
          {subtitle && (
            <motion.div
              className="absolute bottom-12 left-12 right-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <p className="text-cream-50 font-inter text-sm uppercase tracking-widest drop-shadow-lg">
                {subtitle}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Section; 