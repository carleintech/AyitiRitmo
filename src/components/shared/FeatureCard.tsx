'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Heart, 
  Play, 
  Music,
  ChevronRight
} from 'lucide-react';
import { FeatureCard as FeatureCardType } from '@/types';

interface FeatureCardProps extends FeatureCardType {
  delay?: number;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon, 
  gradient, 
  href, 
  delay = 0 
}: FeatureCardProps) {
  // Get the appropriate icon component
  const IconComponent = () => {
    switch (icon) {
      case 'heart':
        return <Heart className="h-6 w-6 text-white" />;
      case 'music':
        return <Music className="h-6 w-6 text-white" />;
      case 'play':
      default:
        return <Play className="h-6 w-6 text-white" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <Link href={href} className="block h-full">
        <div 
          className={`${gradient} relative h-full p-6 rounded-xl shadow-lg group overflow-hidden`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg 
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id={`pattern-${title}`}
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.2)" />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill={`url(#pattern-${title})`}
              />
            </svg>
          </div>

          {/* Card content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm w-fit">
              <IconComponent />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 mb-4">{description}</p>
            
            <div className="mt-auto flex items-center text-white group-hover:text-haiti-gold transition-colors">
              <span className="text-sm font-medium">Explore</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Hover effect - animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-haiti-gold/0 to-haiti-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}