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
  const animationRef = useRef<number>(null);

  const calculateBarHeight = () => {
    return Math.floor(Math.random() * 80) + 20;
  };

  useEffect(() => {
    // Simulate audio wave animation
    const animateBars = () => {
      setBars(prevBars =>
        prevBars.map(calculateBarHeight)
      );
      animationRef.current = requestAnimationFrame(animateBars);
    };

    animationRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current as number);
      }
    };
  }, [barCount]);

  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className="audio-bar"
          data-height={height}
          data-delay={index}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;