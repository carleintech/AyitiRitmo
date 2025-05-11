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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">AyitiRitmo Music Awards</h1>
        <p className="text-white/60">Celebrating excellence in Haitian music</p>
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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
              <Card className="p-6 bg-gradient-to-br from-haiti-gold/20 to-haiti-gold/5">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-6 w-6 text-haiti-gold" />
            <h3 className="font-semibold text-white">Nominated Artists</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">48</p>
          <p className="text-white/60 text-sm">This year's nominees</p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Awards;6 bg-gradient-to-br from-orange-500/20 to-red-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <Crown className="h-8 w-8 text-haiti-gold" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Carnival Awards 2024</h3>
                    <p className="text-white/60">Celebrating the spirit of Haitian Carnival</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Best Carnival Song', 'Best Carnival Band', 'Best Costume'].map((category) => (
                    <Card key={category} className="p-4 bg-black/20">
                      <h4 className="font-medium text-white">{category}</h4>
                      <p className="text-sm text-white/60">Voting closes March 5</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="top-artists" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <Card key={rank} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className="relative">
                      <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full ${
                        rank === 1 ? 'bg-haiti-gold' : 
                        rank === 2 ? 'bg-gray-300' : 
                        rank === 3 ? 'bg-amber-700' : 
                        'bg-haiti-blue'
                      } flex items-center justify-center text-white text-sm font-bold`}>
                        #{rank}
                      </div>
                      <div className="w-full aspect-square bg-gradient-to-br from-haiti-red to-haiti-blue rounded-lg mb-3" />
                      <h4 className="font-medium text-white">Artist Name {rank}</h4>
                      <p className="text-sm text-white/60">1.2M monthly listeners</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Upcoming Events */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Award Shows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
              <div className="flex gap-4">
                <div className={`w-24 h-24 bg-gradient-to-br ${event.image} rounded-lg flex-shrink-0 flex items-center justify-center`}>
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{event.name}</h3>
                      <p className="text-sm text-white/60">{event.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.status === 'Voting Open' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </span>
                    <span>{event.location}</span>
                  </div>
                  <Button className="mt-4" size="sm">
                    {event.status === 'Voting Open' ? 'Vote Now' : 'Learn More'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Award Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-haiti-red/20 to-haiti-red/5">
          <div className="flex items-center gap-3 mb-2">
            <Vote className="h-6 w-6 text-haiti-red" />
            <h3 className="font-semibold text-white">Total Votes</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">125,432</p>
          <p className="text-white/60 text-sm">Cast this season</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-blue/20 to-haiti-blue/5">
          <div className="flex items-center gap-3 mb-2">
            <History className="h-6 w-6 text-haiti-blue" />
            <h3 className="font-semibold text-white">Award Categories</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">15</p>
          <p className="text-white/60 text-sm">Across all shows</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-gold/20 to-haiti-gold/5">
          <div className="flex items-center gap-3 mb-2">
            <Medal className="h-6 w-6 text-haiti-gold" />
            <h3 className="font-semibold text-white">Total Nominees</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">300+</p>
          <p className="text-white/60 text-sm">This season</p>
        </Card>
      </motion.div>
    </div>
  )
};

export default Awards;