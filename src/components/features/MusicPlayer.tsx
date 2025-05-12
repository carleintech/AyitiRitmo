// src/components/features/MusicPlayer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useMusic } from '@/context/MusicContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle,
  ListMusic,
  X,
  ChevronUp,
  ChevronDown,
  Heart,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const MusicPlayer = () => {
  const { 
    currentSong, 
    queue,
    isPlaying, 
    volume, 
    progress, 
    duration,
    isMuted,
    isRepeat,
    isShuffle,
    play, 
    pause, 
    nextSong, 
    previousSong,
    setVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    seekTo,
    removeFromQueue
  } = useMusic();
  
  const [minimized, setMinimized] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && currentSong) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newProgress = offsetX / rect.width;
      seekTo(Math.max(0, Math.min(1, newProgress)));
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const togglePlayerSize = () => {
    setMinimized(!minimized);
  };
  
  if (!currentSong) return null;
  
  const currentTime = progress * duration;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full bg-gradient-to-r from-haitian-blue-950 to-haitian-blue-900 text-white border-t border-haitian-blue-700 transition-all duration-300 ${
          minimized ? 'h-16' : 'h-24 md:h-20'
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          {/* Song info */}
          <div className="flex items-center space-x-3 w-1/4">
            <div className="relative w-12 h-12 shrink-0">
              {currentSong.coverUrl ? (
                <Image
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  fill
                  className="object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-haitian-red to-haitian-blue flex items-center justify-center rounded">
                  <Music className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            <div className={`overflow-hidden transition-all ${minimized ? 'hidden md:block' : ''}`}>
              <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
              <p className="text-xs text-white/70 truncate">{currentSong.artist}</p>
            </div>
          </div>
          
          {/* Player controls */}
          <div className="flex flex-col items-center justify-center flex-1 px-4">
            {/* Progress bar (only when not minimized) */}
            {!minimized && (
              <div className="w-full flex items-center space-x-2 mb-2">
                <span className="text-xs text-white/70">{formatTime(currentTime)}</span>
                <div 
                  ref={progressBarRef}
                  className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  onClick={handleProgressBarClick}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-haitian-red to-haitian-gold"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/70">{formatTime(duration)}</span>
              </div>
            )}
            
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <Button 
                size="icon"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 hidden md:flex"
                onClick={toggleShuffle}
              >
                <Shuffle className={`h-4 w-4 ${isShuffle ? 'text-haitian-gold' : ''}`} />
              </Button>
              
              <Button 
                size="icon"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={previousSong}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                size="icon"
                variant="default"
                className="bg-haitian-gold hover:bg-haitian-gold/90 text-black rounded-full w-10 h-10"
                onClick={isPlaying ? pause : play}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              
              <Button 
                size="icon"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={nextSong}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <Button 
                size="icon"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 hidden md:flex"
                onClick={toggleRepeat}
              >
                <Repeat className={`h-4 w-4 ${isRepeat ? 'text-haitian-gold' : ''}`} />
              </Button>
            </div>
          </div>
          
          {/* Volume and toggle controls */}
          <div className="flex items-center justify-end space-x-3 w-1/4">
            {/* Volume (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                size="icon"
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                min={0}
                max={100}
                step={1}
                className="w-24"
                onValueChange={(value) => setVolume(value[0] / 100)}
              />
            </div>
            
            {/* Queue button */}
            <Sheet open={isQueueOpen} onOpenChange={setIsQueueOpen}>
              <SheetTrigger asChild>
                <Button 
                  size="icon"
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 hidden md:flex"
                >
                  <ListMusic className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-haitian-blue-950 border-haitian-blue-900 text-white w-80">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Queue</h3>
                  <span className="text-xs text-white/70">{queue.length} songs</span>
                </div>
                
                <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
                  {queue.map((song, index) => (
                    <Card 
                      key={`${song.id}-${index}`} 
                      className={`flex items-center p-2 space-x-3 bg-haitian-blue-900/50 border-haitian-blue-800 ${
                        currentSong.id === song.id ? 'border-l-2 border-l-haitian-gold' : ''
                      }`}
                    >
                      <div className="w-10 h-10 relative shrink-0">
                        {song.coverUrl ? (
                          <Image
                            src={song.coverUrl}
                            alt={song.title}
                            fill
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-haitian-red to-haitian-blue flex items-center justify-center rounded">
                            <Music className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{song.title}</p>
                        <p className="text-xs text-white/70 truncate">{song.artist}</p>
                      </div>
                      
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                        onClick={() => removeFromQueue(song.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Minimize/expand toggle */}
            <Button 
              size="icon"
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={togglePlayerSize}
            >
              {minimized ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};