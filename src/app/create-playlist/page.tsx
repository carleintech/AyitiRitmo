'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Music, Image as ImageIcon, Plus, Search, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

// Sample track data
const sampleTracks = [
  { id: '1', title: 'Dekole', artist: 'Boukman Eksperyans', album: 'Kalfou Danjere', duration: '5:32' },
  { id: '2', title: 'Pa Manyen Fanm Nan', artist: 'Sweet Micky', album: 'Best of Sweet Micky', duration: '4:18' },
  { id: '3', title: 'Rasanble', artist: 'RAM', album: 'RAM 6: Manman m se Ginen', duration: '6:04' },
  { id: '4', title: 'Sweet Caroline', artist: 'Tabou Combo', album: 'The Masters', duration: '4:45' },
  { id: '5', title: 'Pale Pale', artist: 'Carimi', album: 'Nasty Business', duration: '4:12' },
  { id: '6', title: 'Jodi a', artist: 'Nu Look', album: 'I Got This', duration: '6:03' },
  { id: '7', title: 'Ayiti Bang Bang', artist: 'Carimi', album: 'Buzz', duration: '5:18' },
  { id: '8', title: 'Ke\'m Pa Sote', artist: 'Boukman Eksperyans', album: 'Kalfou Danjere', duration: '4:56' },
];

export default function CreatePlaylistPage() {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [playlistName, setPlaylistName] = useState('My Haitian Playlist');
  const [playlistDescription, setPlaylistDescription] = useState('A collection of my favorite Haitian songs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [coverColor, setCoverColor] = useState('from-haiti-blue to-haiti-red');

  // Redirect if not authenticated
  useEffect(() => {
    if (user === null) {
      redirect('/welcome?signin=true');
    }
    setIsLoaded(true);
  }, [user]);

  // Filter tracks based on search query
  const filteredTracks = sampleTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle track selection
  const toggleTrackSelection = (trackId: string) => {
    setSelectedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  // Get selected tracks data
  const getSelectedTracksData = () => {
    return sampleTracks.filter((track) => selectedTracks.includes(track.id));
  };

  // Handle color change for playlist cover
  const handleColorChange = () => {
    const colors = [
      'from-haiti-blue to-haiti-red',
      'from-haiti-gold to-haiti-blue',
      'from-haiti-red to-haiti-gold',
      'from-purple-600 to-haiti-blue',
      'from-green-500 to-haiti-blue',
      'from-pink-500 to-haiti-gold',
    ];
    
    const currentIndex = colors.indexOf(coverColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setCoverColor(colors[nextIndex]);
  };

  // Handle save playlist
  const handleSavePlaylist = () => {
    // In a real app, this would call an API to save the playlist
    alert(`Playlist "${playlistName}" saved with ${selectedTracks.length} tracks!`);
    // You could then redirect to the playlist page
  };

  // If user is not authenticated, the useEffect will handle the redirect
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white flex items-center gap-2 mb-8">
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-haiti-red to-haiti-blue bg-clip-text text-transparent">
            Create New Playlist
          </h1>
          <p className="text-white/70 mb-8">
            Curate your personal collection of Haitian music to enjoy and share with the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Playlist Details Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10 h-full">
              {/* Playlist Cover */}
              <div className="mb-6">
                <div
                  className={`w-full aspect-square bg-gradient-to-br ${coverColor} rounded-lg flex items-center justify-center relative overflow-hidden mb-3`}
                  onClick={handleColorChange}
                >
                  <Music className="h-16 w-16 text-white/50" />
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <button className="text-white hover:text-haiti-gold">
                      <ImageIcon size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center">
                  Click the cover to change colors or add a custom image
                </p>
              </div>

              {/* Playlist Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="playlistName" className="text-white/70 text-sm">Playlist Name</label>
                    <button
                      className="text-white/50 hover:text-white"
                      onClick={() => setIsEditing(true)}
                      title="Edit playlist name"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                  {isEditing ? (
                    <input
                      id="playlistName"
                      type="text"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-haiti-gold"
                      autoFocus
                      onBlur={() => setIsEditing(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                      placeholder="Enter playlist name"
                      title="Playlist name"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-white">{playlistName}</h3>
                  )}
                </div>

                <div>
                  <label htmlFor="playlistDescription" className="text-white/70 text-sm block mb-2">Description</label>
                  <textarea
                    id="playlistDescription"
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                    className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-haiti-gold h-24 resize-none"
                    placeholder="Describe your playlist"
                    title="Playlist description"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6">
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Tracks:</span>
                  <span>{selectedTracks.length}</span>
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Duration:</span>
                  <span>
                    {getSelectedTracksData()
                      .reduce((acc, track) => {
                        const [min, sec] = track.duration.split(':').map(Number);
                        return acc + min * 60 + sec;
                      }, 0)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} seconds
                  </span>
                </div>
              </div>

              {/* Save Button */}
              <Button
                className="w-full bg-gradient-to-r from-haiti-blue to-haiti-red text-white"
                onClick={handleSavePlaylist}
                disabled={selectedTracks.length === 0}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Playlist
              </Button>
            </div>
          </motion.div>

          {/* Song Selection Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
              {/* Search */}
              <div className="mb-6 relative">
                <label htmlFor="searchTracks" className="sr-only">Search for songs, artists, or albums</label>
                <input
                  id="searchTracks"
                  type="text"
                  placeholder="Search for songs, artists, or albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-haiti-gold"
                  title="Search tracks"
                />
                <Search className="absolute left-3 top-3.5 text-white/50 h-5 w-5" />
              </div>

              {/* Selected Tracks */}
              {selectedTracks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Selected Tracks</h3>
                  <div className="bg-white/5 rounded-lg overflow-hidden">
                    {getSelectedTracksData().map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-3 border-b border-white/10 last:border-0 hover:bg-white/10"
                      >
                        <div className="flex items-center">
                          <div className="bg-haiti-blue/20 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                            <Music className="h-5 w-5 text-haiti-blue" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{track.title}</h4>
                            <p className="text-white/70 text-sm">{track.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white/50 text-sm">{track.duration}</span>
                          <button
                            className="text-white/50 hover:text-haiti-red"
                            onClick={() => toggleTrackSelection(track.id)}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Tracks */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Available Tracks</h3>
                {filteredTracks.length === 0 ? (
                  <div className="text-center py-8 text-white/50">
                    No tracks found. Try a different search term.
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-lg overflow-hidden">
                    {filteredTracks
                      .filter((track) => !selectedTracks.includes(track.id))
                      .map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          role="button"
                          tabIndex={0}
                          aria-label={`Add ${track.title} by ${track.artist} to playlist`}
                          className="flex items-center justify-between p-3 border-b border-white/10 last:border-0 hover:bg-white/10 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-haiti-gold"
                          onClick={() => toggleTrackSelection(track.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleTrackSelection(track.id);
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <div className="bg-white/10 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                              <Music className="h-5 w-5 text-white/70" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{track.title}</h4>
                              <p className="text-white/70 text-sm">
                                {track.artist} • {track.album}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-white/50 text-sm">{track.duration}</span>
                            <span className="text-white/50 hover:text-haiti-gold">
                              <Plus size={18} aria-hidden="true" />
                            </span>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}