'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search as SearchIcon, 
  Music, 
  User, 
  DiscIcon,
  PlayCircle,
  Heart,
  Plus,
  Mic,
  CheckCircle,
  X
} from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [recentSearches, setRecentSearches] = useState([
    'Konpa', 'Haiti Groove', 'Zouk Love', 'Carnival 2024', 'Traditional Roots'
  ]);
  
  const { setCurrentSong } = useMusic();

  // Mock search results
  const searchResults = {
    songs: [
      { id: '1', title: 'Konpa Paradise', artist: 'Haiti Groove', album: 'Summer Vibes', duration: 245, gradient: 'from-haiti-red to-orange-500' },
      { id: '2', title: 'Zouk Love', artist: 'Caribbean Dreamers', album: 'Tropical Heat', duration: 213, gradient: 'from-haiti-blue to-blue-500' },
      { id: '3', title: 'Rara Fever', artist: 'Traditional Roots', album: 'Cultural Heritage', duration: 198, gradient: 'from-green-600 to-green-400' },
    ],
    artists: [
      { id: '1', name: 'Haiti Groove', followers: '125K', verified: true, gradient: 'from-haiti-red to-orange-500' },
      { id: '2', name: 'Caribbean Dreamers', followers: '98K', verified: true, gradient: 'from-haiti-blue to-blue-500' },
      { id: '3', name: 'Traditional Roots', followers: '156K', verified: false, gradient: 'from-green-600 to-green-400' },
      { id: '4', name: 'Young Haiti', followers: '67K', verified: true, gradient: 'from-purple-600 to-purple-400' },
    ],
    albums: [
      { id: '1', title: 'Summer Vibes', artist: 'Haiti Groove', year: '2024', gradient: 'from-haiti-red to-orange-500' },
      { id: '2', title: 'Tropical Heat', artist: 'Caribbean Dreamers', year: '2024', gradient: 'from-haiti-blue to-blue-500' },
      { id: '3', title: 'Cultural Heritage', artist: 'Traditional Roots', year: '2023', gradient: 'from-green-600 to-green-400' },
    ],
    playlists: [
      { id: '1', title: 'Top Konpa Hits', creator: 'AyitiRitmo', tracks: 45, gradient: 'from-haiti-red to-orange-500' },
      { id: '2', title: 'Zouk Essentials', creator: 'Music Lover', tracks: 30, gradient: 'from-haiti-blue to-blue-500' },
      { id: '3', title: 'Carnival 2024', creator: 'Party Central', tracks: 25, gradient: 'from-orange-500 to-red-500' },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches([searchQuery.trim(), ...recentSearches.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  const isSearching = searchQuery.length > 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <Input
            type="search"
            placeholder="Search for songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-lg bg-slate-800 border-slate-700 focus:border-haiti-blue"
          />
          {searchQuery && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </form>
      </motion.div>

      {!isSearching ? (
        /* Recent Searches and Browse */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Recent Searches</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <div key={index} className="group relative">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setSearchQuery(search)}
                    >
                      <SearchIcon className="h-3 w-3 mr-2" />
                      {search}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeRecentSearch(search)}
                    >
                      <X className="h-3 w-3 text-white/60" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse by Genre */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Konpa', 'Zouk', 'Rasin', 'Rap Kreyòl', 'Twoubadou', 'Rara', 'Afro-Antillais', 'Haiti Jazz'].map((genre) => (
                <Card key={genre} className="p-6 cursor-pointer hover:bg-slate-800/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <Music className="h-6 w-6 text-haiti-red" />
                    <h3 className="font-medium text-white">{genre}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending Searches */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Trending Searches</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Carnival 2024', 'Haiti Groove - New Album', 'Top Konpa Hits', 'Zouk Essentials'].map((trend, index) => (
                <Card key={trend} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-haiti-red/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-haiti-red">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{trend}</h3>
                      <p className="text-sm text-white/60">Trending now</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        /* Search Results */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-slate-800">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Top Results */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Top Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-haiti-red to-orange-500 rounded-lg mb-4" />
                    <h4 className="font-bold text-white">Haiti Groove</h4>
                    <p className="text-sm text-white/60">Artist • 125K followers</p>
                    <Button className="w-full mt-4 bg-haiti-red hover:bg-haiti-red/90">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </Card>
                  
                  <Card className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-haiti-blue to-blue-500 rounded-lg mb-4" />
                    <h4 className="font-bold text-white">Summer Vibes</h4>
                    <p className="text-sm text-white/60">Album • Haiti Groove • 2024</p>
                    <Button className="w-full mt-4 bg-haiti-red hover:bg-haiti-red/90">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </Card>
                  
                  <Card className="p-6 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-green-600 to-green-400 rounded-lg mb-4" />
                    <h4 className="font-bold text-white">Top Konpa Hits</h4>
                    <p className="text-sm text-white/60">Playlist • 45 songs</p>
                    <Button className="w-full mt-4 bg-haiti-red hover:bg-haiti-red/90">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </Card>
                </div>
              </div>

              {/* Songs */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Songs</h3>
                <div className="space-y-2">
                  {searchResults.songs.map((song) => (
                    <Card key={song.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${song.gradient} rounded flex items-center justify-center`}>
                          <PlayCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{song.title}</h4>
                          <p className="text-sm text-white/60">{song.artist} • {song.album}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white/60">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
                          <Button size="icon" variant="ghost" className="text-white/60 hover:text-haiti-red">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-white/60 hover:text-white">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Artists */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Artists</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {searchResults.artists.map((artist) => (
                    <Card key={artist.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                      <div className={`aspect-square bg-gradient-to-br ${artist.gradient} rounded-full mb-3 relative`}>
                        {artist.verified && (
                          <div className="absolute bottom-0 right-0 bg-black p-1 rounded-full">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-white text-center line-clamp-1">{artist.name}</h4>
                      <p className="text-sm text-white/60 text-center">{artist.followers} followers</p>
                      <Button className="w-full mt-3" variant="outline" size="sm">
                        Follow
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="songs">
              <div className="space-y-2">
                {searchResults.songs.map((song) => (
                  <Card key={song.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${song.gradient} rounded flex items-center justify-center`}>
                        <PlayCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{song.title}</h4>
                        <p className="text-sm text-white/60">{song.artist} • {song.album}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
                        <Button size="icon" variant="ghost" className="text-white/60 hover:text-haiti-red">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white/60 hover:text-white">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="artists">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.artists.map((artist) => (
                  <Card key={artist.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className={`aspect-square bg-gradient-to-br ${artist.gradient} rounded-full mb-3 relative`}>
                      {artist.verified && (
                        <div className="absolute bottom-0 right-0 bg-black p-1 rounded-full">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium text-white text-center line-clamp-1">{artist.name}</h4>
                    <p className="text-sm text-white/60 text-center">{artist.followers} followers</p>
                    <Button className="w-full mt-3" variant="outline" size="sm">
                      Follow
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="albums">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.albums.map((album) => (
                  <Card key={album.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className={`aspect-square bg-gradient-to-br ${album.gradient} rounded-lg mb-3 relative overflow-hidden group`}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <h4 className="font-medium text-white line-clamp-1">{album.title}</h4>
                    <p className="text-sm text-white/60">{album.artist} • {album.year}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="playlists">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.playlists.map((playlist) => (
                  <Card key={playlist.id} className="p-4 hover:bg-slate-800/80 transition-colors cursor-pointer">
                    <div className={`aspect-square bg-gradient-to-br ${playlist.gradient} rounded-lg mb-3 relative overflow-hidden group`}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <h4 className="font-medium text-white line-clamp-1">{playlist.title}</h4>
                    <p className="text-sm text-white/60">By {playlist.creator} • {playlist.tracks} tracks</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
};

export default SearchPage;