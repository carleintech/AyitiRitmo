'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  audioUrl: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  setCurrentSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  next: () => void;
  previous: () => void;
  addToQueue: (song: Song) => void;
  setQueue: (songs: Song[]) => void;
  removeFromQueue: (index: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSetCurrentSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // Add song to queue if not already present
    if (!queue.find(s => s.id === song.id)) {
      setQueue([...queue, song]);
      setCurrentIndex(queue.length);
    } else {
      const index = queue.findIndex(s => s.id === song.id);
      setCurrentIndex(index);
    }
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const next = () => {
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
      setIsPlaying(true);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
      setIsPlaying(true);
    }
  };

  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
  };

  const handleSetQueue = (songs: Song[]) => {
    setQueue(songs);
    if (songs.length > 0 && !currentSong) {
      setCurrentSong(songs[0]);
      setCurrentIndex(0);
    }
  };

  const removeFromQueue = (index: number) => {
    const newQueue = queue.filter((_, i) => i !== index);
    setQueue(newQueue);
    
    if (index === currentIndex && newQueue.length > 0) {
      // If we removed the current song, play the next one or the first one
      const nextIndex = index < newQueue.length ? index : 0;
      setCurrentIndex(nextIndex);
      setCurrentSong(newQueue[nextIndex]);
    } else if (index < currentIndex) {
      // If we removed a song before the current one, adjust the current index
      setCurrentIndex(currentIndex - 1);
    }
  };

  const value: MusicContextType = {
    currentSong,
    isPlaying,
    queue,
    currentIndex,
    setCurrentSong: handleSetCurrentSong,
    play,
    pause,
    togglePlayPause,
    next,
    previous,
    addToQueue,
    setQueue: handleSetQueue,
    removeFromQueue,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};