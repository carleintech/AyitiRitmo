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
    href: ROUTES.DASHBOARD,
  },
  {
    title: 'Create',
    description: 'Support and empower Haitian artists',
    icon: 'music',
    gradient: 'bg-gradient-to-br from-haiti-blue via-purple-600 to-neon-pink',
    href: ROUTES.ARTIST,
  },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Auto-play audio when component mounts
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Auto-play failed. User interaction required.');
      }
    };

    // Delay to ensure everything is loaded
    const timer = setTimeout(playAudio, 500);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-10 pb-8 text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              bounce: 0.3
            }}
            className="relative mx-auto mb-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/images/logo.png"
                alt="AyitiRitmo Logo"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                priority
              />
            </div>
          </motion.div>

          {/* Brand Text */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-3"
          >
            <span className="neon-text">AYITIRITMO</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-haiti-blue text-lg md:text-xl font-medium tracking-wider"
          >
            HAITIAN MUSIC
          </motion.p>
        </motion.header>

        {/* Main Content */}
        <main className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-center text-2xl md:text-3xl font-bold text-white mb-10"
            >
              🎶 The Haitian Music-verse Revolution 🎶
            </motion.h2>

            {/* Audio Visualizer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mb-16 flex justify-center"
            >
              <div className="max-w-md w-full">
                <AudioVisualizer audioRef={audioRef} />
              </div>
            </motion.div>

            {/* Feature Cards */}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <Link href={ROUTES.DASHBOARD}>
                <Button className="btn-haiti min-w-[200px] text-lg py-4">
                  Get Started
                </Button>
              </Link>
              <Link href={ROUTES.SUBSCRIBE}>
                <Button 
                  variant="outline" 
                  className="min-w-[200px] text-lg py-4 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </Link>
            </motion.div>

            {/* Audio Control */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-center"
            >
              <button
                onClick={toggleAudio}
                className="text-white/50 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <span>🔊</span>
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

        {/* Fixed Footer */}
        <footer className="mt-auto py-8 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            {/* Wavy separator - decorative only */}
            <div className="relative mb-6">
              <svg className="w-full h-8 opacity-20" viewBox="0 0 1200 40" preserveAspectRatio="none">
                <path
                  d="M0,20 Q300,0 600,20 T1200,20 V40 H0 Z"
                  fill="currentColor"
                  className="text-haiti-blue"
                />
              </svg>
            </div>

            {/* Footer content */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/60">
              {/* Links */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-center text-sm">
                <p>© 2024 AyitiRitmo – Celebrating Haitian Culture Through Music.</p>
              </div>

              {/* Social Links */}
              <div className="flex gap-6">
                <Link 
                  href="#" 
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  Facebook
                </Link>
                <Link 
                  href="#" 
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  Instagram
                </Link>
                <Link 
                  href="#" 
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  Twitter
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}