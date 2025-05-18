"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  ChevronDown, 
  Search,
  Menu
} from "lucide-react";

export default function TopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="h-16 bg-black/20 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button 
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>
        
        <nav className="hidden md:flex space-x-6">
          <NavLink href="/dashboard">Home</NavLink>
          <NavLink href="/charts">Charts</NavLink>
          <NavLink href="/music">Music</NavLink>
          <NavLink href="/videos">Videos</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/awards">Awards</NavLink>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="py-2 px-4 pl-10 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-haiti-gold/50 w-64"
          />
          <Search className="absolute left-3 top-2.5 text-white/60 h-5 w-5" />
        </div>
        
        <button className="relative text-white/70 hover:text-white">
          <Bell />
          <span className="absolute -top-1 -right-1 bg-haiti-red rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
        </button>
        
        <div className="relative group">
          <button className="flex items-center space-x-2 text-white">
            <div className="w-8 h-8 rounded-full bg-haiti-gold flex items-center justify-center font-bold">
              J
            </div>
            <span className="hidden md:inline-block">Jean</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
            <Link href="/profile" className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10">
              Your Profile
            </Link>
            <Link href="/account" className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10">
              Account Settings
            </Link>
            <Link href="/artist-portal" className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10">
              Artist Portal
            </Link>
            <div className="border-t border-white/10 my-1"></div>
            <Link href="/logout" className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10">
              Sign out
            </Link>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-md z-40 md:hidden border-b border-white/10">
          <nav className="flex flex-col">
            <NavLink href="/dashboard" mobile>Home</NavLink>
            <NavLink href="/charts" mobile>Charts</NavLink>
            <NavLink href="/music" mobile>Music</NavLink>
            <NavLink href="/videos" mobile>Videos</NavLink>
            <NavLink href="/shop" mobile>Shop</NavLink>
            <NavLink href="/awards" mobile>Awards</NavLink>
          </nav>
        </div>
      )}
    </div>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

function NavLink({ href, children, mobile = false }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className={`text-white/80 hover:text-white font-medium transition-colors ${
        mobile ? 'py-3 px-6 border-b border-white/10' : ''
      }`}
    >
      {children}
    </Link>
  );
}