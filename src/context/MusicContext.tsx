'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  audioUrl: string;
  coverUrl?: string;
  genre?: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  queue: Song[];
  play: () => void;
  pause: () => void;
  setCurrentSong: (song: Song) => void;
  nextSong: () => void;
  previousSong: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'none' | 'one' | 'all'>('none');
  const [queue, setQueue] = useState<Song[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = document.createElement('audio');
    audioRef.current.volume = volume;
    
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const updateDuration = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const onEnded = () => {
      if (repeat === 'one') {
        play();
      } else if (repeat === 'all' || queue.length > 0) {
        nextSong();
      } else {
        setIsPlaying(false);
      }
    };

    const onError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [repeat, queue.length]);

  // Update audio source when current song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      
      if (isPlaying) {
        play();
      }
    }
  }, [currentSong]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = () => {
    if (audioRef.current && currentSong) {
      audioRef.current.play().catch(e => {
        console.error('Error playing audio:', e);
      });
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    if (queue.length > 0) {
      const nextIndex = shuffle 
        ? Math.floor(Math.random() * queue.length)
        : queue.findIndex(song => song.id === currentSong?.id) + 1;
      
      const nextSong = shuffle 
        ? queue[nextIndex]
        : queue[nextIndex] || queue[0];
      
      setCurrentSong(nextSong);
    }
  };

  const previousSong = () => {
    if (queue.length > 0) {
      const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
      setCurrentSong(queue[prevIndex]);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    const states: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all'];
    const currentIndex = states.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % states.length;
    setRepeat(states[nextIndex]);
  };

  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
  };

  const removeFromQueue = (index: number) => {
    const newQueue = [...queue];
    newQueue.splice(index, 1);
    setQueue(newQueue);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const value: MusicContextType = {
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
    setCurrentSong,
    nextSong,
    previousSong,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}