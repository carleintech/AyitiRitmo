// src/hooks/useSongs.ts
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  audioUrl: string;
  coverUrl?: string;
  genre?: string;
  likes: number;
  streams: number;
}

interface UseSongsOptions {
  genre?: string;
  limit?: number;
  page?: number;
}

export function useSongs(options: UseSongsOptions = {}) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const { data: session } = useSession();

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.genre) params.append('genre', options.genre);
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.page) params.append('page', options.page.toString());

      const response = await fetch(`/api/songs?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }

      const data = await response.json();
      setSongs(data.songs);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [options.genre, options.limit, options.page]);

  const refreshSongs = () => {
    fetchSongs();
  };

  return {
    songs,
    loading,
    error,
    total,
    refreshSongs,
  };
}

// src/hooks/useLikes.ts
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useLikes() {
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      fetchLikedSongs();
    } else {
      setLikedSongs(new Set());
      setLoading(false);
    }
  }, [session]);

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch('/api/songs/liked');
      const data = await response.json();
      setLikedSongs(new Set(data.likedSongs));
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (songId: string) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/songs/${songId}/like`, {
        method: 'POST',
      });
      const data = await response.json();

      if (data.liked) {
        setLikedSongs(prev => new Set([...prev, songId]));
      } else {
        setLikedSongs(prev => {
          const newSet = new Set(prev);
          newSet.delete(songId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const isLiked = (songId: string) => likedSongs.has(songId);

  return {
    likedSongs,
    loading,
    toggleLike,
    isLiked,
    refreshLikes: fetchLikedSongs,
  };
}