'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Heart,
  Shuffle,
  Repeat
} from 'lucide-react';
import { useMusic } from '@/context/MusicContext';
import Image from 'next/image';

interface MiniMusicPlayerProps {
  className?: string;
  onExpand?: () => void;
}

const MiniMusicPlayer: React.FC<MiniMusicPlayerProps> = ({ className = '', onExpand }) => {
  const { currentSong, isPlaying, togglePlayPause, next, previous } = useMusic();
  const [showPlayer, setShowPlayer] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const hideTimeout = useRef<NodeJS.Timeout>();

  // Auto-hide functionality
  useEffect(() => {
    const handleMouseMove = () => {
      setShowPlayer(true);
      
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      
      hideTimeout.current = setTimeout(() => {
        if (!hovered) {
          setShowPlayer(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [hovered]);

  // Mock progress update - replace with real audio progress
  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) return 0;
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong, duration]);

  // Set duration when song changes
  useEffect(() => {
    if (currentSong) {
      setDuration(currentSong.duration);
      setProgress(0);
    }
  }, [currentSong]);

  if (!currentSong) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {showPlayer && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed bottom-0 left-0 right-0 z-40 ${className}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-t border-white/10">
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10 cursor-pointer">
              <div 
                className="h-full bg-haiti-red transition-all duration-300"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>

            <div className="px-4 py-2 flex items-center justify-between">
              {/* Song Info */}
              <div className="flex items-center gap-3 min-w-[200px] w-1/3">
                <div className="relative w-14 h-14 rounded overflow-hidden">
                  <Image
                    src={currentSong.coverArt}
                    alt={currentSong.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-medium text-sm truncate">
                    {currentSong.title}
                  </h4>
                  <p className="text-white/60 text-xs truncate">
                    {currentSong.artist.artistName}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white/60 hover:text-haiti-red"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2 w-1/3 justify-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={previous}
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  size="icon"
                  className="h-10 w-10 bg-white text-black hover:bg-white/90"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? 
                    <Pause className="h-5 w-5" /> : 
                    <Play className="h-5 w-5 ml-0.5" />
                  }
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={next}
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center gap-3 w-1/3 justify-end">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-8 w-8 text-white/60 hover:text-white"
                  >
                    {isMuted ? 
                      <VolumeX className="h-4 w-4" /> : 
                      <Volume2 className="h-4 w-4" />
                    }
                  </Button>
                  <div className="w-24">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        setVolume(value[0]);
                        setIsMuted(false);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="text-xs text-white/60 w-20 text-right">
                  {formatTime(progress)} / {formatTime(duration)}
                </div>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onExpand}
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniMusicPlayer;