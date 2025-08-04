'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AudioWithSubtitles from './AudioWithSubtitles';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
  audioId?: string;
  quote?: string;
  isActive?: boolean;
}

interface TimelineSectionProps {
  events: TimelineEvent[];
  className?: string;
}

const TimelineSection = ({ events, className = '' }: TimelineSectionProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });
  
  // Progress line animation
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Timeline events scroll trigger
      events.forEach((_, index) => {
        const eventElement = timelineRef.current?.children[index + 1]; // +1 for progress line
        
        if (eventElement) {
          ScrollTrigger.create({
            trigger: eventElement,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveEventIndex(index),
            onEnterBack: () => setActiveEventIndex(index),
          });
        }
      });
    });
    
    return () => ctx.revert();
  }, [events]);

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Vertical Progress Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-evergreen-200/30">
        <motion.div
          ref={progressLineRef}
          className="w-full bg-gradient-to-b from-cream-50 via-pink-200 to-evergreen-600"
          style={{ height: progressHeight }}
        />
      </div>

      {/* Timeline Events */}
      {events.map((event, index) => (
        <motion.div
          key={event.year}
          className={`relative mb-32 ${
            index % 2 === 0 ? 'pr-1/2 text-right' : 'pl-1/2 text-left'
          }`}
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1] 
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline Dot */}
          <motion.div
            className={`absolute top-8 w-6 h-6 rounded-full border-4 border-cream-50 z-10 ${
              index % 2 === 0 ? '-right-3' : '-left-3'
            } ${
              activeEventIndex === index 
                ? 'bg-pink-400 animate-timeline-pulse' 
                : 'bg-evergreen-600'
            }`}
            whileHover={{ scale: 1.2 }}
            style={{ top: '2rem', transform: 'translateY(-50%)' }}
          />

          {/* Content Container */}
          <div className={`${
            index % 2 === 0 ? 'pr-12' : 'pl-12'
          }`}>
            {/* Year Badge */}
            <motion.div
              className={`inline-block bg-evergreen-800 text-cream-50 px-6 py-2 rounded-full font-playfair font-bold text-xl mb-4 ${
                index % 2 === 0 ? 'float-right' : 'float-left'
              }`}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#334a37',
                transition: { duration: 0.2 }
              }}
            >
              {event.year}
            </motion.div>

            <div className="clear-both">
              {/* Image */}
              <motion.div
                className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={event.image}
                  alt={`${event.title} - ${event.year}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-cinematic-gradient opacity-20" />
              </motion.div>

              {/* Title */}
              <motion.h3
                className="font-playfair text-3xl lg:text-4xl font-bold text-evergreen-800 mb-4 leading-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {event.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-lg text-evergreen-700 font-inter leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {event.description}
              </motion.p>

              {/* Quote */}
              {event.quote && (
                <motion.blockquote
                  className="border-l-4 border-pink-300 pl-6 py-4 bg-pink-50/50 rounded-r-lg mb-6"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-evergreen-800 font-cormorant text-xl italic leading-relaxed">
                    "{event.quote}"
                  </p>
                </motion.blockquote>
              )}

              {/* Audio Component */}
              {event.audioId && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <AudioWithSubtitles
                    id={event.audioId}
                    className="max-w-md"
                    showWaveform={true}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Timeline End Marker */}
      <motion.div
        className="relative text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-400 rounded-full border-4 border-cream-50 animate-timeline-pulse" />
        <div className="pt-12">
          <h3 className="font-playfair text-2xl font-bold text-evergreen-800 mb-2">
            The Story Continues...
          </h3>
          <p className="text-evergreen-600 font-inter">
            Today and into the future
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineSection;