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
import { Switch } from '@/components/ui/switch';
import { 
  Upload, 
  Music, 
  Image as ImageIcon, 
  Calendar,
  X,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface MusicUploadProps {
  onUploadComplete?: (song: any) => void;
  className?: string;
}

const MusicUpload: React.FC<MusicUploadProps> = ({ onUploadComplete, className = '' }) => {
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [songData, setSongData] = useState({
    title: '',
    genre: '',
    albumId: '',
    lyrics: '',
    isExplicit: false,
    releaseDate: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Mock albums for now - replace with real data
  const mockAlbums = [
    { id: '1', title: 'Summer Vibes 2024' },
    { id: '2', title: 'Konpa Classics' },
    { id: '3', title: 'Zouk Anthology' },
  ];

  const genres = [
    'Konpa', 'Zouk', 'Rasin', 'Rap Kreyòl', 'Twoubadou', 
    'Rara', 'Afro-Antillais', 'Haiti Jazz', 'Pop', 'Other'
  ];

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        setError('Please select a valid audio file');
        return;
      }
      
      setSelectedAudio(file);
      const url = URL.createObjectURL(file);
      setAudioPreview(url);
      
      // Try to extract title from filename
      if (!songData.title) {
        const title = file.name.replace(/\.[^/.]+$/, "");
        setSongData(prev => ({ ...prev, title }));
      }
      
      setError(null);
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      setSelectedCover(file);
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
      setError(null);
    }
  };

  const handleRemoveAudio = () => {
    setSelectedAudio(null);
    setAudioPreview(null);
    setUploadProgress(0);
  };

  const handleRemoveCover = () => {
    setSelectedCover(null);
    setCoverPreview(null);
  };

  const handleUpload = async () => {
    if (!selectedAudio || !session?.user) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('audio', selectedAudio);
      
      if (selectedCover) {
        formData.append('cover', selectedCover);
      }
      
      formData.append('data', JSON.stringify(songData));

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/music/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const song = await response.json();
      
      // Show success state
      setSuccess(true);
      setTimeout(() => {
        onUploadComplete?.(song);
        
        // Reset form
        setSelectedAudio(null);
        setSelectedCover(null);
        setAudioPreview(null);
        setCoverPreview(null);
        setUploadProgress(0);
        setSuccess(false);
        setSongData({
          title: '',
          genre: '',
          albumId: '',
          lyrics: '',
          isExplicit: false,
          releaseDate: '',
        });
      }, 1500);
      
    } catch (error: any) {
      console.error('Upload error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
      setUploadProgress(0);
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
          <h3 className="text-lg font-bold text-white mb-1">Upload Music</h3>
          <p className="text-sm text-white/60">Share your music with the world</p>
        </div>

        {/* Success State */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-5 w-5 text-green-400" />
            <p className="text-green-400">Upload successful!</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Audio Upload Area */}
        <div className="space-y-4">
          {!selectedAudio ? (
            <label className="relative block">
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioSelect}
                className="hidden"
                disabled={isUploading}
              />
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-haiti-blue transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-haiti-blue/20 rounded-full flex items-center justify-center">
                    <Music className="h-8 w-8 text-haiti-blue" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Drop your audio file here</p>
                    <p className="text-sm text-white/60">or click to browse</p>
                  </div>
                  <p className="text-xs text-white/40">Supports: MP3, WAV, FLAC (max 50MB)</p>
                </div>
              </div>
            </label>
          ) : (
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-haiti-blue" />
                  <span className="text-white font-medium">{selectedAudio.name}</span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleRemoveAudio}
                  disabled={isUploading}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {audioPreview && (
                <audio controls className="w-full mt-2">
                  <source src={audioPreview} type={selectedAudio.type} />
                  Your browser does not support the audio element.
                </audio>
              )}
              
              {isUploading && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-haiti-blue h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Song Details Form */}
        {selectedAudio && !isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Song Title</Label>
                <Input
                  id="title"
                  placeholder="Enter song title"
                  value={songData.title}
                  onChange={(e) => setSongData({ ...songData, title: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-white">Genre</Label>
                <Select value={songData.genre} onValueChange={(value) => setSongData({ ...songData, genre: value })}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="album" className="text-white">Album (Optional)</Label>
                <Select value={songData.albumId} onValueChange={(value) => setSongData({ ...songData, albumId: value })}>
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

              <div className="space-y-2">
                <Label htmlFor="releaseDate" className="text-white">Release Date</Label>
                <Input
                  id="releaseDate"
                  type="date"
                  value={songData.releaseDate}
                  onChange={(e) => setSongData({ ...songData, releaseDate: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            {/* Cover Art Upload */}
            <div className="space-y-2">
              <Label className="text-white">Cover Art (Optional)</Label>
              
              {!selectedCover ? (
                <label className="relative block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverSelect}
                    className="hidden"
                  />
                  <div className="border border-dashed border-white/20 rounded-lg p-4 text-center hover:border-haiti-blue transition-colors cursor-pointer">
                    <div className="flex items-center justify-center gap-2 text-white/60">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm">Add cover art</span>
                    </div>
                  </div>
                </label>
              ) : (
                <div className="relative">
                  <div className="relative w-32 h-32 overflow-hidden rounded-lg">
                    <img
                      src={coverPreview!}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleRemoveCover}
                    className="absolute -top-2 -right-2 bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Lyrics */}
            <div className="space-y-2">
              <Label htmlFor="lyrics" className="text-white">Lyrics (Optional)</Label>
              <Textarea
                id="lyrics"
                placeholder="Enter song lyrics..."
                value={songData.lyrics}
                onChange={(e) => setSongData({ ...songData, lyrics: e.target.value })}
                className="bg-slate-800 border-slate-700 h-32"
              />
            </div>

            {/* Explicit Content Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Explicit Content</Label>
                <p className="text-sm text-white/60">Mark if this song contains explicit content</p>
              </div>
              <Switch
                checked={songData.isExplicit}
                onCheckedChange={(checked) => setSongData({ ...songData, isExplicit: checked })}
              />
            </div>

            {/* Upload Button */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleRemoveAudio}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading || !songData.title}
                className="bg-haiti-red hover:bg-haiti-red/90"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Song
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

export default MusicUpload;