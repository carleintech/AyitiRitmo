'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Palette,
  Camera,
  BookOpen,
  Drum,
  Globe,
  MapPin,
  Calendar,
  Play,
  ArrowRight,
  Users,
  Music
} from 'lucide-react';

const culturalTopics = [
  {
    title: 'The History of Konpa',
    description: 'Explore the origins and evolution of Haiti\'s most popular dance music',
    category: 'Music History',
    image: 'from-haiti-red to-orange-500',
    readTime: '5 min read',
  },
  {
    title: 'Voodoo and Music',
    description: 'The spiritual connection between Vodou traditions and Haitian rhythms',
    category: 'Spiritual Culture',
    image: 'from-purple-600 to-pink-500',
    readTime: '7 min read',
  },
  {
    title: 'Carnival Through the Ages',
    description: 'From colonial times to modern celebrations',
    category: 'Traditions',
    image: 'from-orange-500 to-red-500',
    readTime: '8 min read',
  },
  {
    title: 'Haitian Instruments',
    description: 'Traditional instruments that shape our music',
    category: 'Instruments',
    image: 'from-haiti-blue to-blue-500',
    readTime: '6 min read',
  },
];

const featuredEvents = [
  {
    id: 1,
    title: 'Virtual Carnival Workshop',
    date: 'May 20, 2024',
    type: 'Workshop',
    description: 'Learn traditional Carnival dances from master choreographers',
    participants: 156,
    image: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    title: 'Haitian Art Exhibition',
    date: 'June 15-30, 2024',
    type: 'Exhibition',
    description: 'Celebrating Haiti\'s vibrant visual arts scene',
    participants: 45,
    image: 'from-haiti-blue to-purple-500',
  },
  {
    id: 3,
    title: 'Traditional Instrument Masterclass',
    date: 'July 10, 2024',
    type: 'Masterclass',
    description: 'Learn to play the lambi, tanbou, and maracas',
    participants: 89,
    image: 'from-haiti-gold to-green-500',
  },
];

const culturalHeritage = [
  {
    name: 'Rara Music',
    description: 'Street festival music during Holy Week',
    icon: Drum,
    color: 'from-haiti-red to-orange-500',
  },
  {
    name: 'Méringue',
    description: 'Haiti\'s national dance and music style',
    icon: Music,
    color: 'from-haiti-blue to-blue-500',
  },
  {
    name: 'Kreyòl Language',
    description: 'The heart of Haitian identity',
    icon: BookOpen,
    color: 'from-purple-600 to-pink-500',
  },
  {
    name: 'Traditional Art',
    description: 'Vodou flags, metal art, and paintings',
    icon: Palette,
    color: 'from-haiti-gold to-yellow-500',
  },
];

const Culture = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Haitian Culture</h1>
        <p className="text-white/60">Discover Haiti's rich culture through music & art</p>
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-haiti-red via-haiti-blue to-haiti-gold">
          <div className="p-8 relative">
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Cultural Heritage Month</h2>
                <p className="text-white/90 mb-6">Celebrating 200+ years of Haitian music and traditions</p>
                <Button className="bg-white text-haiti-red hover:bg-white/90">
                  <Camera className="h-4 w-4 mr-2" />
                  Explore Heritage
                </Button>
              </div>
              <div className="hidden md:block opacity-30">
                <Palette className="h-48 w-48 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Cultural Topics */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            View All Articles <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {culturalTopics.map((topic, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className={`h-48 bg-gradient-to-br ${topic.image} relative`}>
                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {topic.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {topic.readTime}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{topic.title}</h3>
                <p className="text-white/60 text-sm line-clamp-2">{topic.description}</p>
                <Button variant="ghost" className="mt-3 text-haiti-blue hover:text-haiti-red px-0">
                  Read More <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Cultural Heritage Icons */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Cultural Heritage</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {culturalHeritage.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.name} className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-white/60">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </motion.section>

      {/* Upcoming Cultural Events */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Upcoming Cultural Events</h2>
        <div className="grid grid-cols-1 gap-4">
          {featuredEvents.map((event) => (
            <Card key={event.id} className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
              <div className="flex gap-6">
                <div className={`w-32 h-24 bg-gradient-to-br ${event.image} rounded-lg flex-shrink-0 flex items-center justify-center`}>
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-haiti-blue/20 text-haiti-blue px-2 py-1 rounded">
                          {event.type}
                        </span>
                        <span className="text-sm text-white/60">{event.date}</span>
                      </div>
                      <h3 className="font-bold text-white">{event.title}</h3>
                      <p className="text-white/60 text-sm">{event.description}</p>
                    </div>
                    <Button className="bg-haiti-red hover:bg-haiti-red/90">
                      RSVP
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-sm text-white/50">
                    <Users className="h-3 w-3" />
                    <span>{event.participants} participants registered</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Video Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Carnival & Festival Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white fill-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  5:32
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white line-clamp-1">Carnival {i}</h3>
                <p className="text-sm text-white/60">Traditional Haitian celebration</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                  <span>125K views</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Traditional Instruments & Dances */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Traditional Instruments & Dances</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Lambi (Conch Shell)', 'Tanbou (Drums)', 'Maracas', 'Gong'].map((instrument) => (
            <Card key={instrument} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-haiti-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Drum className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-medium text-white">{instrument}</h3>
              <Button variant="ghost" size="sm" className="mt-2 text-haiti-blue hover:text-haiti-red text-sm">
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Cultural Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-haiti-red/20 to-haiti-red/5">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-6 w-6 text-haiti-red" />
            <h3 className="font-semibold text-white">Global Diaspora</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">2.3M+</p>
          <p className="text-white/60 text-sm">Haitians worldwide celebrating culture</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-blue/20 to-haiti-blue/5">
          <div className="flex items-center gap-3 mb-2">
            <Music className="h-6 w-6 text-haiti-blue" />
            <h3 className="font-semibold text-white">Music Genres</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">12+</p>
          <p className="text-white/60 text-sm">Distinct Haitian music styles</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-gold/20 to-haiti-gold/5">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-haiti-gold" />
            <h3 className="font-semibold text-white">Annual Festivals</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">50+</p>
          <p className="text-white/60 text-sm">Cultural celebrations yearly</p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Culture;