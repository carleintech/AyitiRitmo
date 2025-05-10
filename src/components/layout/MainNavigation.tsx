'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  Settings, 
  Globe,
  Home,
  ChartBar,
  Music,
  Video,
  ShoppingBag,
  Trophy,
  Palette,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Your Library', href: '/library', icon: Music },
  { name: 'Playlists', href: '/playlists', icon: Music },
  { name: 'Profile', href: '/profile', icon: User },
];

const dropdownMenuItems = [
  {
    title: 'Charts',
    items: [
      { name: 'AyitiRitmo Top 100™', href: '/charts/top-100' },
      { name: 'Haitian Konpa Hits™', href: '/charts/konpa' },
      { name: 'Afro-Caribbean Vibes™', href: '/charts/afro-caribbean' },
      { name: 'Global Haitian Sounds', href: '/charts/global' },
      { name: 'Carnival Anthems', href: '/charts/carnival' },
      { name: 'Year-End Charts', href: '/charts/year-end' },
    ],
  },
  {
    title: 'Music',
    items: [
      { name: 'Music News', href: '/music/news' },
      { name: 'Konpa', href: '/music/konpa' },
      { name: 'Zouk', href: '/music/zouk' },
      { name: 'Rasin (Roots Music)', href: '/music/rasin' },
      { name: 'Rap Kreyòl', href: '/music/rap-kreyol' },
      { name: 'Live Performances', href: '/music/live' },
    ],
  },
  {
    title: 'Videos',
    items: [
      { name: 'Latest Music Videos', href: '/videos/latest' },
      { name: 'Live Performances', href: '/videos/live' },
      { name: 'Behind the Scenes', href: '/videos/behind-scenes' },
      { name: 'Tutorials & Workshops', href: '/videos/tutorials' },
    ],
  },
  {
    title: 'Shop',
    items: [
      { name: 'Artist Merchandise', href: '/shop/merchandise' },
      { name: 'AyitiRitmo-branded items', href: '/shop/branded' },
      { name: 'Event Tickets', href: '/shop/tickets' },
    ],
  },
  {
    title: 'Awards',
    items: [
      { name: 'Haitian Music Awards™', href: '/awards/haitian-music' },
      { name: 'Carnival Awards', href: '/awards/carnival' },
      { name: 'Top Artists of the Year', href: '/awards/top-artists' },
    ],
  },
];

const MainNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHomePage = pathname === '/';

  // Don't show navigation on the home/welcome page
  if (isHomePage) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/90 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Music className="h-8 w-8 text-haiti-red" />
              <span className="text-xl font-bold neon-text">AyitiRitmo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                {dropdownMenuItems.map((menu) => (
                  <NavigationMenuItem key={menu.title}>
                    <NavigationMenuTrigger className="bg-transparent text-white hover:text-haiti-red focus:bg-transparent focus:text-haiti-red">
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-slate-800 border-white/10">
                      <ul className="grid w-[400px] gap-3 p-4">
                        {menu.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white"
                            >
                              <div className="text-sm font-medium leading-none text-white">
                                {item.name}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="search"
                placeholder="Search artists, songs, albums..."
                className="w-full rounded-full bg-white/10 py-2 px-10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-haiti-blue/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
              size="icon"
              variant="ghost"
              className="relative text-white hover:text-haiti-red"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-haiti-red" />
            </Button>

            {/* Settings */}
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-haiti-red"
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* Language */}
            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-haiti-red"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </div>

            {/* Profile */}
            <Link href="/profile">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-haiti-red"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-slate-900"
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full bg-white/10 py-2 px-10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-haiti-blue/50"
              />
            </div>

            {/* Mobile Menu Items */}
            {dropdownMenuItems.map((menu) => (
              <div key={menu.title} className="space-y-2">
                <h3 className="text-white font-semibold">{menu.title}</h3>
                <ul className="space-y-1 ml-4">
                  {menu.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block py-2 text-white/70 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default MainNavigation;