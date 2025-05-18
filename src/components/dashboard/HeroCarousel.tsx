"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for the carousel
const carouselItems = [
  {
    id: 1,
    title: "Discover Kompa",
    subtitle: "The Rhythm of Haiti",
    description: "Immerse yourself in the infectious grooves of Haiti's most beloved genre",
    image: "kompa-banner.jpg",
    gradient: "from-blue-900 to-purple-900",
  },
  {
    id: 2,
    title: "Carnival Season",
    subtitle: "Experience the Energy",
    description: "Vibrant sounds and colorful rhythms from Haiti's biggest celebration",
    image: "carnival-banner.jpg",
    gradient: "from-red-800 to-orange-700",
  },
  {
    id: 3,
    title: "Rasin Renaissance",
    subtitle: "Cultural Roots",
    description: "Explore the traditional sounds that connect past and present",
    image: "rasin-banner.jpg",
    gradient: "from-green-800 to-emerald-700",
  },
  {
    id: 4,
    title: "New Releases",
    subtitle: "Fresh Beats",
    description: "The latest tracks from Haiti's hottest artists",
    image: "new-releases-banner.jpg",
    gradient: "from-haiti-blue to-haiti-red",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance the carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  const currentItem = carouselItems[currentIndex];
  
  return (
    <div className="relative h-80 w-full rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`absolute inset-0 bg-gradient-to-r ${currentItem.gradient} flex items-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* We'll use a placeholder gradient until we have actual images */}
            <div className="w-full h-full opacity-30 bg-pattern-dots"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 max-w-3xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-sm text-white/80 font-medium mb-2">{currentItem.subtitle}</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{currentItem.title}</h2>
              <p className="text-white/90 text-lg mb-6">{currentItem.description}</p>
              
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-colors">
                Discover Now
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-1 text-white hover:bg-black/50 transition-colors z-20"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-1 text-white hover:bg-black/50 transition-colors z-20"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}