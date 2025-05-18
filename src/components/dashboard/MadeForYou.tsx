"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Sample data for personalized playlists
const personalizedPlaylists = [
  { 
    id: 1, 
    title: "Kompa Mix", 
    description: "Your weekly mix of Haitian kompa music",
    image: "kompa-mix.jpg",
    gradient: "from-blue-700 to-purple-700" 
  },
  { 
    id: 2, 
    title: "Rasin Roots", 
    description: "Traditional Haitian rhythms for your soul",
    image: "rasin-roots.jpg",
    gradient: "from-green-700 to-emerald-700" 
  },
  { 
    id: 3, 
    title: "Rap Kreyòl Flow", 
    description: "The best of modern Haitian hip-hop",
    image: "rap-kreyol.jpg",
    gradient: "from-yellow-600 to-orange-700" 
  },
  { 
    id: 4, 
    title: "Carnival Energy", 
    description: "High-energy beats for your celebration",
    image: "carnival-energy.jpg",
    gradient: "from-haiti-red to-haiti-gold" 
  },
  { 
    id: 5, 
    title: "Discover Haiti",
    description: "Fresh songs we think you'll love",
    image: "discover-haiti.jpg",
    gradient: "from-haiti-blue to-indigo-700" 
  },
];

export default function MadeForYou() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Made For You</h2>
        <button className="text-white/70 hover:text-white text-sm font-medium">See All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {personalizedPlaylists.map((playlist) => (
          <PlaylistCard 
            key={playlist.id} 
            title={playlist.title} 
            description={playlist.description}
            gradient={playlist.gradient}
          />
        ))}
      </div>
    </section>
  );
}

interface PlaylistCardProps {
  title: string;
  description: string;
  gradient: string;
}

function PlaylistCard({ title, description, gradient }: PlaylistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`bg-gradient-to-br ${gradient} rounded-lg overflow-hidden cursor-pointer h-full`}
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="mb-auto">
          <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
        
        <div className="flex justify-end mt-4">
          {isHovered && (
            <motion.button 
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play fill="currentColor" size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}