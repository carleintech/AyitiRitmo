'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar,
  MoreVertical,
  Grid,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Photo {
  id: string;
  artistId: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  location?: string;
  takenAt?: string;
  likeCount: number;
  commentCount: number;
  artist: {
    artistName: string;
    profileImage?: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
}

interface PhotoGalleryProps {
  artistId: string;
  albumId?: string;
  className?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ artistId, albumId, className = '' }) => {
  const { data: session } = useSession();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, [artistId, albumId, page]);

  const fetchPhotos = async () => {
    try {
      const params = new URLSearchParams({
        artistId,
        page: page.toString(),
      });
      
      if (albumId) {
        params.append('albumId', albumId);
      }

      const response = await fetch(`/api/photos?${params}`);
      const data = await response.json();
      
      if (page === 1) {
        setPhotos(data.photos);
      } else {
        setPhotos(prev => [...prev, ...data.photos]);
      }
      
      setHasMore(data.pagination.page < data.pagination.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
    }
  };

  const handleLike = async (photoId: string) => {
    if (!session?.user) return;

    const isLiked = likedPhotos.has(photoId);
    const newLikedPhotos = new Set(likedPhotos);
    
    if (isLiked) {
      newLikedPhotos.delete(photoId);
    } else {
      newLikedPhotos.add(photoId);
    }
    
    setLikedPhotos(newLikedPhotos);

    // Update photo in state
    setPhotos(photos.map(photo => {
      if (photo.id === photoId) {
        return {
          ...photo,
          likeCount: isLiked ? photo.likeCount - 1 : photo.likeCount + 1,
        };
      }
      return photo;
    }));

    // API call
    try {
      const method = isLiked ? 'DELETE' : 'POST';
      await fetch(`/api/photos/${photoId}/like`, { method });
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert on error
      setLikedPhotos(likedPhotos);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && photos.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-slate-800 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="overflow-hidden cursor-pointer group relative aspect-square"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo.thumbnailUrl || photo.url}
                alt={photo.caption || ''}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{photo.likeCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{photo.commentCount}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <Button 
            onClick={loadMore}
            variant="outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-5xl bg-slate-900 border-slate-800">
            <DialogTitle className="sr-only">Photo</DialogTitle>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Photo */}
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || ''}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col">
                {/* Artist Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={selectedPhoto.artist.profileImage} />
                    <AvatarFallback>
                      {selectedPhoto.artist.artistName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">
                      {selectedPhoto.artist.artistName}
                    </h3>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-haiti-blue">
                      Follow
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost" className="ml-auto">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                {/* Caption */}
                {selectedPhoto.caption && (
                  <p className="text-white mb-4">{selectedPhoto.caption}</p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                  {selectedPhoto.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                  )}
                  {selectedPhoto.takenAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(selectedPhoto.takenAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleLike(selectedPhoto.id)}
                    className={`${likedPhotos.has(selectedPhoto.id) ? 'text-haiti-red' : 'text-white/60'}`}
                  >
                    <Heart className={`h-5 w-5 ${likedPhotos.has(selectedPhoto.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white/60">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white/60">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="py-4 text-sm font-medium text-white">
                  {selectedPhoto.likeCount} likes
                </div>

                {/* Comments */}
                <div className="flex-1 overflow-y-auto">
                  {/* Comments will go here */}
                  <p className="text-white/60 text-sm text-center py-8">No comments yet</p>
                </div>

                {/* Comment Input */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40"
                    />
                    <Button size="sm" variant="ghost" className="text-haiti-blue">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PhotoGallery;