// src/components/layout/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import MainNavigation from './MainNavigation';
import Sidebar from './Sidebar';
import { MusicPlayer } from '@/components/features/MusicPlayer';
import MiniMusicPlayer from '@/components/features/MiniMusicPlayer'; // for default export
import { useMusic } from '@/context/MusicContext';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [miniPlayerVisible, setMiniPlayerVisible] = useState(false);
  const { currentSong } = useMusic();
  
  // Pages that should not use the layout
  const excludedPaths = ['/', '/auth/login', '/auth/register'];
  const shouldRenderLayout = !excludedPaths.includes(pathname);

  // Show mini player on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 100) {
        setMiniPlayerVisible(true);
      } else if (e.clientY < window.innerHeight - 150) {
        setMiniPlayerVisible(false);
      }
    };

    if (shouldRenderLayout && currentSong) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shouldRenderLayout, currentSong]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!shouldRenderLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - with animation for opening/closing */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 transition-all duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 md:translate-x-0 md:w-20'
        }`}
      >
        <Sidebar isCollapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <MainNavigation />
        <main className="flex-1 overflow-y-auto p-6 pt-24">
          {children}
        </main>
        
        {/* Full Music Player (always in DOM but visually hidden) */}
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <MusicPlayer />
        </div>
        
        {/* Mini Music Player (shows on hover near bottom) */}
        {currentSong && (
          <div 
            className={`fixed right-8 bottom-8 z-20 transition-all duration-300 ${
              miniPlayerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <MiniMusicPlayer />
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutWrapper;