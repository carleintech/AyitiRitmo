"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMusic } from "@/lib/music-context";
import { 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Clock, 
  Download, 
  Plus, 
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDuration } from "@/lib/utils";

// Sample track data
const trackData = {
  id: "1",
  title: "Dekole",
  artist: "Boukman Eksperyans",
  album: "Kalfou Danjere",
  releaseDate: "1992",
  duration: 245, // seconds
  audioSrc: "/audio/sample-track-1.mp3",
  coverImage: "/images/album-cover.jpg",
  genres: ["Rasin", "Mizik Rasin"],
  artistImage: "/images/artist.jpg",
  plays: "1.2M",
  description: "A classic song by the legendary Haitian group Boukman Eksperyans, featuring traditional rhythms and powerful vocals that reflect the cultural heritage of Haiti.",
  lyrics: `Gade leve limyè! 
  Gade limyè leve!...   Se pou sa ou fèt! 
  Se pou sa ou fèt!
  Dekole kite separe!
  [... additional lyrics ...]`,
  comments: [
    { id: "c1", user: "haiti_lover", text: "Such a powerful song!", date: "2 days ago", likes: 24 },
    { id: "c2", user: "kompa_fan", text: "This never gets old!", date: "1 week ago", likes: 15 },
    { id: "c3", user: "music_explorer", text: "First time hearing this. Absolutely blown away!", date: "3 weeks ago", likes: 42 },
  ],
  relatedTracks: [
    { id: "2", title: "Ke'm Pa Sote", artist: "Boukman Eksperyans", album: "Kalfou Danjere" },
    { id: "3", title: "Jou Malere", artist: "Boukman Eksperyans", album: "Vodou Adjae" },
    { id: "4", title: "Papa Loko", artist: "Boukman Eksperyans", album: "Libertè" },
  ]
};

export default function TrackPage() {
  const params = useParams();
  const router = useRouter();
  const { playTrack, isPlaying, currentTrack, togglePlay } = useMusic();
  const [track, setTrack] = useState<typeof trackData | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState<'about' | 'lyrics' | 'comments'>('about');
  
  useEffect(() => {
    // In a real app, fetch the track data from your API
    // For now, we'll use the sample data
    setTrack(trackData);
  }, [params.id]);
  
  if (!track) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-white text-xl">Loading track...</div>
      </div>
    );
  }
  
  const isCurrentTrack = currentTrack?.id === track.id;
  
  const handlePlayTrack = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        albumTitle: track.album,
        audioSrc: track.audioSrc,
        duration: track.duration,
      });
    }
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // In a real app, this would send to your API
    console.log("Adding comment:", comment);
    setComment("");
    
    // For demo, we'll just pretend it was added
    alert("Comment added! (Demo only)");
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <button 
        className="text-white/70 hover:text-white flex items-center mb-6"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span>Back</span>
      </button>
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="aspect-square bg-haiti-gold/20 rounded-lg overflow-hidden relative">
            {/* In a real app, this would be an actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-haiti-blue/30 to-haiti-red/30">
              <span className="text-8xl text-white/20">♫</span>
            </div>

            <motion.button 
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayTrack}
            >
              <div className="bg-haiti-gold rounded-full p-4 text-haiti-blue">
                {isCurrentTrack && isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </div>
            </motion.button>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button 
              className={`p-2 rounded-full ${isLiked ? 'bg-haiti-red text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20">
              <Plus className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 ml-auto">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{track.title}</h1>
          <p className="text-white/70 mb-4">
            <span className="text-haiti-gold hover:underline cursor-pointer">{track.artist}</span>
            {track.album && (
              <>
                <span className="mx-2">•</span>
                <span className="hover:underline cursor-pointer">{track.album}</span>
              </>
            )}
            {track.releaseDate && (
              <>
                <span className="mx-2">•</span>
                <span>{track.releaseDate}</span>
              </>
            )}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {track.genres.map((genre, index) => (
              <span 
                key={index} 
                className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/90"
              >
                {genre}
              </span>
            ))}
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/90 flex items-center gap-1 ml-auto">
              <Clock className="h-3 w-3" />
              {formatDuration(track.duration)}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/90">
              {track.plays} plays
            </span>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden mb-6">
            <div className="flex border-b border-white/10">
              <button 
                className={`py-3 px-4 text-sm font-medium relative ${activeTab === 'about' ? 'text-white' : 'text-white/60 hover:text-white/90'}`}
                onClick={() => setActiveTab('about')}
              >
                About
                {activeTab === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-haiti-gold"></div>
                )}
              </button>
              
              <button 
                className={`py-3 px-4 text-sm font-medium relative ${activeTab === 'lyrics' ? 'text-white' : 'text-white/60 hover:text-white/90'}`}
                onClick={() => setActiveTab('lyrics')}
              >
                Lyrics
                {activeTab === 'lyrics' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-haiti-gold"></div>
                )}
              </button>
              
              <button 
                className={`py-3 px-4 text-sm font-medium relative ${activeTab === 'comments' ? 'text-white' : 'text-white/60 hover:text-white/90'}`}
                onClick={() => setActiveTab('comments')}
              >
                Comments
                {activeTab === 'comments' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-haiti-gold"></div>
                )}
              </button>
            </div>
            
            <div className="p-4">
              {activeTab === 'about' && (
                <div className="text-white/90">
                  <p>{track.description}</p>
                </div>
              )}
              {activeTab === 'lyrics' && (
                <div className="text-white/90 whitespace-pre-line">
                  {/* Note: We'll display a sample of lyrics as a demonstration */}
                  <p>Lyrics are available for Premium subscribers.</p>
                  <button className="text-haiti-gold hover:underline mt-2">
                    Upgrade to Premium
                  </button>
                </div>
              )}
              
              {activeTab === 'comments' && (
                <div>
                  <form className="mb-6" onSubmit={handleAddComment}>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-haiti-blue/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-haiti-blue text-sm font-medium">U</span>
                      </div>
                      
                      <div className="flex-1">
                        <input 
                          type="text" 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haiti-gold focus:border-transparent"
                          placeholder="Add a comment..."
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="bg-haiti-gold text-haiti-blue px-4 py-2 rounded-lg font-medium"
                        disabled={!comment.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </form>
                  
                  <div className="space-y-4">
                    {track.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 bg-haiti-blue/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-haiti-blue text-sm font-medium">
                            {comment.user.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-haiti-gold font-medium">{comment.user}</span>
                            <span className="text-white/50 text-sm">{comment.date}</span>
                          </div>
                          
                          <p className="text-white/90 mb-2">{comment.text}</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-white/60 hover:text-white">
                              <Heart className="h-4 w-4" />
                              <span>{comment.likes}</span>
                            </button>
                            
                            <button className="text-white/60 hover:text-white">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">More from {track.artist}</h3>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
              {track.relatedTracks.map((related, index) => (
                <div 
                  key={related.id}
                  className={`flex items-center p-3 hover:bg-white/10 cursor-pointer ${
                    index < track.relatedTracks.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                  onClick={() => router.push(`/track/${related.id}`)}
                >
                  <div className="w-10 h-10 bg-haiti-gold/20 rounded flex items-center justify-center mr-4">
                    <span className="text-haiti-gold">♫</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{related.title}</h4>
                    <p className="text-white/70 text-sm">{related.album}</p>
                  </div>
                  
                  <button className="text-white/60 hover:text-white p-2">
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
