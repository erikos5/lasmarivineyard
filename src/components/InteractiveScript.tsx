'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, LanguageIcon } from '@heroicons/react/24/outline';

interface ScriptSegment {
  english: string;
  greek: string;
}

interface InteractiveScriptProps {
  title: string;
  description: string;
  segments: ScriptSegment[];
  className?: string;
}

const InteractiveScript = ({ title, description, segments, className = '' }: InteractiveScriptProps) => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'gr'>('en');

  const nextSegment = () => {
    if (currentSegment < segments.length - 1) {
      setCurrentSegment(currentSegment + 1);
    }
  };

  const prevSegment = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'gr' : 'en');
  };

  const currentText = currentLanguage === 'en' 
    ? segments[currentSegment]?.english 
    : segments[currentSegment]?.greek;

  return (
    <div className={`bg-evergreen-50/90 backdrop-blur-sm border border-evergreen-200/30 rounded-2xl p-8 text-center ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-playfair text-2xl md:text-3xl text-evergreen-800 mb-2">
          {title}
        </h3>
        <p className="text-evergreen-600 font-inter text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center space-x-2 mb-6">
        {segments.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSegment 
                ? 'bg-pink-500 w-8' 
                : index < currentSegment 
                  ? 'bg-pink-300' 
                  : 'bg-evergreen-200'
            }`}
          />
        ))}
      </div>

      {/* Script Content */}
      <div className="min-h-[120px] md:min-h-[150px] flex items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSegment}-${currentLanguage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="text-evergreen-700 font-inter text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              {currentText}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={prevSegment}
          disabled={currentSegment === 0}
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
            currentSegment === 0
              ? 'border-evergreen-200 text-evergreen-300 cursor-not-allowed'
              : 'border-evergreen-400 text-evergreen-600 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50'
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* Center Controls */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-evergreen-400 text-evergreen-600 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200"
          >
            <LanguageIcon className="w-5 h-5" />
            <span className="font-inter text-sm font-medium">
              {currentLanguage === 'en' ? 'EL' : 'EN'}
            </span>
          </button>

          {/* Segment Counter */}
          <div className="px-3 py-1 bg-evergreen-100 rounded-full">
            <span className="text-evergreen-600 font-inter text-sm font-medium">
              {currentSegment + 1} / {segments.length}
            </span>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSegment}
          disabled={currentSegment === segments.length - 1}
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
            currentSegment === segments.length - 1
              ? 'border-evergreen-200 text-evergreen-300 cursor-not-allowed'
              : 'border-evergreen-400 text-evergreen-600 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50'
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="mt-4 text-xs text-evergreen-500 font-inter">
        Use ← → arrow keys to navigate
      </div>
    </div>
  );
};

export default InteractiveScript;
