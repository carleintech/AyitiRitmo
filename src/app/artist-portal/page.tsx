"use client";

import React from 'react';
import { useAuth } from "@/lib/auth-context";
import { 
  BarChart3, 
  Music, 
  Upload, 
  Users,  
  Calendar, 
  DollarSign,
  PlusCircle
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ArtistPortalPage() {
  const { user } = useAuth();
  
  // Redirect non-artists to dashboard
  if (user && !user.isArtist) {
    redirect("/dashboard");
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Artist Portal</h1>
          
          <Link href="/artist-portal/upload">
            <button className="bg-haiti-gold text-haiti-blue px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Upload className="h-5 w-5" />
              <span>Upload Music</span>
            </button>
          </Link>
        </div>
        
        <p className="text-white/70 mt-2">
          Manage your music, connect with fans, and track your performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Streams" 
          value="12,458" 
          change="+8.3%" 
          isPositive={true} 
          icon={<BarChart3 className="h-6 w-6" />} 
        />
        <StatCard 
          title="Followers" 
          value="2,845" 
          change="+12.5%" 
          isPositive={true} 
          icon={<Users className="h-6 w-6" />} 
        />
        <StatCard 
          title="Revenue" 
          value="$345.28" 
          change="+5.1%" 
          isPositive={true} 
          icon={<DollarSign className="h-6 w-6" />} 
        />
        <StatCard 
          title="Tracks" 
          value="28" 
          change="+2" 
          isPositive={true} 
          icon={<Music className="h-6 w-6" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden h-full">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
            </div>
            
            <div className="p-4">
              {/* Placeholder for chart */}
              <div className="h-64 bg-gradient-to-r from-haiti-blue/10 to-haiti-red/10 rounded-lg flex items-center justify-center">
                <span className="text-white/40">Performance chart will appear here</span>
              </div>
              
              <div className="flex justify-between mt-4">
                <button className="text-haiti-gold text-sm font-medium">Last 7 Days</button>
                <button className="text-white/70 text-sm font-medium hover:text-white">Last 30 Days</button>
                <button className="text-white/70 text-sm font-medium hover:text-white">Last 90 Days</button>
                <button className="text-white/70 text-sm font-medium hover:text-white">All Time</button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden h-full">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <EventCard 
                  title="Live Performance" 
                  date="May 25, 2025" 
                  time="8:00 PM" 
                  status="confirmed" 
                />
                <EventCard 
                  title="Album Release" 
                  date="June 10, 2025" 
                  time="12:00 AM" 
                  status="scheduled" 
                />
                <EventCard 
                  title="Fan Q&A Session" 
                  date="June 15, 2025" 
                  time="6:30 PM" 
                  status="pending" 
                />
              </div>
              
              <button className="flex items-center gap-2 text-haiti-gold mt-4">
                <PlusCircle className="h-4 w-4" />
                <span>Schedule New Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Top Performing Tracks</h2>
          </div>
          
          <div className="divide-y divide-white/10">
            <TrackPerformanceRow 
              title="Dekole" 
              streams="4,582" 
              trend="up" 
              revenue="$145.23" 
            />
            <TrackPerformanceRow 
              title="Ayiti Love" 
              streams="3,891" 
              trend="up" 
              revenue="$122.64" 
            />
            <TrackPerformanceRow 
              title="Rasin Roots" 
              streams="2,347" 
              trend="down" 
              revenue="$78.19" 
            />
            <TrackPerformanceRow 
              title="Konpa King" 
              streams="1,982" 
              trend="up" 
              revenue="$65.45" 
            />
          </div>
          
          <div className="p-4 text-center">
            <button className="text-haiti-gold text-sm">View All Tracks</button>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Audience Demographics</h2>
          </div>
          
          <div className="p-4">
            <h3 className="text-white font-medium mb-3">Top Locations</h3>
            
            <div className="space-y-3">
              <LocationBar location="Haiti" percentage={42} />
              <LocationBar location="United States" percentage={28} />
              <LocationBar location="Canada" percentage={14} />
              <LocationBar location="France" percentage={8} />
              <LocationBar location="Other" percentage={8} />
            </div>
            
            <div className="border-t border-white/10 mt-6 pt-6">
              <h3 className="text-white font-medium mb-3">Age Groups</h3>
              
              <div className="h-32 bg-gradient-to-r from-haiti-blue/10 to-haiti-red/10 rounded-lg flex items-center justify-center">
                <span className="text-white/40">Age distribution chart will appear here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden mb-10">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Recent Fan Activity</h2>
        </div>
        
        <div className="divide-y divide-white/10">
          <FanActivityRow 
            username="marie_h" 
            action="followed you" 
            time="2 hours ago" 
          />
          <FanActivityRow 
            username="jean_pierre123" 
            action="liked your track 'Dekole'" 
            time="4 hours ago" 
          />
          <FanActivityRow 
            username="haiti_lover" 
            action="shared your album" 
            time="6 hours ago" 
          />
          <FanActivityRow 
            username="kompa_fan" 
            action="commented: 'Love this new track!'" 
            time="yesterday" 
          />
          <FanActivityRow 
            username="music_addict" 
            action="added 'Rasin Roots' to their playlist" 
            time="yesterday" 
          />
        </div>
        
        <div className="p-4 text-center">
          <button className="text-haiti-gold text-sm">View All Activity</button>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white/70 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          <div className={`flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-haiti-red'} mt-1`}>
            <span>{change}</span>
            <span className="ml-1">from last month</span>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-haiti-gold/20 flex items-center justify-center text-haiti-gold">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  status: 'confirmed' | 'scheduled' | 'pending';
}

function EventCard({ title, date, time, status }: EventCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-500';
      case 'scheduled': return 'bg-haiti-gold/20 text-haiti-gold';
      case 'pending': return 'bg-white/20 text-white/70';
      default: return 'bg-white/20 text-white/70';
    }
  };
  
  return (
    <div className="bg-white/10 rounded-lg p-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-white font-medium">{title}</h4>
          <div className="flex items-center text-white/70 text-sm mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date} • {time}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  );
}

interface TrackPerformanceRowProps {
  title: string;
  streams: string;
  trend: 'up' | 'down';
  revenue: string;
}

function TrackPerformanceRow({ title, streams, trend, revenue }: TrackPerformanceRowProps) {
  return (
    <div className="flex items-center p-4 hover:bg-white/5">
      <div className="flex-1">
        <h4 className="text-white font-medium">{title}</h4>
      </div>
      <div className="flex items-center">
        <span className="text-white/70 mr-6">{streams}</span>
        <span className={trend === 'up' ? 'text-green-500' : 'text-haiti-red'}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      </div>
      <div className="ml-8 text-white/70">
        {revenue}
      </div>
    </div>
  );
}

interface LocationBarProps {
  location: string;
  percentage: number;
}

function LocationBar({ location, percentage }: LocationBarProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-white text-sm">{location}</span>
        <span className="text-white/70 text-sm">{percentage}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-haiti-gold rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface FanActivityRowProps {
  username: string;
  action: string;
  time: string;
}

function FanActivityRow({ username, action, time }: FanActivityRowProps) {
  return (
    <div className="flex items-center p-4 hover:bg-white/5">
      <div className="h-10 w-10 rounded-full bg-haiti-blue/30 flex items-center justify-center mr-4">
        <span className="text-haiti-blue text-sm font-medium">{username.charAt(0).toUpperCase()}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="text-haiti-gold font-medium">{username}</span>
          <span className="text-white/70 mx-2">{action}</span>
        </div>
        <div className="text-white/50 text-sm">{time}</div>
      </div>
    </div>
  );
}