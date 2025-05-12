'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Music, 
  Plus, 
  Save, 
  Palette, 
  Image, 
  Lock, 
  Globe, 
  Upload 
} from 'lucide-react';
import { ROUTES } from '@/lib/utils';

// Mock authentication check - replace with real auth check later
const isAuthenticated = () => {
  // In a real app, this would check for authentication state
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken') !== null;
  }
  return false;
};

export default function CreatePlaylistPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Check authentication status when component mounts
  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      router.push(ROUTES.AUTH_LOGIN);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle playlist creation (mock functionality)
    console.log('Creating playlist:', {
      name: playlistName,
      description,
      isPublic,
      coverImage
    });
    
    // Redirect to the new playlist (mock success flow)
    router.push(ROUTES.DASHBOARD);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-haiti-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-full bg-haiti-blue flex items-center justify-center">
            <Music className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create New Playlist</h1>
            <p className="text-muted-foreground">Share your vibes with the Haitian music community</p>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-haiti-blue/20">
          <CardHeader>
            <CardTitle className="text-haiti-gold">Playlist Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Cover Image */}
                <div className="col-span-1">
                  <div className="aspect-square relative bg-slate-700/50 rounded-lg overflow-hidden mb-4 border-2 border-dashed border-white/20 flex flex-col items-center justify-center">
                    {coverImage ? (
                      <>
                        <img 
                          src={coverImage} 
                          alt="Playlist cover" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm" 
                          className="absolute bottom-2 right-2 opacity-70 hover:opacity-100"
                          onClick={() => setCoverImage(null)}
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <>
                        <Image className="h-10 w-10 text-white/50 mb-2" />
                        <p className="text-white/50 text-sm text-center px-4">
                          Drop an image or click to browse
                        </p>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      title="Upload a cover image for your playlist" 
                      placeholder="Choose an image file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-white/70" />
                        <Label htmlFor="public-switch">Public Playlist</Label>
                      </div>
                      <Switch 
                        id="public-switch" 
                        checked={isPublic} 
                        onCheckedChange={setIsPublic}
                      />
                    </div>
                    
                    <p className="text-xs text-white/50">
                      {isPublic 
                        ? "Anyone can view this playlist" 
                        : "Only you can view this playlist"}
                    </p>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="playlist-name">Playlist Name</Label>
                    <Input 
                      id="playlist-name" 
                      placeholder="My Awesome Konpa Mix" 
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      required
                      className="bg-slate-700/30 border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Tell us about your playlist..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="bg-slate-700/30 border-white/10 resize-none"
                    />
                  </div>

                  <div className="pt-4 space-y-4">
                    <h3 className="text-lg font-medium text-haiti-gold flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Songs
                    </h3>
                    <p className="text-white/70 text-sm">
                      Once you create your playlist, you'll be able to add songs from our library.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push(ROUTES.DASHBOARD)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-haiti-blue hover:bg-haiti-blue/90"
                  disabled={!playlistName.trim()}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Create Playlist
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}