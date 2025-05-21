"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumTitle?: string;
  coverImage?: string;
  audioSrc: string;
  duration: number; // in seconds
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number; // 0 to 100
  duration: number; // in seconds
  currentTime: number; // in seconds
  queue: Track[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (progress: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Sample tracks for demo
const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Dekole",
    artist: "Boukman Eksperyans",
    albumTitle: "Kalfou Danjere",
    audioSrc: "/audio/sample-track-1.mp3",
    duration: 245,
  },
  {
    id: "2",
    title: "Sweet Micky",
    artist: "Pa Manyen Fanm Nan",
    albumTitle: "Best of Sweet Micky",
    audioSrc: "/audio/sample-track-2.mp3",
    duration: 198,
  },
  {
    id: "3",
    title: "Rasanble",
    artist: "RAM",
    albumTitle: "RAM 6: Manman m se Ginen",
    audioSrc: "/audio/sample-track-3.mp3",
    duration: 332,
  },
];

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Memoized playTrack to avoid circular dependency
  const playTrack = useCallback(
    (track: Track) => {
      if (audioRef.current) {
        // If it's already the current track, just toggle play/pause
        if (currentTrack && currentTrack.id === track.id) {
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          } else {
            audioRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch((error) => {
                console.error("Audio playback failed:", error);
                setIsPlaying(false);
              });
          }
          return;
        }
        // Otherwise load and play the new track
        audioRef.current.src = track.audioSrc;
        audioRef.current.volume = volume;
        setCurrentTrack(track);
        setProgress(0);
        setCurrentTime(0);
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
          });
      }
    },
    [currentTrack, isPlaying, volume]
  );

  // togglePlay as a regular function, not memoized
  const togglePlay = () => {
    if (!currentTrack) {
      if (queue.length > 0) {
        playTrack(queue[0]);
      }
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) =>
            console.error("Audio playback failed:", error)
          );
      }
    }
  };

  // Memoized nextTrack with correct dependencies
  const nextTrack = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    playTrack(queue[nextIndex]);
  }, [currentTrack, queue, playTrack]);

  // Memoized previousTrack
  const previousTrack = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    playTrack(queue[prevIndex]);
  }, [currentTrack, queue, playTrack]);

  useEffect(() => {
    audioRef.current = new Audio();
    setQueue(sampleTracks);

    const updateProgress = () => {
      if (audioRef.current) {
        const currentProgress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(currentProgress || 0);
        setCurrentTime(audioRef.current.currentTime || 0);
      }
    };

    const handleEnded = () => {
      nextTrack();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", handleEnded);
      audioRef.current.addEventListener("durationchange", () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration || 0);
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [nextTrack]);

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  const seek = (newProgress: number) => {
    if (audioRef.current && currentTrack) {
      const seekTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setProgress(newProgress);
      setCurrentTime(seekTime);
    }
  };

  const addToQueue = (track: Track) => {
    setQueue((prevQueue) => [...prevQueue, track]);
  };

  const removeFromQueue = (trackId: string) => {
    setQueue((prevQueue) => prevQueue.filter((track) => track.id !== trackId));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        currentTime,
        queue,
        playTrack,
        togglePlay,
        setVolume,
        seek,
        nextTrack,
        previousTrack,
        addToQueue,
        removeFromQueue,
        clearQueue,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
