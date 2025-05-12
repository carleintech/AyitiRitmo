'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioRef }) => {
  const [audioData, setAudioData] = useState<number[]>(new Array(40).fill(0));
  const rafRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isSetupCompleteRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current) return;

    const handlePlay = () => {
      setIsPlaying(true);
      if (!isSetupCompleteRef.current) {
        setupAnalyser();
      } else if (analyserRef.current && dataArrayRef.current) {
        // If already set up, just restart animation loop
        tick();
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Clean up AudioContext and connections
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [audioRef]);

  const setupAnalyser = () => {
    if (!audioRef.current) return;
    
    // If setup is already complete, don't recreate
    if (isSetupCompleteRef.current) return;

    try {
      // Create AudioContext
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      // Create media element source
      const source = audioContext.createMediaElementSource(audioRef.current);
      sourceRef.current = source;
      
      // Create analyser
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      
      // Connect source to analyser and then to destination
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      // Create data array for frequency data
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      // Store references
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      
      // Mark setup as complete
      isSetupCompleteRef.current = true;
      
      // Start animation
      tick();
    } catch (error) {
      console.error("Error setting up audio visualizer:", error);
      
      // Fallback to animation without audio analysis
      setIsPlaying(false);
    }
  };

  const tick = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    // Get frequency data
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Only use a subset of the data for visualization
    const barCount = 40;
    const step = Math.floor(dataArrayRef.current.length / barCount);
    const bars = Array.from({ length: barCount }, (_, i) => {
      const index = i * step;
      // Normalize the value between 0 and 1
      return dataArrayRef.current![index] / 255;
    });
    
    setAudioData(bars);
    
    // Continue animation loop
    rafRef.current = requestAnimationFrame(tick);
  };

  const fallbackAnimation = (index: number) => {
    return {
      height: [
        `${Math.random() * 30 + 10}%`,
        `${Math.random() * 60 + 20}%`,
        `${Math.random() * 30 + 10}%`,
      ],
      transition: {
        duration: Math.random() * 2 + 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: index * 0.05,
      }
    };
  };

  return (
    <div className="w-full h-24 bg-gradient-to-r from-haiti-blue/10 to-haiti-red/10 rounded-lg p-4 flex items-end justify-center gap-1">
      {audioData.map((value, index) => (
        <motion.div
          key={index}
          className="w-[2%] bg-gradient-to-t from-haiti-blue to-haiti-red rounded-t-sm"
          animate={
            isPlaying 
              ? { height: `${Math.max(3, value * 100)}%` }
              : fallbackAnimation(index)
          }
          transition={
            isPlaying 
              ? { duration: 0.1 } 
              : {}
          }
          initial={{ height: "10%" }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;