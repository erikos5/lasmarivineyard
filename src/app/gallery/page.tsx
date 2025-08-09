'use client';

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import MagneticTitle from '@/components/MagneticTitle';

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

// Gallery images - using high-quality wine and vineyard themed images
const collageImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520637736862-4d197d17c35a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516906736301-b7595215dd17?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1533905785056-c34b3227497a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574469172761-595b6be16096?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551554781-c46200ea959d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1596142332133-327adf4e6b2a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553978297-833d09932d81?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1566717051817-c4fc0ec5d6f0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1472532453775-9ad41e3bf8b0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1595231226090-c0cbacadd763?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1569099377939-ff1c81772b24?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505892781818-b69c25b26e04?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1564498318-ed09c0e8efce?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1561133647-db2e065e1c14?auto=format&fit=crop&w=1200&q=80"
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Use main Navbar for consistency and performance */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Gallery title with magnetic effect */}
      <div className="pt-24 pb-12 text-center relative z-10">
        <MagneticTitle 
          text="Gallery"
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-playfair font-bold text-evergreen-800"
        />
      </div>

      {/* Full-screen Gallery Masonry */}
      <section className="bg-cream-50">
        <div className="px-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-3 [column-fill:_balance]"
          >
            {collageImages.map((image, index) => (
              <motion.div
                key={index}
                className="mb-3 break-inside-avoid relative group cursor-pointer rounded-lg overflow-hidden shadow-[0_4px_12px_-4px_rgba(0,0,0,0.2)]"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedImage(image)}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={image}
                  alt={`Lasmari Vineyard ${index + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-cream-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-inter tracking-wide">View</span>
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