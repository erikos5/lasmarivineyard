'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import MagneticTitle from '@/components/MagneticTitle';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// All authentic vineyard images
const allImages = Array.from({ length: 32 }, (_, i) => 
  `/images/new/vineyard-${String(i + 1).padStart(2, '0')}.jpeg`
);

// Create images with varied aspect ratios for masonry layout
const collageImages = allImages.map((src, index) => {
  const aspects = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-[2/3]', 'aspect-[3/2]', 'aspect-[5/4]', 'aspect-[4/5]'];
  return { src, aspect: aspects[index % aspects.length] };
});

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-evergreen-900 via-evergreen-800 to-evergreen-700 transition-fade">
      {/* Use main Navbar for consistency and performance */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Enhanced Gallery Header */}
      <div className="pt-32 pb-20 text-center relative z-10 bg-gradient-to-b from-evergreen-900 via-evergreen-800 to-evergreen-800/80">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <MagneticTitle 
              text="Gallery"
              className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-playfair font-bold text-white leading-none"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-cream-100 font-inter font-light max-w-2xl mx-auto leading-relaxed"
            >
              A visual journey through our vineyard heritage, from ancient terroir to modern winemaking excellence
            </motion.p>
            
            {/* Decorative separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cream-300 to-transparent mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Full-screen Gallery Masonry */}
      <section className="bg-gradient-to-b from-evergreen-800 via-evergreen-800 to-evergreen-700">
        <div className="px-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="columns-1 md:columns-2 gap-4 [column-fill:_balance]"
          >
            {collageImages.map((imageObj, index) => (
              <motion.div
                key={index}
                className={`mb-4 break-inside-avoid relative group rounded-lg overflow-hidden shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)] ${imageObj.aspect}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={imageObj.src}
                  alt={`Lasmari Vineyard ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-32 bg-gradient-to-b from-evergreen-700 via-evergreen-800 to-evergreen-900">
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

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </main>
  );
} 