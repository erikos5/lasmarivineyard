'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImmersiveAudioPlayer from './ImmersiveAudioPlayer';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  quote?: string;
  image: string;
  audioId?: string;
}

interface CinematicTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const CinematicTimeline = ({ events, className = '' }: CinematicTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothProgress = useSpring(progressHeight, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate timeline events on scroll
      events.forEach((_, index) => {
        const eventElement = `.timeline-event-${index}`;
        
        gsap.fromTo(eventElement, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: eventElement,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            }
          }
        );

        // Parallax effect for images
        gsap.fromTo(`${eventElement} .timeline-image`, 
          { 
            scale: 1.3,
            y: -50
          },
          {
            scale: 1,
            y: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: eventElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      });
    });
    
    return () => ctx.revert();
  }, [events]);

  // Sample subtitle data for timeline audio
  const timelineSubtitlesEn = [
    { start: 0, end: 10, text: "In 1892, our great-great-grandfather planted the first vines in the fertile soils of Corfu." },
    { start: 10, end: 20, text: "The land spoke to us, and we listened with reverence and determination." },
    { start: 20, end: 30, text: "During the 1930s, we expanded our vineyards and refined our traditional techniques." },
    { start: 30, end: 40, text: "Each generation added their wisdom while preserving the soul of our craft." }
  ];

  const timelineSubtitlesGr = [
    { start: 0, end: 10, text: "Το 1892, ο προ-προ-παππούς μας φύτεψε τα πρώτα κλήματα στα γόνιμα χώματα της Κέρκυρας." },
    { start: 10, end: 20, text: "Η γη μας μίλησε, και εμείς ακούσαμε με σεβασμό και αποφασιστικότητα." },
    { start: 20, end: 30, text: "Κατά τη δεκαετία του 1930, επεκτείναμε τους αμπελώνες και βελτιώσαμε τις παραδοσιακές τεχνικές." },
    { start: 30, end: 40, text: "Κάθε γενιά πρόσθεσε τη σοφία της διατηρώντας την ψυχή της τέχνης μας." }
  ];

  return (
    <div ref={containerRef} className={`relative min-h-screen ${className}`}>
      {/* Background with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-evergreen-50">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-evergreen-100 via-transparent to-pink-50" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="font-playfair text-5xl lg:text-7xl font-bold text-evergreen-800 mb-4 leading-tight">
            Our Journey Through Time
          </h2>
          <p className="text-xl lg:text-2xl text-evergreen-600 font-inter max-w-4xl mx-auto leading-relaxed">
            Every vintage tells a story. Every bottle carries the dreams, struggles, and triumphs of five generations dedicated to the art of winemaking.
          </p>
        </div>

        {/* Audio Player for Timeline Story */}
        <motion.div 
          className="max-w-4xl mx-auto mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <ImmersiveAudioPlayer
            audioSrc="/audio/recordings/section2-story.mp3"
            subtitlesEn={timelineSubtitlesEn}
            subtitlesGr={timelineSubtitlesGr}
            title="Our Family Legacy"
            description="Listen to the story of five generations"
            className="w-full"
          />
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-evergreen-200/30 z-0">
            <motion.div
              ref={progressRef}
              className="w-full bg-gradient-to-b from-pink-400 via-evergreen-600 to-evergreen-800 origin-top"
              style={{ height: smoothProgress }}
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-20">
            {events.map((event, index) => (
              <motion.div
                key={event.year}
                className={`timeline-event-${index} relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } group`}
                initial={{ opacity: 0 }}
                style={{ zIndex: 20 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-cream-50 z-30 transition-all duration-500 ${
                    activeIndex >= index 
                      ? 'bg-pink-400 scale-125 shadow-2xl shadow-pink-400/50' 
                      : 'bg-evergreen-600 scale-100'
                  }`}
                  whileHover={{ scale: 1.4 }}
                />

                {/* Content Container */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                  {/* Year Badge */}
                  <motion.div
                    className={`inline-block bg-evergreen-800 text-cream-50 px-8 py-3 rounded-full font-playfair font-bold text-2xl mb-6 shadow-lg ${
                      index % 2 === 0 ? 'float-right' : 'float-left'
                    }`}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: '#2e4d31',
                      boxShadow: '0 20px 40px rgba(46, 77, 49, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {event.year}
                  </motion.div>

                  <div className="clear-both">
                    {/* Image */}
                    <motion.div
                      className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-500"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="timeline-image relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={`${event.title} - ${event.year}`}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-evergreen-800/60 via-transparent to-transparent" />
                        
                        {/* Hover overlay */}
                        <motion.div
                          className="absolute inset-0 bg-evergreen-600/20 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="font-playfair text-4xl lg:text-5xl font-bold text-evergreen-800 mb-6 leading-tight"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {event.title}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-xl text-evergreen-700 font-inter leading-relaxed mb-8">
                      {event.description}
                    </p>

                    {/* Quote */}
                    {event.quote && (
                      <motion.blockquote
                        className="border-l-4 border-pink-400 pl-8 py-6 bg-pink-50/80 rounded-r-2xl backdrop-blur-sm"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                      >
                        <p className="text-evergreen-800 font-cormorant text-2xl italic leading-relaxed">
                          "{event.quote}"
                        </p>
                      </motion.blockquote>
                    )}
                  </div>
                </div>

                {/* Voice Recording Section in Empty Space */}
                <div className="w-5/12 flex items-center justify-center">
                  <motion.div
                    className={`bg-evergreen-50/70 backdrop-blur-sm rounded-2xl p-6 border border-evergreen-200/30 max-w-sm ${
                      index % 2 === 0 ? 'ml-8' : 'mr-8'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: false }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <h4 className="font-playfair text-lg font-bold text-evergreen-800 mb-2">
                        {index === 0 ? "Listen to Our Beginnings" : 
                         index === 1 ? "Traditional Stories" :
                         index === 2 ? "Golden Years Memories" : 
                         "Modern Heritage"}
                      </h4>
                      <p className="text-evergreen-700 font-inter text-sm italic mb-4">
                        {index === 0 ? "Hear about the stream and first settlements..." : 
                         index === 1 ? "Stories of the traditional pastitsada pan..." :
                         index === 2 ? "Memories from the magical harvest years..." : 
                         "Our family's vision for the future..."}
                      </p>
                      <button className="text-pink-600 hover:text-pink-700 font-semibold text-sm underline transition-colors duration-200">
                        Play Voice Recording
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline End */}
          <motion.div
            className="relative text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-pink-400 rounded-full border-6 border-cream-50 z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0 0 rgba(244, 114, 182, 0.4)',
                  '0 0 20px 10px rgba(244, 114, 182, 0.1)',
                  '0 0 0 0 rgba(244, 114, 182, 0.4)'
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="pt-16">
              <h3 className="font-playfair text-4xl font-bold text-evergreen-800 mb-4">
                The Story Continues...
              </h3>
              <p className="text-xl text-evergreen-600 font-inter">
                Today and into the future, our legacy grows with every vintage
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CinematicTimeline;