"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

export default function AudioVisualizer({ audioRef }: AudioVisualizerProps) {
  const [audioData, setAudioData] = useState<number[]>(Array(30).fill(0));
  const animationRef = useRef<number>();

  useEffect(() => {
    const audioElem = audioRef.current;
    let audioContext: AudioContext | undefined;
    let analyzer: AnalyserNode;
    let dataArray: Uint8Array;

    const setupAudio = () => {
      if (!audioElem) return;

      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      audioContext = new AudioContextClass();

      analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 64;

      const source = audioContext.createMediaElementSource(audioElem);
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);

      const bufferLength = analyzer.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
    };

    const updateAudioData = () => {
      if (!analyzer) return;

      analyzer.getByteFrequencyData(dataArray);

      const newData = Array.from(dataArray.slice(0, 30)).map(
        (value) => value / 255
      );
      setAudioData(newData);

      animationRef.current = requestAnimationFrame(updateAudioData);
    };

    const handlePlay = () => {
      if (!analyzer) {
        setupAudio();
      }
      updateAudioData();
    };

    const handlePause = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    if (audioElem) {
      audioElem.addEventListener("play", handlePlay);
      audioElem.addEventListener("pause", handlePause);
    }

    return () => {
      if (audioElem) {
        audioElem.removeEventListener("play", handlePlay);
        audioElem.removeEventListener("pause", handlePause);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioRef]);

  if (audioData.every((value) => value === 0)) {
    return (
      <div className="h-20 bg-black/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center">
        <h3 className="text-white/70 text-center">
          Experience the rhythm of Haitian music...
        </h3>
      </div>
    );
  }

  return (
    <div className="h-20 bg-black/20 backdrop-blur-sm rounded-lg p-4 flex items-center">
      <div className="w-full flex items-end justify-between h-full gap-1">
        {audioData.map((value, index) => (
          <motion.div
            key={index}
            className="w-full bg-gradient-to-t from-haiti-blue via-haiti-gold to-haiti-red rounded-sm"
            style={{
              height: `${Math.max(5, value * 100)}%`,
            }}
            animate={{
              height: `${Math.max(5, value * 100)}%`,
            }}
            transition={{
              duration: 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
