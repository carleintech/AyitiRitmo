"use client";

import { motion } from "framer-motion";
import { Info, Calendar, MapPin, Book } from "lucide-react";

export default function CulturalSpotlight() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white">Cultural Spotlight</h2>
          <Info className="text-haiti-gold h-5 w-5" />
        </div>
        <button className="text-white/70 hover:text-white text-sm font-medium">More Cultural Content</button>
      </div>
      
      <div className="bg-gradient-to-r from-haiti-blue/30 to-haiti-red/30 backdrop-blur-sm rounded-lg overflow-hidden p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-haiti-gold text-xl font-bold mb-3">The Roots of Rasin Music</h3>
            <p className="text-white/90 mb-4">
              Rasin music (literally &quot;roots&quot; in Haitian Creole) emerged in the late 1970s as a musical movement 
              that sought to reclaim traditional Haitian rhythms and blend them with modern sounds. Deeply 
              connected to Vodou ceremonial music, Rasin represents the spiritual essence of Haitian culture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <motion.button
                className="bg-haiti-gold text-haiti-blue px-4 py-2 rounded-full font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Book size={18} />
                <span>Learn More</span>
              </motion.button>
              
              <motion.button
                className="bg-white/10 text-white px-4 py-2 rounded-full font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar size={18} />
                <span>Historical Timeline</span>
              </motion.button>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h4 className="text-white text-lg font-semibold mb-3">Essential Listening</h4>
            
            <div className="space-y-2 mb-6">
              <EssentialTrack title="Agwe" artist="RAM" year="1993" />
              <EssentialTrack title="Papa Loko" artist="Boukman Eksperyans" year="1991" />
              <EssentialTrack title="Èzili" artist="Azor" year="1975" />
              <EssentialTrack title="Simbi" artist="Sanba Zao" year="1989" />
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center text-white/80 text-sm gap-2">
                <MapPin size={14} />
                <span>Origin: Port-au-Prince, Haiti</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface EssentialTrackProps {
  title: string;
  artist: string;
  year: string;
}

function EssentialTrack({ title, artist, year }: EssentialTrackProps) {
  return (
    <div className="flex items-center p-2 rounded-md hover:bg-white/10 cursor-pointer transition-colors">
      <div className="w-10 h-10 rounded bg-haiti-gold/20 flex items-center justify-center mr-3">
        <span className="text-haiti-gold">♫</span>
      </div>
      
      <div>
        <h5 className="text-white font-medium">{title}</h5>
        <div className="flex gap-2 text-white/70 text-sm">
          <span>{artist}</span>
          <span>•</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}
