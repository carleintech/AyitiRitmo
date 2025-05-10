'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Play, 
  Heart, 
  Music,
  LucideIcon
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: 'play' | 'heart' | 'music';
  gradient: string;
  href: string;
  delay?: number;
}

const ICONS: Record<string, LucideIcon> = {
  play: Play,
  heart: Heart,
  music: Music,
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  gradient,
  href,
  delay = 0,
}) => {
  const Icon = ICONS[icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        bounce: 0.3,
        damping: 20
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href}>
        <div className={`relative overflow-hidden rounded-2xl p-8 h-full ${gradient} group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300`}>
          {/* Background hover effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Icon */}
          <div className="relative z-10 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-white/80 text-sm group-hover:text-white/70 transition-colors duration-300">
              {description}
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:bg-white/10 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:bg-white/10 transition-colors duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;