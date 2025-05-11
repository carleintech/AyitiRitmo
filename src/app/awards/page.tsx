'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Star,
  Medal,
  Crown,
  Vote,
  Calendar,
  History,
  CheckCircle,
  Play,
  ArrowRight
} from 'lucide-react';

const awardCategories = [
  { id: 'haitian', label: 'Haitian Music Awards™', icon: Trophy },
  { id: 'carnival', label: 'Carnival Awards', icon: Crown },
  { id: 'top-artists', label: 'Top Artists of the Year', icon: Star },
];

const upcomingEvents = [
  {
    id: 1,
    name: 'Haitian Music Awards 2024',
    date: 'December 15, 2024',
    location: 'Miami Convention Center',
    description: 'The biggest night in Haitian music',
    status: 'Voting Open',
    image: 'from-haiti-red to-haiti-blue',
  },
  {
    id: 2,
    name: 'Carnival Awards 2024',
    date: 'March 10, 2024',
    location: 'Port-au-Prince',
    description: 'Celebrating the spirit of Carnival',
    status: 'Nominations Closed',
    image: 'from-orange-500 to-red-500',
  },
];

const categories = [
  { name: 'Best Konpa Song', nominees: 5, icon: Trophy },
  { name: 'Best New Artist', nominees: 6, icon: Star },
  { name: 'Best Album', nominees: 5, icon: Medal },
  { name: 'Best Collaboration', nominees: 4, icon: Crown },
  { name: 'Best Music Video', nominees: 5, icon: Play },
  { name: 'Artist of the Year', nominees: 4, icon: Trophy },
];

const pastWinners = [
  { year: 2023, category: 'Artist of the Year', winner: 'Artist Name 1', image: 'from-haiti-red to-orange-500' },
  { year: 2023, category: 'Best Konpa Song', winner: 'Song Title', artist: 'Artist Name 2', image: 'from-haiti-blue to-blue-500' },
  { year: 2023, category: 'Best New Artist', winner: 'Artist Name 3', image: 'from-purple-600 to-pink-500' },
  { year: 2023, category: 'Best Album', winner: 'Album Title', artist: 'Artist Name 4', image: 'from-green-600 to-cyan-500' },
];

const Awards = () => {
  const [activeCategory, setActiveCategory] = useState('haitian');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-2">AyitiRitmo Music Awards</h1>
        <p className="text-white/60">Celebrating excellence in Haitian music</p>
      </motion.div>

      {/* Hero Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card className="overflow-hidden bg-gradient-to-br from-haiti-red via-orange-500 to-haiti-gold">
          <div className="p-8 relative">
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">2024 Awards Season</h2>
                <p className="text-white/90 mb-6">Vote for your favorite artists now!</p>
                <div className="flex gap-4">
                  <Button className="bg-white text-haiti-red hover:bg-white/90">
                    <Vote className="h-4 w-4 mr-2" />
                    Vote Now
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    View Nominees
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <Trophy className="h-48 w-48 text-white/20" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Award Categories Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            {awardCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-haiti-red data-[state=active]:text-white"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="haitian" className="mt-6">
            <div className="space-y-6">
              {/* Voting Categories */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">2024 Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Card key={category.name} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-haiti-red/20 rounded-lg">
                              <Icon className="h-5 w-5 text-haiti-red" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{category.name}</h4>
                              <p className="text-sm text-white/60">{category.nominees} nominees</p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-white/40" />
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Past Winners */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">2023 Winners</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {pastWinners.map((winner, index) => (
                    <Card key={index} className="p-4 hover:bg-slate-800/80 transition-colors">
                      <div className={`aspect-square bg-gradient-to-br ${winner.image} rounded-lg mb-3 relative overflow-hidden flex items-center justify-center`}>
                        <CheckCircle className="h-16 w-16 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-haiti-gold font-medium mb-1">{winner.category}</div>
                        <h4 className="font-medium text-white">{winner.winner}</h4>
                        {winner.artist && (
                          <p className="text-sm text-white/60">{winner.artist}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="carnival" className="mt-6">
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-haiti-gold to-orange-400 text-white">
                <h3 className="text-xl font-bold mb-2">Carnival Awards 2024</h3>
                <p>Join us in celebrating the vibrant sounds and traditions of Haitian Carnival.</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="top-artists" className="mt-6">
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-500 text-white">
                <h3 className="text-xl font-bold mb-2">Top Artists of the Year</h3>
                <p>Recognizing the artists who defined the sound of 2024.</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Awards;
