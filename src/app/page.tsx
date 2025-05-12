'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/shared/ParticleBackground';
import AudioVisualizer from '@/components/shared/AudioVisualizer';
import FeatureCard from '@/components/shared/FeatureCard';
import { ROUTES } from '@/lib/utils';
import { FeatureCard as FeatureCardType } from '@/types';

// Updated routes for the feature cards
const features: FeatureCardType[] = [
  {
    title: 'Discover',
    description: 'Experience authentic Haitian rhythms',
    icon: 'play',
    gradient: 'bg-gradient-to-br from-haiti-red via-purple-500 to-haiti-blue',
    href: ROUTES.EXPLORE,
  },
  {
    title: 'Connect',
    description: 'Join our vibrant music community',
    icon: 'heart',
    gradient: 'bg-gradient-to-br from-haiti-red via-orange-500 to-haiti-gold',
    href: ROUTES.AUTH_REGISTER, // Changed to direct to register page
  },
  {
    title: 'Create',
    description: 'Support and empower Haitian artists',
    icon: 'music',
    gradient: 'bg-gradient-to-br from-haiti-blue via-purple-600 to-neon-pink',
    href: ROUTES.CREATE_PLAYLIST, // New route for create playlist (will require auth)
  },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Mark as loaded for animations to start
    setIsLoaded(true);
    
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        playAudio();
      }
    };

    // Add event listeners to detect user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [userInteracted]);

  // Function to attempt playing audio
  const playAudio = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.4; // Lower volume
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Auto-play failed. User interaction required.');
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.error("Play error:", e));
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      
      {/* Background Music */}
      <audio 
        ref={audioRef}
        loop
        src="/sounds/haitian-beat.mp3"
        className="hidden"
        preload="auto"
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="pt-10 pb-8 text-center"
        >
          {/* Logo with enhanced glow effect */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: isLoaded ? 1 : 0.5 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              bounce: 0.3
            }}
            className="relative mx-auto mb-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 w-full h-full rounded-full bg-haiti-blue/30 blur-xl animate-pulse"></div>
              <Image
                src="/images/logo.png"
                alt="AyitiRitmo Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(65,105,225,0.8)]"
                priority
              />
            </div>
          </motion.div>

          {/* Brand Text with enhanced neon effect */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-3 relative"
          >
            <span className="neon-text relative">
              AYITIRITMO
              <span className="absolute inset-0 blur-sm text-haiti-blue opacity-70">AYITIRITMO</span>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-haiti-blue text-lg md:text-xl font-medium tracking-wider"
          >
            HAITIAN MUSIC
          </motion.p>
        </motion.header>

        {/* Main Content */}
        <main className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Title with floating effect */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-center text-2xl md:text-3xl font-bold text-white mb-10 relative"
            >
              <motion.span
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                🎶
              </motion.span>{" "}
              The Haitian Music-verse Revolution{" "}
              <motion.span
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 1
                }}
                className="inline-block"
              >
                🎶
              </motion.span>
            </motion.h2>

            {/* Audio Visualizer - Only the wave should move, not text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mb-16 flex justify-center"
            >
              <div className="max-w-md w-full">
                <AudioVisualizer audioRef={audioRef} />
              </div>
            </motion.div>

            {/* Feature Cards with enhanced hover effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  delay={1.1 + index * 0.2}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              {/* Updated to direct to dashboard */}
              <Link href={ROUTES.DASHBOARD}>
                <Button className="btn-haiti min-w-[200px] text-lg py-4 relative group overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-haiti-red to-haiti-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
              
              {/* Updated to direct to subscribe page */}
              <Link href={ROUTES.SUBSCRIBE}>
                <Button 
                  variant="outline" 
                  className="min-w-[200px] text-lg py-4 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">Subscribe</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-haiti-gold to-haiti-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
              </Link>
            </motion.div>

            {/* Audio Control with enhanced UI */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-center"
            >
              <button
                onClick={toggleAudio}
                className="text-white/50 hover:text-white transition-colors text-sm inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10"
              >
                {isPlaying ? (
                  <>
                    <span className="animate-pulse">🔊</span>
                    <span>Music Playing</span>
                  </>
                ) : (
                  <>
                    <span>🔇</span>
                    <span>Click to play music</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </main>

        {/* Fixed Footer with enhanced styling */}
        <footer className="mt-auto py-8 border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
            {/* Wavy separator - only this should animate, not text */}
            <div className="relative mb-6 overflow-hidden">
              <svg 
                className="w-full h-8 text-haiti-blue" 
                viewBox="0 0 1200 40" 
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,20 Q300,0 600,20 T1200,20 V40 H0 Z"
                  fill="currentColor"
                  animate={{ 
                    d: [
                      "M0,20 Q300,0 600,20 T1200,20 V40 H0 Z",
                      "M0,20 Q300,40 600,20 T1200,20 V40 H0 Z", 
                      "M0,20 Q300,0 600,20 T1200,20 V40 H0 Z"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="opacity-20"
                />
              </svg>
            </div>

            {/* Footer content with social links */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/60">
              {/* Links */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <Link href="/about" className="hover:text-white transition-colors duration-200 hover:underline">
                  About
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors duration-200 hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200 hover:underline">
                  Privacy
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-center text-sm">
                <p>© 2025 AyitiRitmo – Celebrating Haitian Culture Through Music.</p>
              </div>

              {/* Social Links with animations */}
              <div className="flex gap-6">
                <Link 
                  href="#" 
                  className="hover:text-haiti-blue transition-colors duration-200 hover:scale-110 transform inline-block"
                  aria-label="Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="hover:text-haiti-red transition-colors duration-200 hover:scale-110 transform inline-block"
                  aria-label="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="hover:text-haiti-gold transition-colors duration-200 hover:scale-110 transform inline-block"
                  aria-label="Twitter"
                >
                  <span className="sr-only">Twitter</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}