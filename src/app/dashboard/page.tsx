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

const Dashboard = () => {
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
                  <Button className="bg-haiti-gold hover:bg-haiti-gold/90 text-black">
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
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-haiti-red to-haiti-blue rounded-lg mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <h3 className="font-medium text-white line-clamp-1">Song Title {i}</h3>
                <p className="text-sm text-white/60 line-clamp-1">Artist Name</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-haiti-blue to-haiti-gold rounded flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">Song Title {i}</h3>
                    <p className="text-sm text-white/60">Artist Name • Album Name</p>
                  </div>
                  <div className="text-sm text-white/60">3:45</div>
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