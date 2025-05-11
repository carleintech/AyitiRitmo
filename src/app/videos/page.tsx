'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Video,
  Calendar,
  Users,
  GraduationCap,
  TrendingUp,
  Clock,
  Eye
} from 'lucide-react';

const videoCategories = [
  { id: 'latest', label: 'Latest Music Videos', icon: Video },
  { id: 'live', label: 'Live Performances', icon: Users },
  { id: 'behind', label: 'Behind the Scenes', icon: Video },
  { id: 'tutorials', label: 'Tutorials & Workshops', icon: GraduationCap },
];

const featuredVideo = {
  title: "Latest Hit: Artist Performance",
  description: "Watch the official music video for the hottest track in Haiti",
  duration: "4:32",
  views: "125.4K",
  gradient: "from-haiti-red to-haiti-blue",
};

const videoData = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Video Title ${i + 1}`,
  channel: `Artist Name ${i + 1}`,
  duration: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  views: `${(Math.floor(Math.random() * 900) + 100).toFixed(1)}K`,
  date: '2 days ago',
  type: ['Music Video', 'Live Performance', 'Behind the Scenes', 'Tutorial'][i % 4],
  thumbnail: `from-haiti-${['red', 'blue', 'gold'][i % 3]} to-${['orange', 'blue', 'yellow'][i % 3]}-500`,
}));

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState('latest');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Videos</h1>
        <p className="text-white/60">Watch the best of Haitian music and culture</p>
      </motion.div>

      {/* Featured Video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          <div className={`aspect-video bg-gradient-to-br ${featuredVideo.gradient} relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <Play className="h-12 w-12 text-white fill-white ml-2" />
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{featuredVideo.title}</h2>
                  <p className="text-white/80">{featuredVideo.description}</p>
                </div>
                <div className="text-white/60 text-sm space-y-1 text-right">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featuredVideo.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {featuredVideo.views} views
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Video Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-800">
            {videoCategories.map((category) => {
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

          {videoCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videoData.filter(video => 
                  category.id === 'latest' || 
                  video.type.toLowerCase().includes(category.id === 'live' ? 'live performance' : 
                  category.id === 'behind' ? 'behind the scenes' : 
                  category.id === 'tutorials' ? 'tutorial' : '')
                ).map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className={`aspect-video bg-gradient-to-br ${video.thumbnail} relative`}>
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center group">
                        <Play className="h-12 w-12 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="bg-haiti-red text-white text-xs px-2 py-1 rounded">
                          {video.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-white line-clamp-2 mb-1">{video.title}</h3>
                      <p className="text-sm text-white/60 mb-2">{video.channel}</p>
                      <div className="flex justify-between text-xs text-white/50">
                        <span>{video.views} views</span>
                        <span>{video.date}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Trending Videos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-haiti-red" />
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          </div>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            See all
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {videoData.slice(0, 3).map((video, index) => (
            <Card key={video.id} className="flex gap-4 p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
              <div className="flex items-center justify-center w-8">
                <span className="text-2xl font-bold text-haiti-red">#{index + 1}</span>
              </div>
              <div className={`w-40 aspect-video bg-gradient-to-br ${video.thumbnail} rounded relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-sm text-white/60 mb-2">{video.channel}</p>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {video.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {video.date}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Video Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-haiti-red/20 to-haiti-red/5">
          <div className="flex items-center gap-3 mb-2">
            <Video className="h-6 w-6 text-haiti-red" />
            <h3 className="text-lg font-semibold text-white">New this Week</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">24 Videos</p>
          <p className="text-white/60">Fresh content added daily</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-blue/20 to-haiti-blue/5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6 text-haiti-blue" />
            <h3 className="text-lg font-semibold text-white">Live Events</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">8 Upcoming</p>
          <p className="text-white/60">Don't miss live performances</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-gold/20 to-haiti-gold/5">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-6 w-6 text-haiti-gold" />
            <h3 className="text-lg font-semibold text-white">Learning Content</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">15 Tutorials</p>
          <p className="text-white/60">Learn instruments and dances</p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Videos;