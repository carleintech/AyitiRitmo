'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit2, 
  Save, 
  X,
  Music,
  Heart,
  Share2,
  Settings,
  Crown,
  Star,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Music Lover',
    username: 'musiclover123',
    email: 'user@example.com',
    location: 'Miami, FL',
    joinDate: 'January 2024',
    bio: 'Passionate about Haitian music and culture. Always discovering new artists.',
    favoriteGenres: ['Konpa', 'Zouk', 'Rap Kreyòl'],
  });

  const stats = {
    songsLiked: 234,
    playlistsCreated: 12,
    artistsFollowed: 45,
    totalPlays: 1256,
    hoursListened: 89,
  };

  const recentActivity = [
    { type: 'liked', item: 'Konpa Paradise', artist: 'Haiti Groove', time: '2 minutes ago' },
    { type: 'followed', item: 'Caribbean Dreamers', time: '15 minutes ago' },
    { type: 'playlist', item: 'Created "Summer Vibes"', time: '1 hour ago' },
    { type: 'shared', item: 'Zouk Love', artist: 'Caribbean Dreamers', time: '3 hours ago' },
  ];

  const topArtists = [
    { name: 'Haiti Groove', plays: 245, image: 'from-haiti-red to-orange-500' },
    { name: 'Caribbean Dreamers', plays: 189, image: 'from-haiti-blue to-blue-500' },
    { name: 'Traditional Roots', plays: 156, image: 'from-green-600 to-green-400' },
    { name: 'Young Haiti', plays: 134, image: 'from-purple-600 to-purple-400' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset changes logic here
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-haiti-red via-orange-500 to-haiti-gold relative">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/api/placeholder/1200/400"
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative px-6 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-haiti-blue to-haiti-red -mt-16 md:-mt-24 border-4 border-slate-900 overflow-hidden">
                  <Image
                    src="/api/placeholder/128/128"
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-haiti-gold rounded-full p-2">
                  <Crown className="h-4 w-4 text-black" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="text-2xl font-bold bg-slate-800 border-slate-700"
                        />
                        <Input
                          value={profile.username}
                          onChange={(e) => setProfile({...profile, username: e.target.value})}
                          className="text-white/60 bg-slate-800 border-slate-700"
                          placeholder="Username"
                        />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                        <p className="text-white/60">@{profile.username}</p>
                      </>
                    )}
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {profile.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {profile.joinDate}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 md:mt-0">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditing(true)} variant="outline">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full h-20 p-3 rounded-lg bg-slate-800 border-slate-700 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-haiti-blue/50"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-white/80">{profile.bio}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.songsLiked}</div>
                    <div className="text-xs text-white/60">Songs Liked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.playlistsCreated}</div>
                    <div className="text-xs text-white/60">Playlists</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.artistsFollowed}</div>
                    <div className="text-xs text-white/60">Artists</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.totalPlays}</div>
                    <div className="text-xs text-white/60">Total Plays</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{stats.hoursListened}</div>
                    <div className="text-xs text-white/60">Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Profile Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Top Artists</h2>
            <div className="space-y-4">
              {topArtists.map((artist, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-6 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${artist.image} rounded-full`}>
                      {/* Add artist image here */}
                    </div>
                    <div>
                      <div className="font-medium text-white">{artist.name}</div>
                      <div className="text-xs text-white/60">Plays: {artist.plays}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="p-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <h2 className="text-2xl font-semibold text-white">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-3 px-6 bg-slate-800 rounded-lg">
                  <div className="text-white">
                    <div className="font-medium">{activity.type === 'liked' ? 'Liked' : activity.type === 'followed' ? 'Followed' : activity.type === 'shared' ? 'Shared' : 'Created'} 
                      {activity.item} {activity.artist && `by ${activity.artist}`}
                    </div>
                    <div className="text-xs text-white/60">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <h2 className="text-2xl font-semibold text-white">Settings</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full py-3">Change Password</Button>
              <Button variant="outline" className="w-full py-3">Account Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;
