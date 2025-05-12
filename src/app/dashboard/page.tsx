'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMusic } from '@/context/MusicContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Heart, 
  HeartHandshake,
  TrendingUp,
  Clock,
  Shuffle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function Dashboard() {
  const { data: session } = useSession();
  const { currentSong, isPlaying, play, pause, setCurrentSong, addToQueue } = useMusic();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchSongs();
    if (session?.user) {
      fetchLikedSongs();
    }
  }, [session]);

  const fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs?limit=20');
      const data = await response.json();
      setSongs(data.songs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const fetchLikedSongs = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch('/api/songs/liked');
      const data = await response.json();
      setLikedSongs(new Set(data.likedSongs));
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    }
  };

  const handlePlayPause = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      setCurrentSong(song);
      addToQueue(song);
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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-haitian-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r from-haitian-red to-haitian-blue text-white rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome {session?.user?.name ? `back, ${session.user.name}!` : 'to AyitiRitmo!'}
        </h1>
        <p className="text-lg opacity-90">
          Discover the finest Haitian music - Konpa, Zouk, and more
        </p>
        <Button 
          className="mt-4 bg-haitian-gold text-black hover:bg-haitian-gold/90"
          onClick={() => {
            const randomSong = songs[Math.floor(Math.random() * songs.length)];
            if (randomSong) handlePlayPause(randomSong);
          }}
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Shuffle Play
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Songs</CardTitle>
            <TrendingUp className="h-4 w-4 text-haitian-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{songs.length}</div>
            <p className="text-xs text-muted-foreground">New releases this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liked Songs</CardTitle>
            <Heart className="h-4 w-4 text-haitian-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{likedSongs.size}</div>
            <p className="text-xs text-muted-foreground">Your favorites</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Listening Time</CardTitle>
            <Clock className="h-4 w-4 text-haitian-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h 32m</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Songs */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Featured This Week</h2>
          <Link href="/music">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="space-y-2">
          {songs.map((song, index) => (
            <Card key={song.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="h-16 w-16 rounded-md overflow-hidden relative">
                    {song.coverUrl ? (
                      <Image
                        src={song.coverUrl}
                        alt={song.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-haitian-blue to-haitian-red" />
                    )}
                  </div>
                  <button
                    onClick={() => handlePlayPause(song)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{song.title}</h3>
                    {currentSong?.id === song.id && (
                      <Badge className="bg-haitian-green text-white">Playing</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{song.genre}</span>
                    <span>{formatDuration(song.duration)}</span>
                    <span>{song.streams} streams</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleLike(song.id)}
                    className={likedSongs.has(song.id) ? 'text-haitian-red' : ''}
                  >
                    {likedSongs.has(song.id) ? (
                      <HeartHandshake className="h-4 w-4" />
                    ) : (
                      <Heart className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="text-sm text-muted-foreground">{song.likes}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-haitian-blue/10 to-haitian-red/10">
          <h3 className="font-bold mb-2">Create Your Playlist</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Curate your perfect Haitian music collection
          </p>
          <Link href="/dashboard/playlists/create">
            <Button className="bg-haitian-blue hover:bg-haitian-blue/90">
              Create Playlist
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haitian-gold/10 to-haitian-green/10">
          <h3 className="font-bold mb-2">Discover New Artists</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Explore the next generation of Haitian talent
          </p>
          <Link href="/music">
            <Button className="bg-haitian-gold text-black hover:bg-haitian-gold/90">
              Explore Artists
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}