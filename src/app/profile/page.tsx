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

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Top Artists */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Top Artists</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {topArtists.map((artist, index) => (
                  <div key={artist.name} className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br ${artist.image} relative`}>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-haiti-red rounded-full flex items-center justify-center text-white text-xs font-bold">
                        #{index + 1}
                      </div>
                    </div>
                    <h4 className="font-medium text-white text-sm line-clamp-1">{artist.name}</h4>
                    <p className="text-xs text-white/60">{artist.plays} plays</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Favorite Genres */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Favorite Genres</h3>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteGenres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-haiti-red/20 text-haiti-red rounded-full text-sm">
                    {genre}
                  </span>
                ))}
                {isEditing && (
                  <Button size="sm" variant="outline" className="h-7 px-3 text-sm">
                    + Add Genre
                  </Button>
                )}
              </div>
            </Card>

            {/* Recent Activity Preview */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="text-haiti-blue hover:text-haiti-red">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-haiti-blue/20 flex items-center justify-center">
                      {activity.type === 'liked' && <Heart className="h-4 w-4 text-haiti-red" />}
                      {activity.type === 'followed' && <User className="h-4 w-4 text-haiti-blue" />}
                      {activity.type === 'playlist' && <Music className="h-4 w-4 text-haiti-gold" />}
                      {activity.type === 'shared' && <Share2 className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        {activity.type === 'liked' && `Liked "${activity.item}" by ${activity.artist}`}
                        {activity.type === 'followed' && `Followed ${activity.item}`}
                        {activity.type === 'playlist' && activity.item}
                        {activity.type === 'shared' && `Shared "${activity.item}" by ${activity.artist}`}
                      </p>
                      <p className="text-xs text-white/60">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Your Playlists</h3>
                <Button className="bg-haiti-red hover:bg-haiti-red/90">
                  <Music className="h-4 w-4 mr-2" />
                  Create Playlist
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="cursor-pointer group">
                    <div className="aspect-square bg-gradient-to-br from-haiti-red to-haiti-blue rounded-lg mb-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <h4 className="font-medium text-white text-sm line-clamp-1">Playlist {i + 1}</h4>
                    <p className="text-xs text-white/60">{Math.floor(Math.random() * 50) + 10} songs</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Activity Feed</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-slate-800/50 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-full bg-haiti-blue/20 flex items-center justify-center">
                      {activity.type === 'liked' && <Heart className="h-5 w-5 text-haiti-red" />}
                      {activity.type === 'followed' && <User className="h-5 w-5 text-haiti-blue" />}
                      {activity.type === 'playlist' && <Music className="h-5 w-5 text-haiti-gold" />}
                      {activity.type === 'shared' && <Share2 className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        {activity.type === 'liked' && `Liked "${activity.item}" by ${activity.artist}`}
                        {activity.type === 'followed' && `Followed ${activity.item}`}
                        {activity.type === 'playlist' && activity.item}
                        {activity.type === 'shared' && `Shared "${activity.item}" by ${activity.artist}`}
                      </p>
                      <p className="text-sm text-white/60 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <Button className="bg-haiti-red hover:bg-haiti-red/90">
                    Save Changes
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Email Notifications</h4>
                      <p className="text-sm text-white/60">Receive updates about new releases</p>
                    </div>
                    <input type="checkbox" className="rounded border-white/10 bg-white/5" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Auto-play</h4>
                      <p className="text-sm text-white/60">Automatically play related songs</p>
                    </div>
                    <input type="checkbox" className="rounded border-white/10 bg-white/5" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">High Quality Audio</h4>
                      <p className="text-sm text-white/60">Stream in highest quality available</p>
                    </div>
                    <input type="checkbox" className="rounded border-white/10 bg-white/5" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Public Profile</h4>
                      <p className="text-sm text-white/60">Make your profile visible to others</p>
                    </div>
                    <input type="checkbox" className="rounded border-white/10 bg-white/5" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Show Listening Activity</h4>
                      <p className="text-sm text-white/60">Display what you're listening to</p>
                    </div>
                    <input type="checkbox" className="rounded border-white/10 bg-white/5" defaultChecked />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;