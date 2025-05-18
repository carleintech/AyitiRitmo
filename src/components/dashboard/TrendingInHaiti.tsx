"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, BarChart2, TrendingUp, TrendingDown } from "lucide-react";

// Define the trending direction type
type TrendingDirection = "up" | "down";

// Define the props interface for each trending item
interface TrendingItemProps {
  title: string;
  artist: string;
  plays: string;
  trending: TrendingDirection;
  position: number;
}

// Sample data for trending songs
const trendingItems: Omit<TrendingItemProps, "position">[] = [
  { title: "BÈLÈ", artist: "Rutshelle Guillaume", plays: "1.2M", trending: "up" },
  { title: "Pa Gen Pwoblèm", artist: "Kai", plays: "890K", trending: "up" },
  { title: "Deklarasyon", artist: "Roody Roodboy", plays: "750K", trending: "down" },
  { title: "Yon Ti Bo", artist: "T-Vice", plays: "620K", trending: "up" },
  { title: "Sa Ou Fè Mwen", artist: "Harmonik", plays: "580K", trending: "up" },
];

export default function TrendingInHaiti() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white">Trending in Haiti</h2>
          <BarChart2 className="text-haiti-gold h-5 w-5" />
        </div>
        <button className="text-white/70 hover:text-white text-sm font-medium">See All</button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
        {trendingItems.map((item, index) => (
          <TrendingItem
            key={index}
            title={item.title}
            artist={item.artist}
            plays={item.plays}
            trending={item.trending}
            position={index + 1}
          />
        ))}
      </div>
    </section>
  );
}

function TrendingItem({ title, artist, plays, trending, position }: TrendingItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="px-4 py-3 flex items-center border-b border-white/10 last:border-none hover:bg-white/10 transition-colors cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-8 flex justify-center">
        {isHovered ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white"
          >
            <Play size={18} fill="currentColor" />
          </motion.button>
        ) : (
          <span className="text-lg font-semibold text-white/70">{position}</span>
        )}
      </div>

      <div className="ml-4 flex-1">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-white/70 text-sm">{artist}</p>
      </div>

      <div className="text-white/70 text-sm mr-4">{plays}</div>

      <div>
        {trending === "up" ? (
          <TrendingUp className="text-green-500 h-4 w-4" />
        ) : (
          <TrendingDown className="text-haiti-red h-4 w-4" />
        )}
      </div>
    </motion.div>
  );
}
