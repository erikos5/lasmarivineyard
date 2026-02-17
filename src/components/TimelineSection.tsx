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
  imagePosition?: string;
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

  // Disabled GSAP to prevent scrolling lag - using pure CSS animations instead
  useEffect(() => {
    // Simple scroll detection without GSAP for better performance
    const handleScroll = () => {
      if (typeof window === 'undefined' || !timelineRef.current) return;
      
      const elements = Array.from(timelineRef.current.children);
      elements.forEach((element, index) => {
        if (index === 0) return; // Skip progress line
        
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
        
        if (isVisible) {
          setActiveEventIndex(index - 1); // -1 because first element is progress line
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [events]);

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Vertical Progress Line - Behind everything */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-evergreen-200/30 z-0">
        <motion.div
          ref={progressLineRef}
          className="w-full bg-gradient-to-b from-cream-50 via-pink-200 to-evergreen-600 z-0"
          style={{ height: progressHeight }}
        />
      </div>

      {/* Timeline Events */}
      {events.map((event, index) => (
        <div
          key={event.year}
          className={`relative mb-32 opacity-0 animate-in z-20 ${
            index % 2 === 0 ? 'pr-1/2 text-right' : 'pl-1/2 text-left'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Timeline Dot */}
          <div
            className={`absolute top-8 w-6 h-6 rounded-full border-4 border-cream-50 z-10 transition-all duration-300 ${
              index % 2 === 0 ? '-right-3' : '-left-3'
            } ${
              activeEventIndex === index 
                ? 'bg-pink-400 animate-timeline-pulse' 
                : 'bg-evergreen-600'
            }`}
            style={{ top: '2rem', transform: 'translateY(-50%)' }}
          />

          {/* Content Container */}
          <div className={`relative z-30 ${
            index % 2 === 0 ? 'pr-12' : 'pl-12'
          }`}>
            {/* Year Badge */}
            <div
              className={`inline-block bg-evergreen-800 text-cream-50 px-6 py-2 rounded-full font-playfair font-bold text-xl mb-4 transition-all duration-200 hover:scale-105 hover:bg-evergreen-700 ${
                index % 2 === 0 ? 'float-right' : 'float-left'
              }`}
            >
              {event.year}
            </div>

            <div className="clear-both">
              {/* Image */}
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={event.image}
                  alt={`${event.title} - ${event.year}`}
                  className={`w-full h-64 object-cover ${event.imagePosition || ''}`}
                />
                <div className="absolute inset-0 bg-cinematic-gradient opacity-20" />
              </div>

              {/* Title */}
              <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-evergreen-800 mb-4 leading-tight transition-transform duration-200 hover:scale-[1.02]">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-evergreen-700 font-inter leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Quote */}
              {event.quote && (
                <blockquote className="border-l-4 border-pink-300 pl-6 py-4 bg-pink-50/50 rounded-r-lg mb-6">
                  <p className="text-evergreen-800 font-cormorant text-xl italic leading-relaxed">
                    &quot;{event.quote}&quot;
                  </p>
                </blockquote>
              )}

              {/* Simplified Audio Placeholder - Heavy AudioWithSubtitles components removed for performance */}
              {event.audioId && (
                <div className="mb-6">
                  <div className="bg-evergreen-50 border border-evergreen-200 rounded-lg p-4 max-w-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-evergreen-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-cream-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-inter text-evergreen-700 font-medium">Audio Story</p>
                        <p className="text-xs text-evergreen-600">Click to hear our heritage</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Timeline End Marker */}
      <div className="relative text-center py-12 z-20">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-400 rounded-full border-4 border-cream-50 animate-timeline-pulse z-10" />
        <div className="pt-12">
          <h3 className="font-playfair text-2xl font-bold text-evergreen-800 mb-2">
            The Story Continues...
          </h3>
          <p className="text-evergreen-600 font-inter">
            Today and into the future
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;