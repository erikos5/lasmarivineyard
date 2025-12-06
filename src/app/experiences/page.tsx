'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ScrollSection from '@/components/ScrollSection';
import MagneticTitle from '@/components/MagneticTitle';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

// Comprehensive experience segments
const experienceSegments = [
  {
    title: "Historic Winemaking Discovery",
    duration: "45 minutes",
    description: "Begin your journey exploring the authentic locations where our family has crafted wine for generations. Walk through our original stone cellars, witness traditional fermentation vessels, and discover the secrets of Corfiot winemaking techniques passed down through five generations.",
    features: [
      "Original stone cellars tour",
      "Traditional fermentation vessels",
      "Family winemaking secrets",
      "Historical artifacts and tools",
      "Stories of five generations"
    ],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Wine Tasting & Terroir Experience",
    duration: "60 minutes", 
    description: "Settle into our intimate tasting space where you'll experience the unique character of our estate wines. Each glass tells the story of our Mediterranean terroir, from the ancient stream beds to the perfect climate that creates our distinctive flavors.",
    features: [
      "5 signature wine tastings",
      "Terroir education & explanation",
      "Flavor profile exploration", 
      "Vintage comparison experience",
      "Personal tasting notes guidance"
    ],
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Authentic Corfiot Culinary Journey",
    duration: "45 minutes",
    description: "Savor the authentic flavors of Corfu with traditional bites prepared using recipes from our family kitchen. Each dish is carefully paired with our wines to showcase the perfect harmony between local cuisine and our estate's character.",
    features: [
      "Traditional Corfiot appetizers",
      "Family recipe specialties",
      "Wine and food pairing guidance",
      "Local ingredient stories",
      "Seasonal delicacies"
    ],
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Estate Grounds & Heritage Tour",
    duration: "30 minutes",
    description: "Conclude your experience with a guided walk through our beautiful estate grounds. Discover the vineyards where it all began, learn about our sustainable farming practices, and see firsthand the landscape that shapes every bottle we create.",
    features: [
      "Vineyard rows exploration",
      "Sustainable farming showcase",
      "Landscape and terroir explanation",
      "Photo opportunities", 
      "Seasonal highlights"
    ],
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80"
  }
];

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 10
  },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

export default function ExperiencesPage() {
  // Performance optimization: preload critical images
  useEffect(() => {
    experienceSegments.forEach(segment => {
      const img = new Image();
      img.src = segment.image;
    });
  }, []);

  return (
    <main className="min-h-screen bg-cream-50 transition-fade">
      <Navbar />
        
        {/* Cinematic Hero Section */}
        <ScrollSection
          id="hero"
          backgroundImage="https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=2000&q=80"
          overlayColor="rgba(46, 59, 41, 0.7)"
          className="min-h-screen w-full"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center pt-48">
            <div className="text-center space-y-8 max-w-6xl px-6">
              <MagneticTitle 
                text="The Lasmari Experience"
                className="font-playfair text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-cream-50 leading-tight mb-12"
              />
              <div className="space-y-6">
                <p className="text-2xl lg:text-3xl xl:text-4xl text-cream-100 font-inter leading-relaxed font-light max-w-4xl mx-auto">
                  A comprehensive journey through five generations of Corfiot winemaking heritage
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-4xl font-playfair font-bold text-pink-400">3</div>
                    <div className="text-cream-200 font-inter">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-playfair font-bold text-pink-400">4</div>
                    <div className="text-cream-200 font-inter">Segments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-playfair font-bold text-pink-400">2-8</div>
                    <div className="text-cream-200 font-inter">Guests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-playfair font-bold text-pink-400">€95</div>
                    <div className="text-cream-200 font-inter">Per Person</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Segment 1: Historic Winemaking Discovery */}
        <ScrollSection
          id="segment-1"
          backgroundImage={experienceSegments[0].image}
          overlayColor="rgba(46, 59, 41, 0.8)"
          className="min-h-screen w-full flex items-center justify-center"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-7xl px-6 w-full">
              <div className="text-center mb-8">
                <div className="text-pink-400 text-xl font-inter font-medium">
                  Segment 1 • {experienceSegments[0].duration}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left side - Title */}
                <div className="text-left">
                  <MagneticTitle 
                    text={experienceSegments[0].title}
                    className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream-50 leading-tight"
                  />
                </div>
                
                {/* Right side - Description */}
                <div className="text-left">
                  <p className="text-xl lg:text-2xl text-cream-100 font-inter leading-relaxed font-light">
                    {experienceSegments[0].description}
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 pb-16 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {experienceSegments[0].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group bg-cream-50/10 border border-cream-50/20 p-6 rounded-xl backdrop-blur-sm transform-gpu will-change-transform hover:bg-cream-50/20 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-cream-200 font-inter text-base flex-1">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* Segment 2: Wine Tasting & Terroir Experience */}
        <ScrollSection
          id="segment-2"
          backgroundImage={experienceSegments[1].image}
          overlayColor="rgba(46, 59, 41, 0.8)"
          className="min-h-screen w-full flex items-center justify-center"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-7xl px-6 w-full">
              <div className="text-center mb-8">
                <div className="text-pink-400 text-xl font-inter font-medium">
                  Segment 2 • {experienceSegments[1].duration}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left side - Title */}
                <div className="text-left">
                  <MagneticTitle 
                    text={experienceSegments[1].title}
                    className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream-50 leading-tight"
                  />
                </div>
                
                {/* Right side - Description */}
                <div className="text-left">
                  <p className="text-xl lg:text-2xl text-cream-100 font-inter leading-relaxed font-light">
                    {experienceSegments[1].description}
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 pb-16 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {experienceSegments[1].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group bg-cream-50/10 border border-cream-50/20 p-6 rounded-xl backdrop-blur-sm transform-gpu will-change-transform hover:bg-cream-50/20 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-cream-200 font-inter text-base flex-1">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* Segment 3: Authentic Corfiot Culinary Journey */}
        <ScrollSection
          id="segment-3"
          backgroundImage={experienceSegments[2].image}
          overlayColor="rgba(46, 59, 41, 0.8)"
          className="min-h-screen w-full flex items-center justify-center"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-7xl px-6 w-full">
              <div className="text-center mb-8">
                <div className="text-pink-400 text-xl font-inter font-medium">
                  Segment 3 • {experienceSegments[2].duration}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left side - Title */}
                <div className="text-left">
                  <MagneticTitle 
                    text={experienceSegments[2].title}
                    className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream-50 leading-tight"
                  />
                </div>
                
                {/* Right side - Description */}
                <div className="text-left">
                  <p className="text-xl lg:text-2xl text-cream-100 font-inter leading-relaxed font-light">
                    {experienceSegments[2].description}
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 pb-16 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {experienceSegments[2].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group bg-cream-50/10 border border-cream-50/20 p-6 rounded-xl backdrop-blur-sm transform-gpu will-change-transform hover:bg-cream-50/20 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-cream-200 font-inter text-base flex-1">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* Segment 4: Estate Grounds & Heritage Tour */}
        <ScrollSection
          id="segment-4"
          backgroundImage={experienceSegments[3].image}
          overlayColor="rgba(46, 59, 41, 0.8)"
          className="min-h-screen w-full flex items-center justify-center"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-7xl px-6 w-full">
              <div className="text-center mb-8">
                <div className="text-pink-400 text-xl font-inter font-medium">
                  Segment 4 • {experienceSegments[3].duration}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left side - Title */}
                <div className="text-left">
                  <MagneticTitle 
                    text={experienceSegments[3].title}
                    className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream-50 leading-tight"
                  />
                </div>
                
                {/* Right side - Description */}
                <div className="text-left">
                  <p className="text-xl lg:text-2xl text-cream-100 font-inter leading-relaxed font-light">
                    {experienceSegments[3].description}
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 pb-16 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {experienceSegments[3].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group bg-cream-50/10 border border-cream-50/20 p-6 rounded-xl backdrop-blur-sm transform-gpu will-change-transform hover:bg-cream-50/20 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-cream-200 font-inter text-base flex-1">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* What's Included */}
        <ScrollSection
          id="included"
          backgroundImage="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=2000&q=80"
          overlayColor="rgba(46, 59, 41, 0.8)"
          className="min-h-screen w-full"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-16 max-w-7xl px-6">
              <div className="space-y-6">
                <MagneticTitle 
                  text="Complete Experience Includes"
                  className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-cream-50 leading-tight"
                />
                <p className="text-xl lg:text-2xl text-cream-100 font-inter leading-relaxed font-light max-w-4xl mx-auto">
                  Everything you need for an unforgettable journey through our family&apos;s winemaking heritage
                </p>
              </div>
              
              {/* Elegant inclusion features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pb-16">
                {[
                  { title: "Premium Tastings", desc: "Five carefully selected wines representing our estate&apos;s finest expressions" },
                  { title: "Authentic Bites", desc: "Traditional Corfiot appetizers and specialties prepared from family recipes" },
                  { title: "Historic Tours", desc: "Guided exploration of original cellars and traditional winemaking areas" },
                  { title: "Estate Walk", desc: "Peaceful stroll through our vineyards with terroir and farming explanations" },
                  { title: "Family Stories", desc: "Personal narratives and insights from five generations of winemakers" },
                  { title: "Take-Home", desc: "Complimentary bottle from our current vintage to remember your visit" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group bg-cream-50/10 border border-cream-50/20 p-8 rounded-xl backdrop-blur-sm transform-gpu will-change-transform hover:bg-cream-50/20 transition-all duration-300"
                    whileHover={{ scale: 1.01, y: -1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mt-3 group-hover:scale-125 transition-transform duration-300"></div>
                      <div className="flex-1">
                        <h3 className="font-playfair text-xl md:text-2xl font-bold text-cream-50 mb-3 group-hover:text-pink-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-cream-200 font-inter text-base leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Booking Section */}
        <ScrollSection
          id="booking"
          backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80"
          overlayColor="rgba(46, 59, 41, 0.8)"
          className="min-h-screen w-full"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-12 max-w-4xl px-6">
              <div className="space-y-6">
                <MagneticTitle 
                  text="Reserve Your Experience"
                  className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-cream-50 leading-tight"
                />
                <p className="text-xl lg:text-2xl text-cream-100 font-inter leading-relaxed font-light">
                  Limited to small groups for an intimate and personalized experience
                </p>
              </div>

              <div className="bg-cream-50/10 border border-cream-50/20 p-12 rounded-3xl transform-gpu" style={{ backdropFilter: 'blur(8px)' }}>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-playfair font-bold text-pink-400 mb-2">€95</div>
                      <div className="text-cream-200 font-inter">Per Person</div>
                    </div>
                    <div>
                      <div className="text-3xl font-playfair font-bold text-pink-400 mb-2">3 Hours</div>
                      <div className="text-cream-200 font-inter">Full Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-playfair font-bold text-pink-400 mb-2">2-8</div>
                      <div className="text-cream-200 font-inter">Guests Maximum</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-playfair text-2xl font-bold text-cream-50">Available Times</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-cream-50/10 p-4 rounded-xl">
                        <div className="font-inter font-semibold text-cream-50">Morning Experience</div>
                        <div className="text-cream-200 text-sm">10:00 AM - 1:00 PM</div>
                      </div>
                      <div className="bg-cream-50/10 p-4 rounded-xl">
                        <div className="font-inter font-semibold text-cream-50">Afternoon Experience</div>
                        <div className="text-cream-200 text-sm">3:00 PM - 6:00 PM</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const contactElement = document.getElementById('contact');
                      if (contactElement) {
                        const lenis = (window as unknown as { lenis?: { scrollTo: (element: Element, options: { duration: number; easing: (t: number) => number }) => void } }).lenis;
                        if (lenis && typeof lenis.scrollTo === 'function') {
                          // Use Lenis smooth scroll if available
                          lenis.scrollTo(contactElement, {
                            duration: 1.5,
                            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                          });
                        } else {
                          // Fallback to native scroll
                          contactElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold px-12 py-4 text-lg rounded-xl transition-colors duration-200 cursor-pointer"
                  >
                    Reserve Your Spot
                  </button>
                  
                  <p className="text-cream-200 text-sm">
                    Contact us to check availability and make your reservation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Contact Section */}
        <ContactSection />

        <Footer />
    </main>
  );
}