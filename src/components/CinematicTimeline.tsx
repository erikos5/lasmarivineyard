'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  quote?: string;
  image: string;
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

  // Simple intersection observer for active index
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('timeline-visible');
            const index = parseInt(element.getAttribute('data-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      { 
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
      }
    );

    events.forEach((_, index) => {
      const element = document.querySelector(`.timeline-event-${index}`);
      if (element) {
        element.setAttribute('data-index', index.toString());
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [events]);


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
              <div
                key={event.year}
                className={`timeline-event timeline-event-${index} relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } group opacity-0 translate-y-10`}
                style={{ zIndex: 20 }}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-cream-50 z-30 transition-all duration-500 ${
                    activeIndex >= index 
                      ? 'bg-pink-400 scale-125 shadow-2xl shadow-pink-400/50' 
                      : 'bg-evergreen-600 scale-100'
                  } hover:scale-125`}
                />

                {/* Content Container */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                  {/* Year Badge */}
                  <div
                    className={`inline-block bg-evergreen-800 text-cream-50 px-8 py-3 rounded-full font-playfair font-bold text-2xl mb-6 shadow-lg ${
                      index % 2 === 0 ? 'float-right' : 'float-left'
                    } hover:scale-110 hover:bg-evergreen-700 hover:shadow-2xl transition-all duration-300`}
                  >
                    {event.year}
                  </div>

                  <div className="clear-both">
                    {/* Image */}
                    <div
                      className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl hover:scale-105 transition-all duration-500"
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
                    </div>

                    {/* Title */}
                    <h3
                      className="font-playfair text-4xl lg:text-5xl font-bold text-evergreen-800 mb-6 leading-tight hover:scale-105 transition-transform duration-200"
                    >
                      {event.title}
                    </h3>

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
                        viewport={{ once: true }}
                      >
                        <p className="text-evergreen-800 font-cormorant text-2xl italic leading-relaxed">
                          "{event.quote}"
                        </p>
                      </motion.blockquote>
                    )}
                  </div>
                </div>

                {/* Decorative element for visual balance */}
                <div className={`w-6/12 ${index % 2 === 0 ? 'pl-40' : 'pr-40'}`}>
                  <div className="w-full h-32 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-evergreen-200/30 to-pink-200/30 backdrop-blur-sm border border-evergreen-200/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-evergreen-400 to-pink-400"></div>
                    </div>
                  </div>
                </div>
              </div>
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