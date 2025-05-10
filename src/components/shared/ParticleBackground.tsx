'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { 
  type Container, 
  type ISourceOptions,
  MoveDirection,
  OutMode 
} from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

interface ParticleBackgroundProps {
  className?: string;
  theme?: 'dark' | 'light';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  className = '', 
  theme = 'dark' 
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = useMemo(() => ({
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: [
          '#00FFFF', // Neon Blue
          '#FF00FF', // Neon Pink
          '#00148E', // Haiti Blue
          '#CD4028', // Haiti Red
          '#F4A460', // Gold
        ],
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: ['circle', 'triangle'],
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 20,
          minimumValue: 0.1,
        },
      },
    },
    detectRetina: true,
  }), []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // Particle container loaded
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={particlesOptions}
      className={`fixed inset-0 pointer-events-none z-0 opacity-30 ${className}`}
    />
  );
};

export default ParticleBackground;