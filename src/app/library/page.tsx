"use client";

import { useState } from "react";
import { Clock, Heart, MoreHorizontal, Play } from "lucide-react";

// Sample data for the user's library
const libraryData = {
  playlists: [
    { id: 1, name: "Kompa Favorites", songs: 28, image: "playlist1.jpg" },
    { id: 2, name: "Carnival Hits", songs: 18, image: "playlist2.jpg" },
    { id: 3, name: "Rasin Classics", songs: 15, image: "playlist3.jpg" },
    { id: 4, name: "My Discovery Mix", songs: 25, image: "playlist4.jpg" },
  ],
  likedSongs: [
    { id: 1, title: "Rasanble", artist: "RAM", album: "RAM 6: Manman m se Ginen", duration: "5:32" },
    { id: 2, title: "Sweet Caroline", artist: "Tabou Combo", album: "The Masters", duration: "4:45" },
    { id: 3, title: "Pale Pale", artist: "Carimi", album: "Nasty Business", duration: "4:12" },
    { id: 4, title: "Jodi a", artist: "Nu Look", album: "I Got This", duration: "6:03" },
    { id: 5, title: "Ayiti Bang Bang", artist: "Carimi", album: "Buzz", duration: "5:18" },
  ],
  albums: [
    { id: 1, name: "Goute Sel", artist: "RAM", year: "2016", image: "album1.jpg" },
    { id: 2, name: "The 9th", artist: "T-Vice", year: "2019", image: "album2.jpg" },
    { id: 3, name: "Memoirs", artist: "Harmonik", year: "2015", image: "album3.jpg" },
  ],
  recentlyPlayed: [
    { id: 1, title: "Manje Lwa", artist: "Boukman Eksperyans", type: "Song" },
    { id: 2, title: "Sweet Caribbean", artist: "T-Vice", type: "Album" },
    { id: 3, title: "Haitian Party Mix", artist: "AyitiRitmo", type: "Playlist" },
    { id: 4, title: "Nou Nan Male", artist: "Tabou Combo", type: "Song" },
  ],
};

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("playlists");
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        
        <div className="flex gap-4">
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Recent
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Albums
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Artists
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex space-x-6 border-b border-white/10">
          <TabButton 
            label="Playlists" 
            active={activeTab === "playlists"} 
            onClick={() => setActiveTab("playlists")} 
          />
          <TabButton 
            label="Liked Songs" 
            active={activeTab === "liked"} 
            onClick={() => setActiveTab("liked")} 
          />
          <TabButton 
            label="Albums" 
            active={activeTab === "albums"} 
            onClick={() => setActiveTab("albums")} 
          />
          <TabButton 
            label="Recently Played" 
            active={activeTab === "recent"} 
            onClick={() => setActiveTab("recent")} 
          />
        </div>
      </div>
      
      {activeTab === "playlists" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {libraryData.playlists.map((playlist) => (
            <PlaylistCard 
              key={playlist.id} 
              name={playlist.name} 
              songs={playlist.songs} 
              image={playlist.image} 
            />
          ))}
          
          <div className="bg-gradient-to-br from-haiti-blue/30 to-haiti-blue/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 flex flex-col items-center justify-center p-6 text-center h-full">
            <div className="w-12 h-12 bg-haiti-gold/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-haiti-gold text-2xl">+</span>
            </div>
            <h3 className="text-white font-medium mb-2">Create Playlist</h3>
            <p className="text-white/70 text-sm">Build your own collection of your favorite songs</p>
          </div>
        </div>
      )}
      
      {activeTab === "liked" && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-white/70 text-sm">
                <th className="py-3 px-4 w-10">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Album</th>
                <th className="py-3 px-4 flex items-center justify-end">
                  <Clock className="h-4 w-4" />
                </th>
              </tr>
            </thead>
            <tbody>
              {libraryData.likedSongs.map((song, index) => (
                <tr key={song.id} className="hover:bg-white/10 text-white group">
                  <td className="py-3 px-4 text-white/70 group-hover:text-white">
                    <div className="relative">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play className="h-4 w-4 hidden group-hover:block" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Heart className="h-4 w-4 text-haiti-gold" fill="currentColor" />
                      </div>
                      <div>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-white/70 text-sm">{song.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/70">{song.album}</td>
                  <td className="py-3 px-4 flex items-center justify-end">
                    <span className="text-white/70 mr-4">{song.duration}</span>
                    <MoreHorizontal className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === "albums" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {libraryData.albums.map((album) => (
            <AlbumCard 
              key={album.id} 
              name={album.name} 
              artist={album.artist} 
              year={album.year} 
              image={album.image} 
            />
          ))}
        </div>
      )}
      
      {activeTab === "recent" && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
          {libraryData.recentlyPlayed.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center p-4 border-b border-white/10 last:border-none hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded bg-haiti-gold/20 flex items-center justify-center mr-4">
                {item.type === "Song" && "♫"}
                {item.type === "Album" && "💿"}
                {item.type === "Playlist" && "📂"}
              </div>
              
              <div className="flex-1">
                <h4 className="text-white font-medium">{item.title}</h4>
                <div className="flex items-center text-white/70 text-sm">
                  <span>{item.artist}</span>
                  <span className="mx-2">•</span>
                  <span>{item.type}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <button className="text-white/70 hover:text-white p-2">
                  <Play className="h-5 w-5" />
                </button>
                <button className="text-white/70 hover:text-white p-2">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-1 font-medium text-sm relative ${
        active ? 'text-white' : 'text-white/60 hover:text-white/90'
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-haiti-gold" />
      )}
    </button>
  );
}

interface PlaylistCardProps {
  name: string;
  songs: number;
  image: string;
}

function PlaylistCard({ name, songs, image: _image }: PlaylistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="aspect-square bg-gradient-to-br from-haiti-blue/20 to-haiti-red/20 rounded-md mb-3 relative">
          {/* Placeholder for image */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-5xl opacity-20">
            ♫
          </div>
          
          {isHovered && (
            <div className="absolute bottom-2 right-2">
              <button className="bg-haiti-gold rounded-full p-2 text-haiti-blue">
                <Play fill="currentColor" size={20} />
              </button>
            </div>
          )}
        </div>
        
        <h3 className="text-white font-medium">{name}</h3>
        <p className="text-white/70 text-sm">{songs} songs</p>
      </div>
    </div>
  );
}

interface AlbumCardProps {
  name: string;
  artist: string;
  year: string;
  image: string;
}

function AlbumCard({ name, artist, year, image: _image }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="aspect-square bg-gradient-to-br from-haiti-gold/20 to-haiti-red/20 rounded-md mb-3 relative">
          {/* Placeholder for image */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-5xl opacity-20">
            💿
          </div>
          
          {isHovered && (
            <div className="absolute bottom-2 right-2">
              <button className="bg-haiti-gold rounded-full p-2 text-haiti-blue">
                <Play fill="currentColor" size={20} />
              </button>
            </div>
          )}
        </div>
        
        <h3 className="text-white font-medium">{name}</h3>
        <p className="text-white/70 text-sm">{artist} • {year}</p>
      </div>
    </div>
  );
}
