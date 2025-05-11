'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhotoGallery from '@/components/features/PhotoGallery';
import PhotoUpload from '@/components/features/PhotoUpload';
import { 
  Camera, 
  Plus, 
  FolderPlus, 
  Grid, 
  Layout,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Eye
} from 'lucide-react';

const ArtistPhotosPage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false);
  const [newAlbumData, setNewAlbumData] = useState({
    title: '',
    description: '',
  });

  // Mock albums data
  const photoAlbums = [
    { id: '1', title: 'Tour 2024', photoCount: 45, coverPhoto: '/api/placeholder/300/300' },
    { id: '2', title: 'Behind the Scenes', photoCount: 28, coverPhoto: '/api/placeholder/300/300' },
    { id: '3', title: 'Studio Sessions', photoCount: 33, coverPhoto: '/api/placeholder/300/300' },
    { id: '4', title: 'Fan Meet & Greets', photoCount: 52, coverPhoto: '/api/placeholder/300/300' },
  ];

  const stats = {
    totalPhotos: 156,
    totalViews: 45230,
    totalLikes: 12450,
    thisMonth: 38,
  };

  const handleCreateAlbum = () => {
    // Create album logic
    console.log('Creating album:', newAlbumData);
    setIsCreateAlbumOpen(false);
    setNewAlbumData({ title: '', description: '' });
  };

  if (session?.user?.role !== 'ARTIST') {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">This page is only available for artists.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Photo Billboard</h1>
          <p className="text-white/60">Share your memories with fans</p>
        </div>
        
        <div className="flex gap-3">
          <Dialog open={isCreateAlbumOpen} onOpenChange={setIsCreateAlbumOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-white/20 text-white">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Album
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Album</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="albumTitle" className="text-white">Album Title</Label>
                  <Input
                    id="albumTitle"
                    value={newAlbumData.title}
                    onChange={(e) => setNewAlbumData({...newAlbumData, title: e.target.value})}
                    className="bg-slate-900 border-slate-700"
                    placeholder="e.g., Tour 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="albumDescription" className="text-white">Description</Label>
                  <Input
                    id="albumDescription"
                    value={newAlbumData.description}
                    onChange={(e) => setNewAlbumData({...newAlbumData, description: e.target.value})}
                    className="bg-slate-900 border-slate-700"
                    placeholder="Describe your album"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateAlbumOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAlbum} className="bg-haiti-red hover:bg-haiti-red/90">
                    Create Album
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button className="bg-haiti-red hover:bg-haiti-red/90">
            <Camera className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="p-4">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <Camera className="h-4 w-4" />
            <span className="text-sm">Total Photos</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalPhotos}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Total Views</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Total Likes</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalLikes.toLocaleString()}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">This Month</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.thisMonth}</p>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 mb-6">
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Upload Section */}
            <PhotoUpload onUploadComplete={(photo) => console.log('New photo:', photo)} />
            
            {/* Photo Gallery */}
            <PhotoGallery artistId={session.user.artistId!} />
          </TabsContent>

          <TabsContent value="albums">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photoAlbums.map((album) => (
                <Card key={album.id} className="overflow-hidden cursor-pointer hover:bg-slate-800/80 transition-colors">
                  <div className="aspect-square relative">
                    <img
                      src={album.coverPhoto}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold">{album.title}</h3>
                      <p className="text-white/80 text-sm">{album.photoCount} photos</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <PhotoGallery artistId={session.user.artistId!} />
          </TabsContent>

          <TabsContent value="popular">
            <PhotoGallery artistId={session.user.artistId!} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Pro Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-haiti-blue/10 to-haiti-red/10 border-haiti-blue/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-haiti-blue/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-haiti-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Pro Tips for Photo Billboard</h3>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Share behind-the-scenes moments from tours and recording sessions</li>
                <li>• Use geotags to show fans where you're performing</li>
                <li>• Create themed albums for different events (tours, festivals, studio)</li>
                <li>• Engage with fan comments to build stronger connections</li>
                <li>• Post regularly to keep your profile active and engaging</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ArtistPhotosPage;