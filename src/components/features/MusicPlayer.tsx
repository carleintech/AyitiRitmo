'use client';

import React from 'react';
import { useMusic } from '@/context/MusicContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart,
  Shuffle,
  Repeat1,
  Repeat,
  Volume2,
  VolumeX,
  ListMusic,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    repeat,
    queue,
    play,
    pause,
    nextSong,
    previousSong,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = useMusic();

  if (!currentSong) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-haitian-red to-haitian-blue text-white p-4 border-t border-white/10">
      <div className="container mx-auto">
        {/* Now Playing Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {currentSong.coverUrl && (
              <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                <Image
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-medium">{currentSong.title}</h3>
              <p className="text-sm text-white/70">{currentSong.artist}</p>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="hidden md:flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={toggleShuffle}
              className={cn(
                "text-white",
                shuffle && "text-haitian-gold"
              )}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={toggleRepeat}
              className={cn(
                "text-white",
                repeat !== 'none' && "text-haitian-gold"
              )}
            >
              {repeat === 'one' ? (
                <Repeat1 className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
            </Button>
            <Button size="icon" variant="ghost" className="text-white">
              <ListMusic className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs text-white/70 w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1"
          />
          <span className="text-xs text-white/70 w-12">
            {formatTime(duration)}
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between">
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-white">
              {volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24 hidden md:block"
            />
          </div>

          {/* Main Playback Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={previousSong}
              disabled={queue.length === 0}
              className="text-white"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              onClick={togglePlayPause}
              className="h-10 w-10 bg-white text-haitian-blue hover:bg-white/90"
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
              onClick={nextSong}
              disabled={queue.length === 0}
              className="text-white"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-white hidden md:block">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}