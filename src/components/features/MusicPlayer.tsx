'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  ListMusic,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Image from 'next/image';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  audioUrl: string;
}

interface MusicPlayerProps {
  currentSong?: Song;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

const defaultSong: Song = {
  id: '1',
  title: 'Konpa Magic',
  artist: 'Haitian Artist',
  album: 'Haiti Sounds',
  duration: 245, // in seconds
  coverArt: '/api/placeholder/300/300',
  audioUrl: '/sounds/sample-song.mp3',
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong = defaultSong,
  isPlaying = false,
  onPlayPause,
  onNext,
  onPrevious,
  className = '',
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    const time = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const toggleRepeat = () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
    >
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />

      <Card className={`bg-slate-900/95 backdrop-blur-md border-white/10 rounded-none ${
        isExpanded ? 'h-screen' : 'h-24'
      } transition-all duration-300`}>
        {isExpanded ? (
          // Expanded Player
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-white font-medium">Now Playing</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                className="text-white/60 hover:text-white"
              >
                <Minimize2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
              {/* Album Art */}
              <div className="w-80 h-80 mb-8 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={currentSong.coverArt}
                  alt={currentSong.title}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Song Info */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">{currentSong.title}</h1>
                <p className="text-lg text-white/60">{currentSong.artist}</p>
                <p className="text-sm text-white/40">{currentSong.album}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-2xl mb-8">
                <Slider
                  value={[currentTime]}
                  max={currentSong.duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-white/40">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-8">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`text-white/60 hover:text-white ${isShuffled ? 'text-haiti-red' : ''}`}
                >
                  <Shuffle className="h-5 w-5" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onPrevious}
                  className="text-white/60 hover:text-white"
                >
                  <SkipBack className="h-6 w-6" />
                </Button>
                
                <Button
                  size="icon"
                  className="w-16 h-16 bg-white text-black hover:bg-white/90"
                  onClick={onPlayPause}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onNext}
                  className="text-white/60 hover:text-white"
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleRepeat}
                  className={`text-white/60 hover:text-white ${repeatMode !== 'off' ? 'text-haiti-red' : ''}`}
                >
                  <Repeat className="h-5 w-5" />
                  {repeatMode === 'one' && <span className="absolute text-xs">1</span>}
                </Button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center gap-4 mt-8">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`text-white/60 hover:text-white ${isLiked ? 'text-haiti-red' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/60 hover:text-white"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/60 hover:text-white"
                >
                  <ListMusic className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Compact Player
          <div className="h-full flex items-center justify-between px-4">
            {/* Song Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-16 h-16 rounded bg-gradient-to-br from-haiti-red to-haiti-blue flex-shrink-0">
                <Image
                  src={currentSong.coverArt}
                  alt={currentSong.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-medium truncate">{currentSong.title}</h3>
                <p className="text-sm text-white/60 truncate">{currentSong.artist}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsLiked(!isLiked)}
                className={`hidden md:flex text-white/60 hover:text-white ${isLiked ? 'text-haiti-red' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={onPrevious}
                className="hidden md:flex text-white/60 hover:text-white"
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button
                size="icon"
                className="bg-white text-black hover:bg-white/90"
                onClick={onPlayPause}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={onNext}
                className="hidden md:flex text-white/60 hover:text-white"
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4 flex-1 min-w-0">
              <span className="text-xs text-white/40 w-10 text-right">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={currentSong.duration}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-white/40 w-10">{formatTime(currentSong.duration)}</span>
            </div>

            {/* Additional Controls */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                  className="text-white/60 hover:text-white"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                  className="w-24"
                />
              </div>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsExpanded(true)}
                className="text-white/60 hover:text-white"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default MusicPlayer;