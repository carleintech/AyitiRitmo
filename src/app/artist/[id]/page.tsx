'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PhotoGallery from '@/components/features/PhotoGallery';
import PhotoUpload from '@/components/features/PhotoUpload';
import { 
  Play, 
  Users, 
  Music, 
  Camera,
  MapPin,
  Calendar,
  ExternalLink,
  Plus,
  CheckCircle
} from 'lucide-react';

// Mock artist data - replace with real data fetch
const artist = {
  id: 'artist-1',
  artistName: 'Haiti Groove',
  bio: 'Leading Konpa artist bringing the vibrant sounds of Haiti to the world.',
  profileImage: '/api/placeholder/300/300',
  coverImage: '/api/placeholder/1200/400',
  genres: ['Konpa', 'Zouk', 'Afro-Caribbean'],
  verified: true,
  followers: 125000,
  monthlyListeners: 450000,
  location: 'Port-au-Prince, Haiti',
  joinedDate: '2020',
  socialLinks: {
    instagram: 'https://instagram.com/haitigroove',
    youtube: 'https://youtube.com/haitigroove',
    spotify: 'https://open.spotify.com/artist/haitigroove',
  },
  stats: {
    songs: 45,
    albums: 8,
    playlists: 12,
    photos: 156,
  }
};

const ArtistPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const isOwnProfile = session?.user?.artistId === params.id;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // API call to follow/unfollow
  };

  const handlePhotoUpload = (photo: any) => {
    // Handle new photo upload
    console.log('New photo uploaded:', photo);
  };

  return (
    <div className="space-y-6">
      {/* Artist Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card className="overflow-hidden">
          {/* Cover Image */}
          <div className="h-56 md:h-80 relative">
            <img
              src={artist.coverImage}
              alt={artist.artistName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Artist Info */}
          <div className="relative px-6 -mt-20">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="relative">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-slate-900">
                  <AvatarImage src={artist.profileImage} />
                  <AvatarFallback>{artist.artistName[0]}</AvatarFallback>
                </Avatar>
                {artist.verified && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
                    <CheckCircle className="h-6 w-6 text-white fill-current" />
                  </div>
                )}
              </div>

              {/* Artist Details */}
              <div className="flex-1 py-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {artist.artistName}
                    </h1>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/60">
                      <span>{artist.followers.toLocaleString()} followers</span>
                      <span>{artist.monthlyListeners.toLocaleString()} monthly listeners</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {artist.location}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4 md:mt-0">
                    {!isOwnProfile && (
                      <Button
                        onClick={handleFollow}
                        className={isFollowing ? "bg-white/10 hover:bg-white/20" : "bg-haiti-red hover:bg-haiti-red/90"}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    )}
                    <Button className="bg-white text-black hover:bg-white/90">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {artist.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-haiti-blue/20 text-haiti-blue rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="mt-4 text-white/80 max-w-2xl">{artist.bio}</p>

                {/* Social Links */}
                <div className="flex gap-4 mt-4">
                  {Object.entries(artist.socialLinks).map(([platform, url]) => (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="text-white/60 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="music">
              <Music className="h-4 w-4 mr-2" />
              Music
            </TabsTrigger>
            <TabsTrigger value="photos">
              <Camera className="h-4 w-4 mr-2" />
              Photos ({artist.stats.photos})
            </TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            {isOwnProfile && (
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Top Songs */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Popular</h3>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-2 hover:bg-slate-800/50 rounded">
                      <span className="w-4 text-sm text-white/60">{i + 1}</span>
                      <div className="w-12 h-12 bg-gradient-to-br from-haiti-red to-haiti-blue rounded" />
                      <div className="flex-1">
                        <h4 className="text-white">Song Title {i + 1}</h4>
                        <p className="text-sm text-white/60">{(123456 * (5 - i)).toLocaleString()} plays</p>
                      </div>
                      <div className="text-sm text-white/60">3:45</div>
                      <Button size="icon" variant="ghost">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Photos Preview */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Recent Photos</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('photos')}>
                    See all
                  </Button>
                </div>
                <PhotoGallery artistId={params.id} className="max-h-96 overflow-hidden" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="music">
            <div className="space-y-6">
              {/* Albums */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Albums</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="cursor-pointer group">
                      <div className="aspect-square bg-gradient-to-br from-haiti-red to-haiti-blue rounded-lg mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <h4 className="font-medium text-white">Album {i + 1}</h4>
                      <p className="text-sm text-white/60">2024</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Singles and Features */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Singles</h3>
                <div className="space-y-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-2 hover:bg-slate-800/50 rounded">
                      <div className="w-12 h-12 bg-gradient-to-br from-haiti-blue to-haiti-gold rounded" />
                      <div className="flex-1">
                        <h4 className="text-white">Single Title {i + 1}</h4>
                        <p className="text-sm text-white/60">2024 • {(56789 * (10 - i)).toLocaleString()} plays</p>
                      </div>
                      <div className="text-sm text-white/60">3:45</div>
                      <Button size="icon" variant="ghost">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="photos">
            <div className="space-y-6">
              {/* Upload Section for Own Profile */}
              {isOwnProfile && (
                <PhotoUpload onUploadComplete={handlePhotoUpload} />
              )}

              {/* Photo Gallery */}
              <PhotoGallery artistId={params.id} />
            </div>
          </TabsContent>

          <TabsContent value="albums">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="cursor-pointer group">
                  <div className="aspect-square bg-gradient-to-br from-haiti-red to-haiti-blue rounded-lg mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <h4 className="font-medium text-white text-sm">Album {i + 1}</h4>
                  <p className="text-xs text-white/60">2024</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="p-4 cursor-pointer hover:bg-slate-800/50 transition-colors">
                  <div className="aspect-square bg-gradient-to-br from-haiti-blue to-haiti-gold rounded-lg mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <h4 className="font-medium text-white">Playlist {i + 1}</h4>
                  <p className="text-sm text-white/60">{20 + i} songs</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {isOwnProfile && (
            <TabsContent value="analytics">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center gap-2 text-white/60 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Total Followers</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{artist.followers.toLocaleString()}</p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center gap-2 text-white/60 mb-1">
                      <Play className="h-4 w-4" />
                      <span className="text-sm">Monthly Plays</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{artist.monthlyListeners.toLocaleString()}</p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center gap-2 text-white/60 mb-1">
                      <Music className="h-4 w-4" />
                      <span className="text-sm">Total Songs</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{artist.stats.songs}</p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center gap-2 text-white/60 mb-1">
                      <Camera className="h-4 w-4" />
                      <span className="text-sm">Photos Posted</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{artist.stats.photos}</p>
                  </Card>
                </div>

                {/* Charts would go here */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Performance Overview</h3>
                  <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                    <p className="text-white/40">Analytics charts will go here</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ArtistPage;