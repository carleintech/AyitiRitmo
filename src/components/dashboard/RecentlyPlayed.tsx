"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, MoreHorizontal } from "lucide-react";

// Sample data for recently played
const recentlyPlayedItems = [
  { id: 1, title: "Dekole", artist: "Boukman Eksperyans", image: "song1.jpg" },
  { id: 2, title: "Pa Manyen Fanm Nan", artist: "Sweet Micky", image: "song2.jpg" },
  { id: 3, title: "Ayizan", artist: "RAM", image: "song3.jpg" },
  { id: 4, title: "Nou Nan Malè", artist: "Tabou Combo", image: "song4.jpg" },
  { id: 5, title: "Koupe Kann", artist: "Tropicana", image: "song5.jpg" },
  { id: 6, title: "Ban'm Passé", artist: "T-Vice", image: "song6.jpg" },
];

export default function RecentlyPlayed() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Recently Played</h2>
        <button className="text-white/70 hover:text-white text-sm font-medium">See All</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recentlyPlayedItems.map((item) => (
          <SongCard 
            key={item.id} 
            title={item.title} 
            artist={item.artist} 
            image={item.image} 
          />
        ))}
      </div>
    </section>
  );
}

interface SongCardProps {
  title: string;
  artist: string;
  image: string;
}

function SongCard({ title, artist, image }: SongCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="bg-white/5 rounded-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-gradient-to-br from-haiti-blue/40 to-haiti-red/40">
        {/* Until we have actual images, we'll use colored placeholders */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl text-white/30">♫</span>
        </div>
        
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button 
              className="bg-haiti-gold rounded-full p-3 text-haiti-blue"
              whileTap={{ scale: 0.95 }}
            >
              <Play fill="currentColor" size={24} />
            </motion.button>
          </motion.div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="text-white font-medium truncate">{title}</h3>
        <p className="text-white/70 text-sm truncate">{artist}</p>
      </div>
    </motion.div>
  );
}