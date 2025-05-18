"use client";

import { motion } from "framer-motion";

// Sample data for genre exploration
const genres = [
  { id: 1, name: "Kompa", color: "bg-haiti-blue" },
  { id: 2, name: "Rasin", color: "bg-green-700" },
  { id: 3, name: "Zouk", color: "bg-purple-700" },
  { id: 4, name: "Rap Kreyòl", color: "bg-yellow-600" },
  { id: 5, name: "Twoubadou", color: "bg-teal-700" },
  { id: 6, name: "Rara", color: "bg-haiti-red" },
  { id: 7, name: "Gospel", color: "bg-blue-600" },
  { id: 8, name: "Carnival", color: "bg-haiti-gold text-haiti-blue" },
];

export default function GenreExploration() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Explore Genres</h2>
        <button className="text-white/70 hover:text-white text-sm font-medium">See All</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {genres.map((genre) => (
          <GenreCard 
            key={genre.id} 
            name={genre.name} 
            color={genre.color} 
          />
        ))}
      </div>
    </section>
  );
}

interface GenreCardProps {
  name: string;
  color: string;
}

function GenreCard({ name, color }: GenreCardProps) {
  return (
    <motion.div 
      className={`${color} rounded-lg overflow-hidden cursor-pointer aspect-square flex items-center justify-center`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`font-bold text-white`}>
        {name}
      </span>
    </motion.div>
  );
}