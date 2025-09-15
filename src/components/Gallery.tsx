'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Eye, Plus } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    alt: "Vineyard landscape at golden hour",
    className: "col-span-6 row-span-4", // Hero image - half width, very tall
    category: "landscape"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    alt: "Hand-picked Corfu grapes",
    className: "col-span-3 row-span-3", // Large square
    category: "grapes"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    alt: "Ancient wine barrels",
    className: "col-span-3 row-span-2", // Medium rectangle
    category: "cellar"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1558001683-0a98f9634e87?auto=format&fit=crop&w=800&q=80",
    alt: "Vineyard workers at harvest",
    className: "col-span-2 row-span-2", // Small square
    category: "harvest"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1000&q=80",
    alt: "Mediterranean sunset over vines",
    className: "col-span-4 row-span-2", // Wide rectangle
    category: "landscape"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    alt: "Wine tasting experience",
    className: "col-span-3 row-span-3", // Large square
    category: "tasting"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    alt: "Corfu wine in crystal glass",
    className: "col-span-2 row-span-3", // Tall rectangle
    category: "wine"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80",
    alt: "Estate vineyards aerial view",
    className: "col-span-4 row-span-2", // Wide rectangle
    category: "landscape"
  }
];

const Gallery = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLDivElement>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  
  // Mouse position tracking for title
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-cream-100">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            ref={titleRef}
            className="font-playfair text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight text-olive-900 mb-8 leading-[0.9] cursor-default select-none"
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.04,
              color: "#1f2937",
              transition: { duration: 0.3 }
            }}
          >
            GALLERY
          </motion.div>
          
          <motion.p
            className="text-xl leading-relaxed text-olive-700 font-inter max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            Immerse yourself in the visual story of our vineyard — from sun-kissed landscapes 
            to intimate moments of craftsmanship that define our Mediterranean wine legacy.
          </motion.p>
        </div>

        {/* Simple Gallery Grid */}
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-6 auto-rows-[100px] md:auto-rows-[120px] lg:auto-rows-[140px] mb-20">
          {galleryImages.map((image, index) => {
            const isHovered = hoveredImage === image.id;
            const isOtherHovered = hoveredImage !== null && hoveredImage !== image.id;
            
            return (
              <motion.div
                key={image.id}
                className={`relative overflow-hidden rounded-2xl cursor-pointer ${image.className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  scale: isHovered ? 1.15 : isOtherHovered ? 0.9 : 1,
                  filter: isOtherHovered ? "brightness(0.7)" : "brightness(1)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
                onHoverStart={() => setHoveredImage(image.id)}
                onHoverEnd={() => setHoveredImage(null)}
                style={{
                  zIndex: isHovered ? 10 : 1
                }}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hover Content */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="text-center text-white">
                      <Eye className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-inter font-medium">{image.category}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Explore More Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group inline-flex items-center justify-center px-16 py-5 bg-olive-900 text-cream-50 font-inter font-medium text-sm uppercase tracking-[0.2em] hover:bg-olive-800 transition-all duration-500 rounded-full relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/gallery')}
          >
            <span className="relative z-10 mr-3">Explore Full Gallery</span>
            <motion.div
              className="relative z-10"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Plus className="w-4 h-4" />
            </motion.div>
          </motion.button>
          
          <motion.p
            className="text-olive-600 font-inter text-sm mt-4 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Over 50 curated moments from our vineyard heritage
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery; 