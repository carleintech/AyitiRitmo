"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getTimeBasedGreeting } from '@/lib/utils';
import ParticleBackground from './ParticleBackground';
import AuthenticationForm from '../auth/AuthenticationForm';

type View = 'welcome' | 'signin' | 'signup' | 'explore';

export default function WelcomePage() {
  const [interactionStarted, setInteractionStarted] = useState(false);
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeBasedGreeting, setTimeBasedGreeting] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Set the time-based greeting
  useEffect(() => {
    setTimeBasedGreeting(getTimeBasedGreeting());
  }, []);
  
  // Handle the first interaction
  const handleFirstInteraction = () => {
    if (!interactionStarted) {
      setInteractionStarted(true);
      
      // Start ambient music with fade in
      if (audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log("Autoplay prevented - user must interact with the page first");
        });
        
        const fadeIn = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.2) {
            audioRef.current.volume += 0.01;
          } else {
            clearInterval(fadeIn);
          }
        }, 100);
        
        setIsPlaying(true);
      }
    }
  };
  
  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-haiti-blue to-haiti-red"
      onClick={handleFirstInteraction}
    >
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio/welcome-ambient.mp3"
        loop
        className="hidden"
      />
      
      {/* Particle background */}
      <ParticleBackground isPlaying={isPlaying} />
      
      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 2, 
            type: "spring",
            bounce: 0.4
          }}
          className="mb-8 relative"
        >
          <Image 
            src="/images/logo.png" 
            alt="AyitiRitmo" 
            width={240} 
            height={240}
            className="relative z-20"
          />
          
          {/* Rhythm circles around logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 rounded-full border-2 border-opacity-20"
                style={{ 
                  width: `${(i+1) * 50}px`, 
                  height: `${(i+1) * 50}px`,
                  borderColor: i % 2 === 0 ? 'rgba(0,32,159,0.3)' : 'rgba(210,16,52,0.3)',
                  x: "-50%",
                  y: "-50%"
                }}
                animate={{
                  rotate: isPlaying ? 360 : 0,
                  scale: isPlaying ? [1, 1.02, 1] : 1,
                }}
                transition={{
                  rotate: { duration: 20 + i * 5, ease: "linear", repeat: Infinity },
                  scale: { 
                    duration: 2 + i * 0.5, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    delay: i * 0.2
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Welcome text with animation */}
        {currentView === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {timeBasedGreeting}
            </h1>
            <p className="text-xl text-white/80">
              Discover the Rhythm of Haiti
            </p>
          </motion.div>
        )}
        
        {/* Authentication views */}
        {(currentView === 'signin' || currentView === 'signup') && (
          <AuthenticationForm 
            mode={currentView} 
            setCurrentView={setCurrentView as (view: string) => void} 
          />
        )}
        
        {/* Action buttons */}
        {currentView === 'welcome' && (
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-haiti-blue to-indigo-600 rounded-full text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView('signin')}
            >
              Sign In
            </motion.button>
            
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-haiti-red to-orange-500 rounded-full text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView('signup')}
            >
              Sign Up
            </motion.button>
            
            <Link href="/explore">
              <motion.button
                className="px-8 py-3 bg-transparent border-2 border-white/50 rounded-full text-white font-medium text-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore
              </motion.button>
            </Link>
          </motion.div>
        )}
        
        {/* Language selector */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          {['kr', 'en', 'fr', 'es'].map((lang) => (
            <button
              key={lang}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-white/10"
            >
              <span className="text-white">{lang.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Ambient sound visualizer */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-16 flex items-end justify-center gap-[2px]">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-haiti-blue to-haiti-red rounded-t opacity-70"
              animate={{
                height: isPlaying ? Math.random() * 50 + 5 : 5,
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.01,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}