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
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch {
        console.log('Auto-play failed. User interaction required.');
      }
    };

    const timer = setTimeout(playAudio, 500);
    return () => {
      clearTimeout(timer);
      audioRef.current?.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-900 via-navy-900 to-slate-800 overflow-hidden flex flex-col">
      {/* Background Effects */}
      <ParticleBackground />

      {/* Background Audio */}
      <audio ref={audioRef} loop src="/sounds/haitian-beat.mp3" className="hidden" />

      {/* Main Page Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-10 pb-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="relative mx-auto mb-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/images/logo.png"
                alt="AyitiRitmo Logo"
                fill
                className="object-contain animate-pulse-neon"
                priority
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-2"
          >
            <span className="neon-text">AYITIRTMO</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-haiti-blue text-lg md:text-xl font-medium"
          >
            HAITIAN MUSIC
          </motion.p>
        </motion.header>

        {/* Body Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center text-2xl md:text-3xl font-bold text-white mb-8"
          >
            🎶 The Haitian Music-verse Revolution 🎶
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-12 min-h-[100px]"
          >
            <AudioVisualizer audioRef={audioRef} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4 mb-12 min-h-[300px]">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={1.1 + index * 0.2} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={ROUTES.DASHBOARD}>
              <Button className="btn-haiti min-w-[200px]">Get Started</Button>
            </Link>
            <Link href={ROUTES.SUBSCRIBE}>
              <Button
                variant="outline"
                className="min-w-[200px] border-white/20 text-white hover:bg-white/10"
              >
                Subscribe
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-8"
          >
            <button
              onClick={toggleAudio}
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              {isPlaying ? '🔊 Click to pause music' : '🔇 Click to play music'}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto">
        {/* Wavy separator (stabilized) */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          transition={{ duration: 0 }}
          className="pointer-events-none select-none"
        >
          <svg className="w-full h-8 mb-6" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path
              d="M0,20 Q300,0 600,20 T1200,20 V40 H0 Z"
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 pb-8 text-white/60 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <p className="text-xs">&copy; {new Date().getFullYear()} AyitiRitmo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
