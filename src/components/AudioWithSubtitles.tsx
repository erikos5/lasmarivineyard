'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Languages } from 'lucide-react';

interface SubtitleTrack {
  language: 'en' | 'gr';
  label: string;
  src: string; // WebVTT file path
}

interface AudioWithSubtitlesProps {
  id: string;
  audioSrc?: string; // Optional: if not provided, shows placeholder
  subtitles?: SubtitleTrack[];
  autoPlay?: boolean;
  className?: string;
  showWaveform?: boolean;
}

const AudioWithSubtitles = ({ 
  id, 
  audioSrc, 
  subtitles = [], 
  autoPlay = false, 
  className = '',
  showWaveform = true
}: AudioWithSubtitlesProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'gr'>('en');
  const [showControls, setShowControls] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Placeholder mode when no audio source provided
  const isPlaceholder = !audioSrc;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isPlaceholder) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audioSrc, isPlaceholder]);

  const togglePlay = () => {
    if (isPlaceholder) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isPlaceholder) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPlaceholder || !progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Optimized waveform animation with reduced bars and simpler animation
  const WaveformVisualizer = () => (
    <div className="flex items-center justify-center space-x-1 h-12">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-cream-50/60 rounded-full transform-gpu"
          style={{ width: '2px', willChange: 'height' }}
          animate={{
            height: isPlaying && !isPlaceholder ? 
              [8, 12 + (i % 3) * 8, 8] : 8,
          }}
          transition={{
            duration: 0.8 + (i % 3) * 0.2,
            repeat: isPlaying && !isPlaceholder ? Infinity : 0,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );

  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Audio Element */}
      {!isPlaceholder && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          {subtitles.map((track) => (
            <track
              key={track.language}
              kind="subtitles"
              src={track.src}
              srcLang={track.language}
              label={track.label}
              default={track.language === selectedLanguage}
            />
          ))}
        </audio>
      )}

      {/* Main Audio Container */}
      <div className="relative bg-evergreen-800/90 backdrop-blur-cinematic rounded-2xl p-6 border border-evergreen-700/50">
        {/* Placeholder Badge */}
        {isPlaceholder && (
          <div className="absolute top-4 right-4 bg-pink-500/20 text-pink-100 px-3 py-1 rounded-full text-xs font-medium">
            Audio Placeholder
          </div>
        )}

        {/* Waveform Visualizer */}
        {showWaveform && (
          <div className="mb-4">
            <WaveformVisualizer />
          </div>
        )}

        {/* Subtitle Display */}
        <AnimatePresence>
          {(currentSubtitle || isPlaceholder) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-4 text-center"
            >
              <p className="text-cream-50 font-inter leading-relaxed">
                {isPlaceholder 
                  ? "\"Surrounded by vineyards, in the heart of our estate in Corfu, lies our ancient hamlet...\" - Voice narration will play here"
                  : currentSubtitle
                }
              </p>
              {subtitles.length > 1 && (
                <div className="flex justify-center mt-2 space-x-2">
                  {subtitles.map((track) => (
                    <button
                      key={track.language}
                      onClick={() => setSelectedLanguage(track.language)}
                      className={`px-2 py-1 rounded text-xs ${
                        selectedLanguage === track.language
                          ? 'bg-cream-50 text-evergreen-800'
                          : 'text-cream-200 hover:text-cream-50'
                      }`}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="mb-4">
          <div
            ref={progressRef}
            className="h-2 bg-evergreen-700 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
          >
            <motion.div
              className="h-full bg-cream-50 rounded-full group-hover:bg-pink-200 transition-colors"
              style={{ 
                width: isPlaceholder ? '35%' : `${duration ? (currentTime / duration) * 100 : 0}%` 
              }}
              whileHover={{ scaleY: 1.2 }}
            />
          </div>
          <div className="flex justify-between text-xs text-cream-200 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 180)}</span> {/* Mock 3min for placeholder */}
          </div>
        </div>

        {/* Controls */}
        <AnimatePresence>
          {(showControls || isPlaceholder) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                {/* Play/Pause Button */}
                <motion.button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-cream-50 text-evergreen-800 rounded-full flex items-center justify-center hover:bg-pink-100 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPlaceholder}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={toggleMute}
                    className="text-cream-200 hover:text-cream-50 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    disabled={isPlaceholder}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </motion.button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 accent-cream-50"
                    disabled={isPlaceholder}
                  />
                </div>
              </div>

              {/* Language Selector */}
              {subtitles.length > 1 && (
                <motion.button
                  className="text-cream-200 hover:text-cream-50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Languages size={18} />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio ID for reference */}
      <div className="text-xs text-evergreen-600 mt-2 opacity-50">
        Audio ID: {id}
      </div>
    </motion.div>
  );
};

export default AudioWithSubtitles;