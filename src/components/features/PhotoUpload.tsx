'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  Calendar,
  X,
  Loader2
} from 'lucide-react';

interface PhotoUploadProps {
  onUploadComplete?: (photo: any) => void;
  className?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUploadComplete, className = '' }) => {
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoData, setPhotoData] = useState({
    caption: '',
    location: '',
    albumId: '',
    takenAt: '',
  });

  // Mock albums for now - replace with real data
  const mockAlbums = [
    { id: '1', title: 'Tour 2024' },
    { id: '2', title: 'Behind the Scenes' },
    { id: '3', title: 'Studio Sessions' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !session?.user) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('data', JSON.stringify(photoData));

      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const photo = await response.json();
      onUploadComplete?.(photo);
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setPhotoData({
        caption: '',
        location: '',
        albumId: '',
        takenAt: '',
      });
    } catch (error) {
      console.error('Upload error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsUploading(false);
    }
  };

  if (session?.user?.role !== 'ARTIST') {
    return null;
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Upload Photo</h3>
          <p className="text-sm text-white/60">Share your moments with fans</p>
        </div>

        {/* File Upload Area */}
        <div className="space-y-4">
          {!selectedFile ? (
            <label className="relative block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-haiti-blue transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-haiti-blue/20 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-haiti-blue" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Drop your photo here</p>
                    <p className="text-sm text-white/60">or click to browse</p>
                  </div>
                  <p className="text-xs text-white/40">Supports: JPG, PNG, GIF (max 10MB)</p>
                </div>
              </div>
            </label>
          ) : (
            <div className="relative">
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                <img
                  src={previewUrl!}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Photo Details Form */}
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="caption" className="text-white">Caption</Label>
              <Textarea
                id="caption"
                placeholder="What's happening in this photo?"
                value={photoData.caption}
                onChange={(e) => setPhotoData({ ...photoData, caption: e.target.value })}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    id="location"
                    placeholder="e.g., Miami, FL"
                    value={photoData.location}
                    onChange={(e) => setPhotoData({ ...photoData, location: e.target.value })}
                    className="pl-10 bg-slate-800 border-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="takenAt" className="text-white">Date Taken</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    id="takenAt"
                    type="date"
                    value={photoData.takenAt}
                    onChange={(e) => setPhotoData({ ...photoData, takenAt: e.target.value })}
                    className="pl-10 bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="album" className="text-white">Add to Album</Label>
              <Select value={photoData.albumId} onValueChange={(value) => setPhotoData({ ...photoData, albumId: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select an album (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockAlbums.map((album) => (
                    <SelectItem key={album.id} value={album.id}>
                      {album.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upload Button */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleRemoveFile}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-haiti-red hover:bg-haiti-red/90"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload Photo
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default PhotoUpload;