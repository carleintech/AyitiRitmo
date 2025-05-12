'use client';

import { usePathname } from 'next/navigation';
import MainNavigation from './MainNavigation';
import Sidebar from './Sidebar';
import { MusicPlayer } from '@/components/features/MusicPlayer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register'];

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation */}
        <MainNavigation />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">
          {children}
        </main>
      </div>

      {/* Music Player - Always visible when logged in */}
      <MusicPlayer />
    </div>
  );
}