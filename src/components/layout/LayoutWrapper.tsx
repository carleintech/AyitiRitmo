'use client';

import { usePathname } from 'next/navigation';
import MainNavigation from './MainNavigation';
import Sidebar from './Sidebar';
import MusicPlayer from '@/components/features/MusicPlayer';
import { useMusic } from '@/context/MusicContext';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAuthPage = pathname.startsWith('/auth');
  const { currentSong, isPlaying, togglePlayPause, next, previous } = useMusic();

  if (isHomePage) {
    return <>{children}</>;
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <MainNavigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 pt-16 pb-24">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Music Player */}
      {currentSong && (
        <MusicPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          onNext={next}
          onPrevious={previous}
        />
      )}
    </div>
  );
};

export default LayoutWrapper;