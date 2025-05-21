"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  Volume1, 
  VolumeX, 
  ListMusic, 
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic, Track } from "@/lib/music-context";
import { formatDuration } from "@/lib/utils";

export default function MusicPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    progress, 
    currentTime, 
    duration, 
    queue,
    togglePlay, 
    setVolume, 
    seek, 
    nextTrack, 
    previousTrack, 
    playTrack,
    removeFromQueue
  } = useMusic();
  
  const [showQueue, setShowQueue] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Handle progress bar click to seek
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newProgress = (offsetX / rect.width) * 100;
      seek(newProgress);
    }
  };
  
  // Handle volume icons based on volume level
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };
  
  // Toggle repeat mode in cycle: none -> all -> one -> none
  const handleRepeat = () => {
    if (repeatMode === 'none') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('none');
  };
  
  // Update document title with current track
  useEffect(() => {
    if (currentTrack) {
      document.title = `${currentTrack.title} - ${currentTrack.artist} | AyitiRitmo`;
    } else {
      document.title = "AyitiRitmo - Haitian Music Platform";
    }
  }, [currentTrack]);
  
  // If no track is playing yet, show a minimal player
  if (!currentTrack) {
    return (
      <div className="h-20 bg-black/50 backdrop-blur-md border-t border-white/10 text-white flex items-center justify-center">
        <p className="text-white/70">Select a track to start playing</p>
      </div>
    );
  }
  
  return (
    <div className="h-20 bg-black/50 backdrop-blur-md border-t border-white/10 text-white flex items-center px-4 relative">
      <div className="w-1/4 flex items-center">
        <div className="h-12 w-12 bg-haiti-gold/20 rounded-md mr-3 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-haiti-blue to-haiti-red flex items-center justify-center">
            <span className="text-white text-xs">{currentTrack.artist.charAt(0)}</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-white text-sm font-semibold">{currentTrack.title}</h4>
          <p className="text-white/70 text-xs">{currentTrack.artist}</p>
        </div>
      </div>
      
      <div className="w-2/4 flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-2">
          <button 
            className={`text-white/70 hover:text-white ${isShuffle ? 'text-haiti-gold' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <Shuffle className="h-4 w-4" />
          </button>
          
          <button 
            className="text-white/70 hover:text-white"
            onClick={previousTrack}
          >
            <SkipBack className="h-5 w-5" />
          </button>
          
          <motion.button
            className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-haiti-blue"
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </motion.button>
          
          <button 
            className="text-white/70 hover:text-white"
            onClick={nextTrack}
          >
            <SkipForward className="h-5 w-5" />
          </button>
          
          <button 
            className={`text-white/70 hover:text-white ${repeatMode !== 'none' ? 'text-haiti-gold' : ''}`}
            onClick={handleRepeat}
          >
            <Repeat className="h-4 w-4" />
            {repeatMode === 'one' && <span className="absolute text-[8px] top-1 ml-1.5">1</span>}
          </button>
        </div>
        
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-white/70">{formatDuration(currentTime)}</span>
          
          <div 
            className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer group"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            {/* Track progress */}
            <div 
              className="h-full bg-haiti-gold rounded-full"
              style={{ width: `${progress}%` }}
            />
            
            {/* Hover effect */}
            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100">
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full -ml-1.5 hidden group-hover:block"
                style={{ left: `${progress}%` }}
              />
            </div>
          </div>
          
          <span className="text-xs text-white/70">{formatDuration(duration)}</span>
        </div>
      </div>
      
      <div className="w-1/4 flex items-center justify-end space-x-4">
        <div className="flex items-center space-x-2">
          <button className="text-white/70 hover:text-white" onClick={() => setVolume(0)}>
            <VolumeIcon />
          </button>
          
          <div className="relative w-20 h-2 bg-white/20 rounded-full group">
            <div 
              className="h-full bg-white/60 rounded-full" 
              style={{ width: `${volume * 100}%` }}
            />
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        
        <button 
          className={`text-white/70 hover:text-white ${showQueue ? 'text-haiti-gold' : ''}`}
          onClick={() => setShowQueue(!showQueue)}
        >
          <ListMusic className="h-5 w-5" />
        </button>
      </div>
      
      {/* Queue Panel */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            className="absolute right-0 bottom-20 w-80 bg-black/90 backdrop-blur-md border border-white/10 rounded-t-lg overflow-hidden shadow-lg z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-medium text-white">Play Queue</h3>
              <button 
                className="text-white/70 hover:text-white"
                onClick={() => setShowQueue(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {queue.length === 0 ? (
                <div className="p-4 text-center text-white/70">
                  Queue is empty
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {queue.map(track => (
                    <QueueItem 
                      key={track.id}
                      track={track}
                      isActive={currentTrack?.id === track.id}
                      onPlay={() => playTrack(track)}
                      onRemove={() => removeFromQueue(track.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface QueueItemProps {
  track: Track;
  isActive: boolean;
  onPlay: () => void;
  onRemove: () => void;
}

function QueueItem({ track, isActive, onPlay, onRemove }: QueueItemProps) {
  return (
    <div 
      className={`p-3 flex items-center hover:bg-white/10 cursor-pointer ${
        isActive ? 'bg-haiti-gold/20' : ''
      }`}
    >
      <div 
        className="h-10 w-10 bg-gradient-to-br from-haiti-blue/30 to-haiti-red/30 rounded flex items-center justify-center mr-3 flex-shrink-0"
        onClick={onPlay}
      >
        <Play className="h-4 w-4 text-white" />
      </div>
      
      <div className="min-w-0 flex-1" onClick={onPlay}>
        <h4 className="text-white text-sm font-medium truncate">{track.title}</h4>
        <p className="text-white/70 text-xs truncate">{track.artist}</p>
      </div>
      
      <button 
        className="ml-2 text-white/40 hover:text-white/70 p-1"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}