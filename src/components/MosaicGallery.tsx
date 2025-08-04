'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Eye, X, Play, Volume2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AudioWithSubtitles from './AudioWithSubtitles';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  story?: string;
  audioId?: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  size: 'small' | 'medium' | 'large';
}

interface GallerySection {
  title: string;
  emotion: string;
  description: string;
  images: GalleryImage[];
}

interface MosaicGalleryProps {
  sections: GallerySection[];
  className?: string;
}

const MosaicGallery = ({ sections, className = '' }: MosaicGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Stagger image reveals
      imageRefs.current.forEach((imageRef, index) => {
        if (imageRef) {
          gsap.fromTo(imageRef,
            {
              opacity: 0,
              scale: 0.9,
              filter: 'grayscale(100%)',
            },
            {
              opacity: 1,
              scale: 1,
              filter: 'grayscale(0%)',
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageRef,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
              delay: (index % 6) * 0.1, // Stagger within each row
            }
          );
        }
      });
    });
    
    return () => ctx.revert();
  }, []);

  const getGridClasses = (image: GalleryImage, index: number) => {
    const baseClasses = "relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group";
    
    // Dynamic grid positioning based on aspect ratio and size
    const sizeClasses = {
      small: "col-span-1 row-span-1",
      medium: "col-span-2 row-span-2",
      large: "col-span-3 row-span-3",
    };
    
    const aspectClasses = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      wide: "aspect-[16/9]",
    };
    
    return `${baseClasses} ${sizeClasses[image.size]} ${aspectClasses[image.aspectRatio]}`;
  };

  const ImageModal = () => (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-6xl max-h-full bg-evergreen-800/90 backdrop-blur-cinematic rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-cinematic-gradient opacity-20" />
              </div>

              {/* Story Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-playfair text-3xl lg:text-4xl font-bold text-cream-50 mb-6"
                >
                  Story Behind the Moment
                </motion.h3>
                
                {selectedImage.story && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg text-cream-200 font-inter leading-relaxed mb-8"
                  >
                    {selectedImage.story}
                  </motion.p>
                )}

                {/* Audio Story */}
                {selectedImage.audioId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <AudioWithSubtitles
                      id={selectedImage.audioId}
                      className="max-w-full"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={galleryRef} className={`${className}`}>
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          className="mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.span
              className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-inter text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {section.emotion}
            </motion.span>
            
            <motion.h2
              className="font-playfair text-4xl lg:text-5xl font-bold text-evergreen-800 mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {section.title}
            </motion.h2>
            
            <motion.p
              className="text-lg text-evergreen-600 font-inter max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {section.description}
            </motion.p>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
            {section.images.map((image, imageIndex) => {
              const globalIndex = sectionIndex * section.images.length + imageIndex;
              
              return (
                <motion.div
                  key={image.id}
                  ref={(el) => (imageRefs.current[globalIndex] = el)}
                  className={getGridClasses(image, imageIndex)}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-cinematic-gradient opacity-0 group-hover:opacity-60 transition-all duration-300" />
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-cream-50/20 backdrop-blur-sm rounded-full p-4 mb-4"
                    >
                      <Eye className="w-6 h-6 text-cream-50" />
                    </motion.div>
                    
                    {image.story && (
                      <p className="text-cream-50 font-inter text-sm text-center px-4 leading-relaxed">
                        Click to hear the story
                      </p>
                    )}
                    
                    {image.audioId && (
                      <motion.div
                        className="mt-2 bg-pink-400/30 rounded-full p-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Volume2 className="w-4 h-4 text-cream-50" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Image Modal */}
      <ImageModal />
    </div>
  );
};

export default MosaicGallery;