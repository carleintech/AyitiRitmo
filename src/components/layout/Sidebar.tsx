"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Home, 
  Search, 
  Library, 
  PlusCircle, 
  Heart, 
  User, 
  Settings, 
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  return (
    <motion.div
      className="h-full bg-black/40 backdrop-blur-md text-white border-r border-white/10"
      initial={{ width: expanded ? 250 : 70 }}
      animate={{ width: expanded ? 250 : 70 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-center mb-8">
          {expanded ? (
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="AyitiRitmo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold">AyitiRitmo</span>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Image
                src="/images/logo.png"
                alt="AyitiRitmo"
                width={40}
                height={40}
              />
            </Link>
          )}
          
          <button
            onClick={toggleSidebar}
            className="ml-auto text-white/70 hover:text-white"
          >
            {expanded ? "←" : "→"}
          </button>
        </div>
        
        <nav className="space-y-1">
          <NavItem href="/dashboard" icon={<Home />} label="Home" expanded={expanded} />
          <NavItem href="/search" icon={<Search />} label="Search" expanded={expanded} />
          <NavItem href="/library" icon={<Library />} label="Your Library" expanded={expanded} />
          <NavItem href="/create-playlist" icon={<PlusCircle />} label="Create Playlist" expanded={expanded} />
          <NavItem href="/liked-songs" icon={<Heart />} label="Liked Songs" expanded={expanded} />
        </nav>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className={`text-sm font-medium text-white/70 mb-2 ${expanded ? "block" : "hidden"}`}>
            YOUR PLAYLISTS
          </h3>
          
          <div className="space-y-1">
            <PlaylistItem name="Konpa Favorites" expanded={expanded} />
            <PlaylistItem name="Carnival Hits" expanded={expanded} />
            <PlaylistItem name="Rasin Classics" expanded={expanded} />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <div className="space-y-1">
          <NavItem href="/profile" icon={<User />} label="Profile" expanded={expanded} />
          <NavItem href="/settings" icon={<Settings />} label="Settings" expanded={expanded} />
          <NavItem href="/logout" icon={<LogOut />} label="Logout" expanded={expanded} />
        </div>
      </div>
    </motion.div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
}

function NavItem({ href, icon, label, expanded }: NavItemProps) {
  return (
    <Link href={href} className="flex items-center p-2 rounded-md hover:bg-white/10 transition-colors">
      <span className="text-white/90">{icon}</span>
      {expanded && (
        <span className="ml-4 text-white/90">{label}</span>
      )}
    </Link>
  );
}

interface PlaylistItemProps {
  name: string;
  expanded: boolean;
}

function PlaylistItem({ name, expanded }: PlaylistItemProps) {
  if (!expanded) return null;
  
  return (
    <Link href={`/playlist/${encodeURIComponent(name)}`} className="block py-1 px-2 text-sm text-white/80 hover:text-white transition-colors">
      {name}
    </Link>
  );
}