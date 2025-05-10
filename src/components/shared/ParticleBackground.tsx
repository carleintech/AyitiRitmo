'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  className?: string;
  barCount?: number;
  audioRef?: React.RefObject<HTMLAudioElement>;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  className = '',
  barCount = 50,
  audioRef,
}) => {
  const [bars, setBars] = useState<number[]>(new Array(barCount).fill(20));
  const animationRef = useRef<number>();

  useEffect(() => {
    // Simulate audio wave animation
    const animateBars = () => {
      setBars(prevBars => 
        prevBars.map((bar, index) => {
          const time = Date.now() * 0.001;
          const wave = Math.sin(time + index * 0.15) * 15 + 25;
          return Math.max(15, Math.min(50, wave));
        })
      );
      animationRef.current = requestAnimationFrame(animateBars);
    };

    animateBars();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [barCount]);

  return (
    <div className={`flex items-end justify-center gap-1 h-16 overflow-hidden ${className}`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-1 bg-gradient-to-t from-haiti-red via-haiti-gold to-haiti-blue rounded-full transition-all duration-100 ease-out"
          style={{
            height: `${height}px`,
            transform: `translateY(${50 - height}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;