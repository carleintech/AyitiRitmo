"use client";

import { useState } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  ListMusic 
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDuration } from "@/lib/utils";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // percentage of track progress
  const [duration, setDuration] = useState(215); // duration in seconds
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(e.target.value));
  };
  
  const currentTime = Math.floor((progress / 100) * duration);
  
  return (
    <div className="h-20 bg-black/50 backdrop-blur-md border-t border-white/10 text-white flex items-center px-4">
      <div className="w-1/4 flex items-center">
        <div className="h-12 w-12 bg-haiti-gold rounded-md mr-3 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-haiti-blue to-haiti-red flex items-center justify-center">
            <span className="text-white text-xs">ART</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-white text-sm font-semibold">Song Title</h4>
          <p className="text-white/70 text-xs">Artist Name</p>
        </div>
      </div>
      
      <div className="w-2/4 flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-2">
          <button className="text-white/70 hover:text-white">
            <Shuffle className="h-4 w-4" />
          </button>
          
          <button className="text-white/70 hover:text-white">
            <SkipBack className="h-5 w-5" />
          </button>
          
          <motion.button
            className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-haiti-blue"
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </motion.button>
          
          <button className="text-white/70 hover:text-white">
            <SkipForward className="h-5 w-5" />
          </button>
          
          <button className="text-white/70 hover:text-white">
            <Repeat className="h-4 w-4" />
          </button>
        </div>
        
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-white/70">{formatDuration(currentTime)}</span>
          
          <div className="relative w-full h-1 bg-white/20 rounded-full">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div 
              className="h-full bg-haiti-gold rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <span className="text-xs text-white/70">{formatDuration(duration)}</span>
        </div>
      </div>
      
      <div className="w-1/4 flex items-center justify-end space-x-4">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-white/70" />
          
          <div className="relative w-20 h-1 bg-white/20 rounded-full">
            <div className="h-full w-3/4 bg-white/60 rounded-full" />
          </div>
        </div>
        
        <button className="text-white/70 hover:text-white">
          <ListMusic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}