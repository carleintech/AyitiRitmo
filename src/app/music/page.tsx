'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Music as MusicIcon,  // Ensure you import the correct Music icon
  Radio,
  Mic2,
  Disc,
  Calendar,
  Newspaper,
  ArrowRight
} from 'lucide-react';

const genres = [
  { id: 'news', label: 'Music News', icon: Newspaper },
  { id: 'konpa', label: 'Konpa', icon: MusicIcon },  // Use MusicIcon instead of Music
  { id: 'zouk', label: 'Zouk', icon: Disc },
  { id: 'rasin', label: 'Rasin (Roots Music)', icon: Radio },
  { id: 'rap', label: 'Rap Kreyòl', icon: Mic2 },
  { id: 'live', label: 'Live Performances', icon: Calendar },
];

const newReleases = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `New Release ${i + 1}`,
  artist: `Artist Name ${i + 1}`,
  type: ['Album', 'Single', 'EP'][i % 3],
  date: '2024-05-10',
  cover: `from-haiti-${['red', 'blue', 'gold'][i % 3]} to-${['orange', 'blue', 'yellow'][i % 3]}-500`,
}));

const topPlaylists = [
  { name: "Editor's Pick", description: "Handpicked Haitian classics", songs: 45, gradient: "from-haiti-red to-orange-500" },
  { name: "Top 10 Konpa", description: "The hottest Konpa tracks", songs: 10, gradient: "from-haiti-blue to-blue-500" },
  { name: "Zouk Essentials", description: "Must-have Zouk collection", songs: 30, gradient: "from-purple-600 to-pink-500" },
  { name: "Haitian Hip-Hop", description: "Rap Kreyòl hits", songs: 25, gradient: "from-green-600 to-cyan-500" },
  { name: "Carnival Mix", description: "Feel the Carnival spirit", songs: 35, gradient: "from-haiti-gold to-red-500" },
  { name: "Chill Vibes", description: "Relaxing Haitian tunes", songs: 40, gradient: "from-blue-600 to-purple-500" },
];

const Music = () => {
  const [activeGenre, setActiveGenre] = useState('news');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Music</h1>
        <p className="text-white/60">Explore the rich world of Haitian music</p>
      </motion.div>

      {/* Featured Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-gradient-haiti">
          <div className="p-8 relative">
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Artist of the Month</h2>
                <p className="text-white/80 mb-6">Featuring the legendary voices of Haiti</p>
                <Button className="bg-white text-haiti-red hover:bg-white/90">
                  Listen Now
                </Button>
              </div>
              <div className="hidden md:block opacity-30">
                <MusicIcon className="h-48 w-48 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Genre Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeGenre} onValueChange={setActiveGenre} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-slate-800">
            {genres.map((genre) => {
              const Icon = genre.icon;
              return (
                <TabsTrigger 
                  key={genre.id} 
                  value={genre.id}
                  className="data-[state=active]:bg-haiti-red data-[state=active]:text-white"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {genre.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="news" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="flex gap-4 p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                  <div className="w-24 h-24 bg-gradient-to-br from-haiti-red to-haiti-blue rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-haiti-gold mb-1">
                      <Calendar className="h-3 w-3" />
                      May 10, 2024
                    </div>
                    <h3 className="font-semibold text-white mb-1 line-clamp-2">
                      Latest News in Haitian Music Scene {i}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      Discover what's happening in the world of Haitian music...
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {['konpa', 'zouk', 'rasin', 'rap'].map((genre) => (
            <TabsContent key={genre} value={genre} className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {newReleases.map((album) => (
                  <Card key={album.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className={`aspect-square bg-gradient-to-br ${album.cover} rounded-lg mb-3 relative overflow-hidden group`}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="mb-1">
                      <span className="text-xs text-haiti-red font-medium">{album.type}</span>
                    </div>
                    <h3 className="font-medium text-white line-clamp-1">{album.title}</h3>
                    <p className="text-sm text-white/60 line-clamp-1">{album.artist}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="live" className="mt-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="flex gap-4 p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                  <div className="w-32 h-24 bg-gradient-to-br from-haiti-gold to-haiti-red rounded-lg flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-haiti-gold mb-1">
                      <Calendar className="h-3 w-3" />
                      May 10, 2024
                    </div>
                    <h3 className="font-semibold text-white mb-1 line-clamp-2">
                      Live Event {i}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      Catch your favorite Haitian artists live in concert...
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Music;
