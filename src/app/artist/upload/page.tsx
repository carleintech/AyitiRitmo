'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MusicUpload from '@/components/features/MusicUpload';
import { 
  Music, 
  Upload, 
  Plus, 
  BarChart3, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ArtistUploadPage = () => {
  const { data: session } = useSession();
  const [recentUploads, setRecentUploads] = useState<any[]>([]);

  const handleUploadComplete = (song: any) => {
    setRecentUploads(prev => [song, ...prev]);
  };

  if (session?.user?.role !== 'ARTIST') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-haiti-gold mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Artists Only</h1>
        <p className="text-white/60">This page is only accessible to artists.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-haiti-red/20 rounded-lg">
            <Upload className="h-6 w-6 text-haiti-red" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Upload Music</h1>
            <p className="text-white/60">Share your music with the world</p>
          </div>
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="single">Single Track</TabsTrigger>
            <TabsTrigger value="album">Full Album</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-6">
            <MusicUpload onUploadComplete={handleUploadComplete} />
          </TabsContent>
          
          <TabsContent value="album" className="mt-6">
            <Card className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <Plus className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Album Upload</h3>
                <p className="text-white/60 mb-6">
                  Create an album and upload multiple tracks at once.
                </p>
                <Button className="bg-haiti-blue hover:bg-haiti-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Album
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Upload Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-gradient-to-br from-haiti-blue/10 to-haiti-red/10 border-haiti-blue/20">
          <h3 className="text-lg font-semibold text-white mb-4">Upload Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-2">Audio Requirements</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Accepted formats: MP3, WAV, FLAC</li>
                <li>• Maximum file size: 50MB</li>
                <li>• Minimum quality: 128kbps</li>
                <li>• Recommended: 320kbps MP3 or higher</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Cover Art Guidelines</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Format: JPG, PNG, GIF</li>
                <li>• Minimum size: 1000x1000 pixels</li>
                <li>• Recommended: 3000x3000 pixels</li>
                <li>• No watermarks or borders</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Uploads */}
      {recentUploads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Uploads</h3>
            <div className="space-y-3">
              {recentUploads.map((song, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-haiti-red to-haiti-blue rounded flex items-center justify-center">
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{song.title}</h4>
                    <p className="text-sm text-white/60">{song.genre} • Just uploaded</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-5 w-5 text-haiti-blue" />
            <h4 className="text-white font-medium">Total Tracks</h4>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-sm text-white/60">+3 this month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Music className="h-5 w-5 text-haiti-gold" />
            <h4 className="text-white font-medium">Albums</h4>
          </div>
          <p className="text-2xl font-bold text-white">5</p>
          <p className="text-sm text-white/60">+1 this month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h4 className="text-white font-medium">Approved Tracks</h4>
          </div>
          <p className="text-2xl font-bold text-white">22</p>
          <p className="text-sm text-white/60">2 pending review</p>
        </Card>
      </motion.div>
    </div>
  );
};

export default ArtistUploadPage;