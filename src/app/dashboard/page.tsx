// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMusic } from '@/context/MusicContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  Heart, 
  HeartHandshake,
  TrendingUp,
  Clock,
  Shuffle,
  BarChart3,
  Music,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

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
  const router = useRouter();
  const { currentSong, isPlaying, play, pause, setCurrentSong, addToQueue } = useMusic();
  const [songs, setSongs] = useState<Song[]>([]);
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState('featured');

  useEffect(() => {
    fetchSongs();
    if (session?.user) {
      fetchLikedSongs();
    }
  }, [session]);

  const fetchSongs = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        // Mock data
        const mockSongs = Array(15).fill(null).map((_, i) => ({
          id: `song-${i}`,
          title: `Haitian Rhythm Track ${i + 1}`,
          artist: `Artist ${Math.floor(i / 3) + 1}`,
          album: `Album ${Math.floor(i / 5) + 1}`,
          duration: 180 + Math.floor(Math.random() * 120),
          audioUrl: `/sounds/haitian-beat.mp3`,
          coverUrl: i % 3 === 0 ? 
            'https://placehold.co/400x400/FE5F55/fff?text=H' : 
            i % 3 === 1 ? 
            'https://placehold.co/400x400/2272FF/fff?text=A' :
            'https://placehold.co/400x400/FFD700/000?text=R',
          genre: i % 4 === 0 ? 'Konpa' : i % 4 === 1 ? 'Zouk' : i % 4 === 2 ? 'Rasin' : 'Rap Kreyòl',
          likes: Math.floor(Math.random() * 1000),
          streams: Math.floor(Math.random() * 10000),
        }));
        
        setSongs(mockSongs);
        setTrendingSongs(
          [...mockSongs]
            .sort((a, b) => b.streams - a.streams)
            .slice(0, 5)
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const fetchLikedSongs = async () => {
    if (!session?.user) return;

    try {
      // Simulate API call
      setTimeout(() => {
        // Mock data
        const likedIds = new Set(['song-1', 'song-3', 'song-5', 'song-7']);
        setLikedSongs(likedIds);
      }, 800);
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
      play();
    }
  };

  const toggleLike = async (songId: string) => {
    if (!session?.user) {
      router.push('/auth/login');
      return;
    }

    try {
      // Simulate API call
      setLikedSongs(prev => {
        const newSet = new Set(prev);
        if (newSet.has(songId)) {
          newSet.delete(songId);
        } else {
          newSet.add(songId);
        }
        return newSet;
      });

      // Update song likes in the UI
      setSongs(prev => 
        prev.map(song => {
          if (song.id === songId) {
            const isLiked = likedSongs.has(songId);
            return {
              ...song,
              likes: isLiked ? song.likes - 1 : song.likes + 1,
            };
          }
          return song;
        })
      );

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
      <div className="space-y-8">
        {/* Welcome Section Skeleton */}
        <div className="relative bg-gradient-to-r from-haitian-blue-800/50 to-haitian-blue-900/50 rounded-lg p-8 mb-8">
          <Skeleton className="h-10 w-3/4 bg-white/10 mb-2" />
          <Skeleton className="h-6 w-1/2 bg-white/10 mb-4" />
          <Skeleton className="h-10 w-40 bg-white/10" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <Card key={i} className="bg-background/50">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-24 bg-white/10" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 bg-white/10 mb-1" />
                <Skeleton className="h-4 w-32 bg-white/10" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Songs Skeleton */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-40 bg-white/10" />
            <Skeleton className="h-9 w-20 bg-white/10" />
          </div>

          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Card key={i} className="p-4 bg-background/50">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-md bg-white/10" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 bg-white/10 mb-2" />
                    <Skeleton className="h-4 w-1/2 bg-white/10 mb-2" />
                    <Skeleton className="h-3 w-1/3 bg-white/10" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section with Animation */}
      <motion.div 
        className="relative bg-gradient-to-r from-haitian-red to-haitian-blue rounded-lg p-8 mb-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated waveform in background */}
        <div className="absolute inset-0 flex items-end opacity-20">
          {Array(30).fill(0).map((_, i) => (
            <motion.div
              key={i}
              className="h-16 w-2 bg-white mx-1 rounded-t-full"
              animate={{ 
                height: [40, 80 + Math.random() * 80, 40], 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: i * 0.05,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-2 text-white relative z-10">
          Welcome {session?.user?.name ? `back, ${session.user.name}!` : 'to AyitiRitmo!'}
        </h1>
        <p className="text-lg opacity-90 text-white relative z-10">
          Discover the finest Haitian music - Konpa, Zouk, and more
        </p>
        <div className="flex space-x-3 mt-6 relative z-10">
          <Button 
            className="bg-haitian-gold text-black hover:bg-haitian-gold/90"
            onClick={() => {
              const randomSong = songs[Math.floor(Math.random() * songs.length)];
              if (randomSong) handlePlayPause(randomSong);
            }}
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle Play
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10"
            onClick={() => router.push('/charts')}
          >
            View Charts
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview with Animation */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-background to-haitian-blue-900/10 transition-all hover:shadow-md hover:shadow-haitian-blue/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Songs</CardTitle>
            <TrendingUp className="h-4 w-4 text-haitian-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{songs.length}</div>
            <p className="text-xs text-muted-foreground">New releases this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background to-haitian-red-900/10 transition-all hover:shadow-md hover:shadow-haitian-red/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liked Songs</CardTitle>
            <Heart className="h-4 w-4 text-haitian-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{likedSongs.size}</div>
            <p className="text-xs text-muted-foreground">Your favorites</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background to-haitian-gold/10 transition-all hover:shadow-md hover:shadow-haitian-gold/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Listening Time</CardTitle>
            <Clock className="h-4 w-4 text-haitian-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h 32m</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Music Tabs */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="bg-background/50 border border-border mb-6">
            <TabsTrigger 
              value="featured" 
              className="data-[state=active]:bg-haitian-blue data-[state=active]:text-white"
              onClick={() => setActiveSection('featured')}
            >
              <Music className="mr-2 h-4 w-4" />
              Featured This Week
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:bg-haitian-red data-[state=active]:text-white"
              onClick={() => setActiveSection('trending')}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending Now
            </TabsTrigger>
            <TabsTrigger 
              value="recommended" 
              className="data-[state=active]:bg-haitian-gold data-[state=active]:text-black"
              onClick={() => setActiveSection('recommended')}
            >
              <Headphones className="mr-2 h-4 w-4" />
              Recommended For You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Featured This Week</h2>
              <Link href="/music">
                <Button variant="outline">View All</Button>
              </Link>
            </div>

            <div className="space-y-2">
              {songs.slice(0, 5).map((song, index) => (
                <Card 
                  key={song.id} 
                  className="p-4 transition-all hover:bg-haitian-blue-950/10"
                >
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
                        <span>{song.streams.toLocaleString()} streams</span>
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
                      <span className="text-sm text-muted-foreground">{song.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <Link href="/charts">
                <Button variant="outline">View Charts</Button>
              </Link>
            </div>

            <div className="space-y-2">
              {trendingSongs.map((song, index) => (
                <Card 
                  key={song.id} 
                  className="p-4 transition-all hover:bg-haitian-red-950/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-haitian-red font-bold text-white">
                      {index + 1}
                    </div>
                    
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
                        <span className="flex items-center text-haitian-red">
                          <TrendingUp className="h-3 w-3 mr-1" /> 
                          Hot
                        </span>
                        <span>{formatDuration(song.duration)}</span>
                        <span>{song.streams.toLocaleString()} streams</span>
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
                      <span className="text-sm text-muted-foreground">{song.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recommended For You</h2>
              <Button variant="outline">Refresh</Button>
            </div>

            <div className="space-y-2">
              {songs.slice(6, 11).map((song, index) => (
                <Card 
                  key={song.id} 
                  className="p-4 transition-all hover:bg-haitian-gold/5"
                >
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
                        <span className="flex items-center text-haitian-gold">
                          <Headphones className="h-3 w-3 mr-1" /> 
                          Recommended
                        </span>
                        <span>{formatDuration(song.duration)}</span>
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
                      <span className="text-sm text-muted-foreground">{song.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-br from-haitian-blue/10 to-haitian-red/10 transition-all hover:bg-gradient-to-br hover:from-haitian-blue/20 hover:to-haitian-red/20">
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

        <Card className="p-6 bg-gradient-to-br from-haitian-gold/10 to-haitian-green/10 transition-all hover:bg-gradient-to-br hover:from-haitian-gold/20 hover:to-haitian-green/20">
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
      </motion.div>
    </div>
  );
}