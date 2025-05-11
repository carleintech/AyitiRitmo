'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  Home,
  Search,
  Library,
  ListMusic,
  User,
  Plus,
  Heart,
  LogOut,
  Music,
  Camera,
  Mic2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Your Library', href: '/library', icon: Library },
  { name: 'Playlists', href: '/playlists', icon: ListMusic },
  { name: 'Profile', href: '/profile', icon: User },
];

const actionItems = [
  { name: 'Create Playlist', href: '/playlists/create', icon: Plus },
  { name: 'Liked Songs', href: '/liked', icon: Heart },
];

const artistItems = [
  { name: 'Artist Dashboard', href: '/artist/dashboard', icon: Mic2 },
  { name: 'Upload Music', href: '/artist/upload', icon: Music },
  { name: 'Photo Billboard', href: '/artist/photos', icon: Camera },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isHomePage = pathname === '/';
  const isArtist = session?.user?.role === 'ARTIST';

  // Don't show sidebar on the home/welcome page
  if (isHomePage) {
    return null;
  }

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-64 min-h-screen bg-slate-900 border-r border-white/10 fixed left-0 top-0 z-40"
    >
      <div className="h-full flex flex-col p-4">
        {/* Logo Section */}
        <div className="mb-8 mt-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Music className="h-8 w-8 text-haiti-red" />
            <span className="text-xl font-bold neon-text">AyitiRitmo</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-haiti-red/20 text-haiti-red'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}

          <div className="h-px bg-white/10 my-4" />

          {actionItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-haiti-red/20 text-haiti-red'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}

          {/* Artist Section */}
          {isArtist && (
            <>
              <div className="h-px bg-white/10 my-4" />
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Artist Tools</h3>
              </div>
              
              {artistItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-haiti-red/20 text-haiti-red'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/5"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;