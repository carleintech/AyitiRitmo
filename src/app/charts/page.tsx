'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  MoreHorizontal,
  TrendingUp,
  Trophy,
  Heart,
  Share2
} from 'lucide-react';

const chartCategories = [
  { id: 'top100', label: 'AyitiRitmo Top 100™' },
  { id: 'konpa', label: 'Haitian Konpa Hits™' },
  { id: 'afro', label: 'Afro-Caribbean Vibes™' },
  { id: 'global', label: 'Global Haitian Sounds' },
  { id: 'carnival', label: 'Carnival Anthems' },
  { id: 'yearend', label: 'Year-End Charts' },
];

// Mock data for charts
const mockSongs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  rank: i + 1,
  title: `Song Title ${i + 1}`,
  artist: `Artist Name ${i + 1}`,
  album: `Album Name ${i + 1}`,
  duration: '3:45',
  change: Math.floor(Math.random() * 20) - 10, // Random change between -10 and +10
  cover: `from-haiti-${['red', 'blue', 'gold'][i % 3]} to-${['orange', 'blue', 'yellow'][i % 3]}-500`,
}));

const Charts = () => {
  const [activeChart, setActiveChart] = useState('top100');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">AyitiRitmo Charts</h1>
        <p className="text-white/60">The hottest tracks in Haitian music</p>
      </motion.div>

      {/* Chart Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-slate-800">
            {chartCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-haiti-red data-[state=active]:text-white"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {chartCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Chart Actions */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-haiti-gold" />
                    <span className="text-white font-medium">{category.label}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Heart className="h-4 w-4 mr-2" />
                      Like Chart
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Chart List */}
                <div className="space-y-2">
                  {mockSongs.map((song) => (
                    <Card key={song.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-10 text-center">
                          <div className="text-xl font-bold text-white">#{song.rank}</div>
                          {song.change !== 0 && (
                            <div className={`text-xs ${song.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {song.change > 0 ? '+' : ''}{song.change}
                            </div>
                          )}
                        </div>

                        {/* Album Cover */}
                        <div className={`w-16 h-16 rounded bg-gradient-to-br ${song.cover} flex items-center justify-center group relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <Play className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>

                        {/* Song Info */}
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{song.title}</h3>
                          <p className="text-sm text-white/60">{song.artist} • {song.album}</p>
                        </div>

                        {/* Duration */}
                        <div className="text-sm text-white/60">{song.duration}</div>

                        {/* Actions */}
                        <Button size="icon" variant="ghost" className="text-white/60 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Load More Songs
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Chart Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-haiti-red/20 to-haiti-red/5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-6 w-6 text-haiti-red" />
            <h3 className="text-lg font-semibold text-white">Trending Now</h3>
          </div>
          <p className="text-white/60">Top 100 chart updated every hour</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-blue/20 to-haiti-blue/5">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-6 w-6 text-haiti-blue" />
            <h3 className="text-lg font-semibold text-white">Record Breakers</h3>
          </div>
          <p className="text-white/60">Songs breaking streaming records</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-gold/20 to-haiti-gold/5">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-6 w-6 text-haiti-gold" />
            <h3 className="text-lg font-semibold text-white">Fan Favorites</h3>
          </div>
          <p className="text-white/60">Most liked and shared tracks</p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Charts;