// src/components/layout/Sidebar.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  LibraryBig, 
  PlusCircle, 
  Heart, 
  LogOut,
  User,
  Music,
  ChevronLeft,
  ChevronRight,
  ListMusic
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMusic } from '@/context/MusicContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { currentSong } = useMusic();

  const handleLogout = async () => {
    // Implement logout logic here
    router.push('/auth/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/dashboard/library', label: 'Your Library', icon: LibraryBig },
    { href: '/dashboard/playlists', label: 'Playlists', icon: ListMusic },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const variants = {
    expanded: { width: 'auto' },
    collapsed: { width: '3rem' }
  };

  return (
    <motion.div 
      initial={false} 
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      className="flex flex-col h-full bg-gradient-to-b from-haitian-blue-900 to-haitian-blue-950 text-white p-4 relative"
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed ? (
          <Link href="/dashboard">
            <div className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="AyitiRitmo" 
                width={40} 
                height={40} 
                className="mr-2" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-haitian-red to-haitian-gold bg-clip-text text-transparent">
                AyitiRitmo
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/dashboard">
            <Image 
              src="/images/logo.png" 
              alt="AyitiRitmo" 
              width={36} 
              height={36} 
            />
          </Link>
        )}

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="ml-auto text-white hover:bg-haitian-red/20"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mb-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors hover:bg-haitian-red/20 group",
                    isActive && "bg-haitian-red/20 text-haitian-red"
                  )}
                >
                  <IconComponent 
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-haitian-red" : "text-white group-hover:text-haitian-red"
                    )} 
                  />
                  {!isCollapsed && (
                    <span className="ml-3 transition-all">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 space-y-2">
          <h3 className={`text-xs uppercase text-white/60 font-semibold ${isCollapsed ? 'sr-only' : 'px-3 mb-2'}`}>
            {!isCollapsed && 'Your Music'}
          </h3>
          
          <Link 
            href="/dashboard/playlists/create"
            className="flex items-center py-2 px-3 rounded-md transition-colors hover:bg-haitian-red/20 group"
          >
            <PlusCircle className="h-5 w-5 text-white group-hover:text-haitian-gold" />
            {!isCollapsed && (
              <span className="ml-3">Create Playlist</span>
            )}
          </Link>
          
          <Link 
            href="/dashboard/liked"
            className="flex items-center py-2 px-3 rounded-md transition-colors hover:bg-haitian-red/20 group"
          >
            <Heart className="h-5 w-5 text-white group-hover:text-haitian-red" />
            {!isCollapsed && (
              <span className="ml-3">Liked Songs</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mini Player preview if song is playing */}
      {currentSong && !isCollapsed && (
        <div className="mb-6 p-3 bg-haitian-blue-800 rounded-md">
          <div className="flex items-center">
            {currentSong.coverUrl && (
              <Image 
                src={currentSong.coverUrl}
                alt={currentSong.title}
                width={48}
                height={48}
                className="rounded"
              />
            )}
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{currentSong.title}</p>
              <p className="text-xs text-white/60 truncate">{currentSong.artist}</p>
            </div>
          </div>
        </div>
      )}

      {/* User/Logout */}
      <div className="mt-auto">
        {session?.user && !isCollapsed && (
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-haitian-gold/20 flex items-center justify-center">
              {session.user.image ? (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || 'User'} 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                />
              ) : (
                <User className="h-4 w-4 text-haitian-gold" />
              )}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-white/60 truncate">{session.user.email}</p>
            </div>
          </div>
        )}
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center py-2 px-3 rounded-md transition-colors hover:bg-haitian-red/20 group"
        >
          <LogOut className="h-5 w-5 text-white group-hover:text-haitian-red" />
          {!isCollapsed && (
            <span className="ml-3">Logout</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;