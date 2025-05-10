'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Heart,
  Music,
  Mic2,
  Radio,
  CheckCircle
} from 'lucide-react';

const genres = [
  { name: 'Konpa', color: 'from-haiti-red to-orange-500', icon: Music },
  { name: 'Zouk', color: 'from-haiti-blue to-blue-500', icon: Mic2 },
  { name: 'Rasin', color: 'from-green-600 to-green-400', icon: Radio },
  { name: 'Rap Kreyòl', color: 'from-purple-600 to-purple-400', icon: Mic2 },
  { name: 'Twoubadou', color: 'from-haiti-gold to-yellow-500', icon: Music },
  { name: 'Rara', color: 'from-pink-600 to-red-500', icon: Music },
];

const featuredArtists = [
  { name: 'Artist 1', image: 'from-haiti-red to-orange-500', verified: true },
  { name: 'Artist 2', image: 'from-haiti-blue to-blue-500', verified: true },
  { name: 'Artist 3', image: 'from-green-600 to-green-400', verified: false },
  { name: 'Artist 4', image: 'from-purple-600 to-purple-400', verified: true },
];

const Explore = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Explore Music</h1>
        <p className="text-white/60">Discover new artists and genres</p>
      </motion.div>

      {/* Genres Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Browse Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {genres.map((genre) => {
            const Icon = genre.icon;
            return (
              <Card 
                key={genre.name} 
                className="p-6 cursor-pointer overflow-hidden relative bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-10`} />
                <div className="relative">
                  <div className="flex justify-between items-start mb-3">
                    <Icon className="h-8 w-8 text-white" />
                    <div className={`p-2 rounded-full bg-gradient-to-br ${genre.color}`}>
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{genre.name}</h3>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.section>

      {/* Featured Artists */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Artists</h2>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            See all
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredArtists.map((artist) => (
            <Card key={artist.name} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
              <div className={`aspect-square bg-gradient-to-br ${artist.image} rounded-full mb-3 relative overflow-hidden group`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="font-medium text-white">{artist.name}</h3>
                  {artist.verified && (
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-white/60">100K followers</p>
              </div>
              <Button className="w-full mt-3 bg-white/10 hover:bg-white/20">
                Follow
              </Button>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Mood Playlists */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Mood & Activity</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Party', 'Chill', 'Workout', 'Romantic', 'Focus', 'Sleep'].map((mood) => (
            <Card key={mood} className="p-6 cursor-pointer bg-slate-800 hover:bg-slate-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-haiti-red to-haiti-blue flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{mood}</h3>
                  <p className="text-sm text-white/60">Perfect for {mood.toLowerCase()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* New Releases */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-haiti-blue to-haiti-gold rounded-lg mb-3 relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="font-medium text-white line-clamp-1">New Album {i}</h3>
              <p className="text-sm text-white/60 line-clamp-1">Artist Name</p>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Explore;