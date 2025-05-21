"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Heart,
  Music,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
// Removed: import { useRouter } from 'next/navigation'; 
import ParticleBackground from '@/components/welcome/ParticleBackground';
import AudioVisualizer from '@/components/welcome/AudioVisualizer';
import { useAuth } from "@/lib/auth-context";

// Feature cards data - Defined once
const features = [
  {
    title: 'Discover',
    description: 'Experience authentic Haitian rhythms',
    icon: 'play',
    gradient: 'bg-gradient-to-br from-haitian-red via-purple-500 to-haitian-blue',
    href: '/explore',
  },
  {
    title: 'Connect',
    description: 'Join our vibrant music community',
    icon: 'heart',
    gradient: 'bg-gradient-to-br from-haitian-red via-orange-500 to-haitian-gold',
    href: '/welcome?signup=true',
  },
  {
    title: 'Create',
    description: 'Support and empower Haitian artists',
    icon: 'music',
    gradient: 'bg-gradient-to-br from-haitian-blue via-purple-600 to-haitian-red',
    href: '/create-playlist', // Will check auth status before navigating
    requiresAuth: true,
  },
];

export default function WelcomePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');

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

    // Capture the current ref value for cleanup
    const currentAudioRef = audioRef.current;

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);

      // Use the captured ref value in cleanup
      if (currentAudioRef) {
        currentAudioRef.pause();
      }
    };
  }, [userInteracted, audioRef]); // Keep the more specific dependency array

  // Function to attempt playing audio
  const playAudio = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.4; // Lower volume
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (e) { // Changed 'error' to 'e' and used it in console.error
      console.error('Auto-play failed. User interaction required.', e);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.error('Play error:', e));
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground isPlaying={isPlaying} />

      {/* Background Music */}
      <audio ref={audioRef} loop src="/audio/welcome-ambient.mp3" className="hidden" preload="auto" />

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
              type: 'spring',
              bounce: 0.3,
            }}
            className="relative mx-auto mb-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 w-full h-full rounded-full bg-haitian-blue/30 blur-xl animate-pulse"></div>
              <Image
                src="/images/logo.png"
                alt="AyitiRitmo Logo"
                width={128}
                height={128}
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
            <span className="text-white relative">
              AYITIRITMO
              <span className="absolute inset-0 blur-sm text-haitian-blue opacity-70">
                AYITIRITMO
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-haitian-blue text-lg md:text-xl font-medium tracking-wider"
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
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="inline-block"
              >
                🎶
              </motion.span>{' '}
              The Haitian Music-verse Revolution{' '}
              <motion.span
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="inline-block"
              >
                🎶
              </motion.span>
            </motion.h2>

            {/* Audio Visualizer */}
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
                  isLoaded={isLoaded}
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
              <Link href="/recommendations">
                <motion.button
                  className="bg-gradient-to-r from-haitian-red to-haitian-blue text-white font-medium rounded-full px-8 py-3 min-w-[200px] text-lg relative group overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-haitian-blue to-haitian-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </Link>

              <Link href="/subscribe">
                <motion.button
                  className="bg-transparent border border-white/20 text-white font-medium rounded-full px-8 py-3 min-w-[200px] text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Subscribe</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-haitian-gold to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </motion.button>
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
            {/* Wavy separator */}
            <div className="relative mb-6 overflow-hidden">
              <svg
                className="w-full h-8 text-haitian-blue"
                viewBox="0 0 1200 40"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,20 Q300,0 600,20 T1200,20 V40 H0 Z"
                  fill="currentColor"
                  animate={{
                    d: [
                      'M0,20 Q300,0 600,20 T1200,20 V40 H0 Z',
                      'M0,20 Q300,40 600,20 T1200,20 V40 H0 Z',
                      'M0,20 Q300,0 600,20 T1200,20 V40 H0 Z',
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="opacity-20"
                />
              </svg>
            </div>

            {/* Footer content with social links */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/60">
              {/* Links */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
                  About
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
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
                  className="hover:text-haitian-blue transition-colors duration-200 hover:scale-110 transform inline-block"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="hover:text-haitian-red transition-colors duration-200 hover:scale-110 transform inline-block"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="hover:text-haitian-gold transition-colors duration-200 hover:scale-110 transform inline-block"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Authentication Modal */}
      {currentView !== 'welcome' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800/90 backdrop-blur-md border border-white/10 rounded-xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {currentView === 'signin' ? 'Welcome Back' : 'Join AyitiRitmo'}
            </h2>

            <form className="space-y-4">
              {currentView === 'signup' && (
                <div>
                  <label className="block text-white text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haitian-gold focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
              )}

              <div>
                <label className="block text-white text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haitian-gold focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haitian-gold focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {currentView === 'signup' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isArtist"
                    className="h-4 w-4 text-haitian-gold focus:ring-haitian-gold rounded"
                  />
                  <label htmlFor="isArtist" className="ml-2 block text-white text-sm">
                    I am an artist
                  </label>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-haitian-blue to-haitian-red text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  {currentView === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setCurrentView(currentView === 'signin' ? 'signup' : 'signin')}
                className="text-haitian-gold hover:underline text-sm"
              >
                {currentView === 'signin'
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentView('welcome')}
                className="text-white/50 hover:text-white text-sm"
              >
                Go back
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// FeatureCard Component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  href: string;
  delay: number;
  isLoaded: boolean;
  requiresAuth?: boolean;
}

function FeatureCard({ title, description, icon, gradient, href, delay, isLoaded, requiresAuth = false }: FeatureCardProps) {
  // Removed: const router = useRouter(); // Router is not used in this component

  const { user } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    if (requiresAuth && !user) {
      e.preventDefault();
      // Show auth modal instead of navigating
      window.history.pushState({}, '', '/welcome?signin=true');
      const customEvent = new CustomEvent('showAuthModal', { detail: { returnPath: href } });
      window.dispatchEvent(customEvent);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`${gradient} rounded-xl p-6 shadow-lg transform transition-transform duration-300 hover:shadow-xl`}
    >
      <Link href={href} className="block h-full" onClick={handleClick}>
        <div className="flex flex-col h-full">
          <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm mb-4">
            {icon === 'play' && <Play className="h-6 w-6 text-white" />}
            {icon === 'heart' && <Heart className="h-6 w-6 text-white" />}
            {icon === 'music' && <Music className="h-6 w-6 text-white" />}
          </div>

          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>

          <div className="mt-auto text-white text-sm font-medium flex items-center">
            <span>Learn more</span>
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
