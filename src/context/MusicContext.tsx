// src/context/MusicContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  audioUrl: string;
  coverUrl?: string;
}

interface MusicContextType {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  isMuted: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  play: () => void;
  pause: () => void;
  setCurrentSong: (song: Song) => void;
  nextSong: () => void;
  previousSong: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  seekTo: (progress: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      
      // Event listeners
      audioRef.current.addEventListener('ended', handleSongEnd);
      audioRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
      
      // Cleanup on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', handleSongEnd);
          audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
        }
        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current);
        }
      };
    }
  }, []);

  // Update audio source when currentSong changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          setIsPlaying(false);
        });
      }
      
      // Start progress tracking
      startProgressTracking();
    }
  }, [currentSong]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          setIsPlaying(false);
        });
        startProgressTracking();
      } else {
        audioRef.current.pause();
        stopProgressTracking();
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const startProgressTracking = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    progressTimerRef.current = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setProgress(audioRef.current.currentTime / (audioRef.current.duration || 1));
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSongEnd = () => {
    if (isRepeat) {
      // Repeat current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
    } else {
      // Play next song if available
      nextSong();
    }
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const setCurrentSongHandler = (song: Song) => {
    setCurrentSong(song);
  };

  const nextSong = () => {
    if (queue.length === 0) return;
    
    const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
    let nextIndex = 0;
    
    if (isShuffle) {
      // Play random song from queue (excluding current)
      const availableSongs = queue.filter(song => song.id !== currentSong?.id);
      if (availableSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        nextIndex = queue.findIndex(song => song.id === availableSongs[randomIndex].id);
      }
    } else {
      // Play next song in order
      nextIndex = (currentIndex + 1) % queue.length;
    }
    
    setCurrentSong(queue[nextIndex]);
    play();
  };

  const previousSong = () => {
    if (queue.length === 0) return;
    
    const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
    let prevIndex = 0;
    
    if (isShuffle) {
      // Play random song from queue (excluding current)
      const availableSongs = queue.filter(song => song.id !== currentSong?.id);
      if (availableSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        prevIndex = queue.findIndex(song => song.id === availableSongs[randomIndex].id);
      }
    } else {
      // Play previous song in order
      prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    }
    
    setCurrentSong(queue[prevIndex]);
    play();
  };

  const addToQueue = (song: Song) => {
    // Add to queue if not already in queue
    setQueue(prevQueue => {
      if (!prevQueue.some(s => s.id === song.id)) {
        return [...prevQueue, song];
      }
      return prevQueue;
    });
  };

  const removeFromQueue = (songId: string) => {
    setQueue(prevQueue => prevQueue.filter(song => song.id !== songId));
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrentSong(null);
    pause();
  };

  const setVolumeHandler = (newVolume: number) => {
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const seekTo = (newProgress: number) => {
    if (audioRef.current && currentSong) {
      const newTime = newProgress * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  const value = useMemo(() => ({
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
    setCurrentSong: setCurrentSongHandler,
    nextSong,
    previousSong,
    addToQueue,
    removeFromQueue,
    clearQueue,
    setVolume: setVolumeHandler,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    seekTo,
  }), [
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
    setCurrentSongHandler,
    nextSong,
    previousSong,
    addToQueue,
    removeFromQueue,
    clearQueue,
    setVolumeHandler,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    seekTo,
  ]);

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export default MusicContext;

//