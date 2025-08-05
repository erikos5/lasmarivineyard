'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Languages } from 'lucide-react';

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

interface ImmersiveAudioPlayerProps {
  audioSrc: string;
  subtitlesEn: Subtitle[];
  subtitlesGr: Subtitle[];
  title: string;
  description?: string;
  className?: string;
}

const ImmersiveAudioPlayer = ({
  audioSrc,
  subtitlesEn,
  subtitlesGr,
  title,
  description,
  className = ''
}: ImmersiveAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'gr'>('en');
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');

  const currentSubtitles = currentLanguage === 'en' ? subtitlesEn : subtitlesGr;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Update current subtitle based on time
  useEffect(() => {
    const currentSub = currentSubtitles.find(
      sub => currentTime >= sub.start && currentTime <= sub.end
    );
    setCurrentSubtitle(currentSub?.text || '');
  }, [currentTime, currentSubtitles]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bg-evergreen-50/90 backdrop-blur-sm border border-evergreen-200 rounded-2xl p-6 ${className}`}>
      <audio ref={audioRef} src={audioSrc} />
      
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-bold text-evergreen-800 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-evergreen-600 font-inter text-sm">
            {description}
          </p>
        )}
      </div>

      {/* Subtitle Display */}
      <AnimatePresence mode="wait">
        {currentSubtitle && (
          <motion.div
            key={currentSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-evergreen-800/90 text-cream-50 p-4 rounded-lg mb-6 min-h-[80px] flex items-center justify-center text-center"
          >
            <p className="font-inter text-lg leading-relaxed">
              {currentSubtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-evergreen-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #334a37 0%, #334a37 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-evergreen-600 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-evergreen-600 hover:bg-evergreen-700 text-cream-50 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="text-evergreen-600 hover:text-evergreen-800">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume;
                }
                setIsMuted(newVolume === 0);
              }}
              className="w-20 h-1 bg-evergreen-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Language Toggle */}
        <button
          onClick={() => setCurrentLanguage(prev => prev === 'en' ? 'gr' : 'en')}
          className="flex items-center space-x-2 px-3 py-2 bg-evergreen-600 hover:bg-evergreen-700 text-cream-50 rounded-lg transition-colors duration-200"
        >
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">
            {currentLanguage === 'en' ? 'EN' : 'ΕΛ'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ImmersiveAudioPlayer;