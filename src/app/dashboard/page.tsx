'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  TrendingUp,
  Heart,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';
import { useMusic } from '@/context/MusicContext';

// Mock data with actual audio properties
const featuredSongs = [
  {
    id: '1',
    title: 'Konpa Paradise',
    artist: 'Haiti Groove',
    album: 'Summer Vibes',
    duration: 245,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-1.mp3',
    gradient: 'from-haiti-red to-orange-500'
  },
  {
    id: '2',
    title: 'Zouk Love',
    artist: 'Caribbean Dreamers',
    album: 'Tropical Heat',
    duration: 213,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-2.mp3',
    gradient: 'from-haiti-blue to-blue-500'
  },
  {
    id: '3',
    title: 'Rara Fever',
    artist: 'Traditional Roots',
    album: 'Cultural Heritage',
    duration: 198,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-3.mp3',
    gradient: 'from-green-600 to-green-400'
  },
  {
    id: '4',
    title: 'Kreyòl Rap',
    artist: 'Young Haiti',
    album: 'New Generation',
    duration: 234,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-4.mp3',
    gradient: 'from-purple-600 to-purple-400'
  },
];

const recentSongs = [
  {
    id: '5',
    title: 'Midnight Dance',
    artist: 'Ti Simone',
    album: 'Late Night Session',
    duration: 245,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-5.mp3',
    gradient: 'from-haiti-blue to-haiti-gold'
  },
  {
    id: '6',
    title: 'Morning Kompa',
    artist: 'Sunrise Band',
    album: 'Daily Rhythms',
    duration: 187,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-6.mp3',
    gradient: 'from-haiti-gold to-orange-500'
  },
  {
    id: '7',
    title: 'Ocean Breeze',
    artist: 'Coast Vibes',
    album: 'Island Life',
    duration: 256,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-7.mp3',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: '8',
    title: 'Mountain High',
    artist: 'Peak Performers',
    album: 'Elevation',
    duration: 223,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-8.mp3',
    gradient: 'from-green-500 to-blue-500'
  },
  {
    id: '9',
    title: 'City Lights',
    artist: 'Urban Beat',
    album: 'Metro Sounds',
    duration: 245,
    coverArt: '/api/placeholder/300/300',
    audioUrl: '/sounds/sample-song-9.mp3',
    gradient: 'from-purple-500 to-pink-500'
  },
];

const Dashboard = () => {
  const { setCurrentSong, currentSong, isPlaying, setQueue } = useMusic();

  const handlePlaySong = (song: typeof featuredSongs[0]) => {
    setCurrentSong(song);
  };

  const handlePlayFeatured = () => {
    setQueue(featuredSongs);
    setCurrentSong(featuredSongs[0]);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-haiti-red to-haiti-blue text-white">
          <div className="p-8 relative">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h1 className="text-4xl font-bold mb-2">Discover Haiti's Finest</h1>
                <p className="text-xl text-white/80 mb-6">
                  Experience the rich rhythms of Konpa, Zouk, and more
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="bg-haiti-gold hover:bg-haiti-gold/90 text-black"
                    onClick={handlePlayFeatured}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Play Featured
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    View Charts
                  </Button>
                </div>
              </div>
              
              {/* Decorative Waveform */}
              <div className="absolute right-0 top-0 opacity-30">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <path
                    d="M0,100 Q50,50 100,100 T200,100"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M0,120 Q50,70 100,120 T200,120"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M0,80 Q50,30 100,80 T200,80"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-haiti-red/20">
              <TrendingUp className="h-6 w-6 text-haiti-red" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Trending Now</h3>
              <p className="text-sm text-white/60">See what's hot in Haiti</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-haiti-blue/20">
              <Heart className="h-6 w-6 text-haiti-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Your Favorites</h3>
              <p className="text-sm text-white/60">Liked songs and artists</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-haiti-gold/20">
              <Share2 className="h-6 w-6 text-haiti-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Share & Connect</h3>
              <p className="text-sm text-white/60">With friends and artists</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-8"
      >
        {/* Charts Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Today's Top Hits</h2>
            <Button variant="ghost" className="text-white/60 hover:text-white">
              See all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredSongs.map((song) => (
              <Card 
                key={song.id} 
                className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <div className={`aspect-square bg-gradient-to-br ${song.gradient} rounded-lg mb-3 relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    {currentSong?.id === song.id && isPlaying && (
                      <div className="absolute inset-0 bg-black/20 animate-pulse" />
                    )}
                  </div>
                </div>
                <h3 className="font-medium text-white line-clamp-1">{song.title}</h3>
                <p className="text-sm text-white/60 line-clamp-1">{song.artist}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
          <div className="space-y-2">
            {recentSongs.map((song) => (
              <Card 
                key={song.id} 
                className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${song.gradient} rounded flex items-center justify-center relative`}>
                    <Play className="h-6 w-6 text-white" />
                    {currentSong?.id === song.id && isPlaying && (
                      <div className="absolute inset-0 bg-black/20 animate-pulse rounded" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{song.title}</h3>
                    <p className="text-sm text-white/60">{song.artist} • {song.album}</p>
                  </div>
                  <div className="text-sm text-white/60">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</div>
                  <Button size="icon" variant="ghost" className="text-white/60 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Dashboard;