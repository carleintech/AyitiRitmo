"use client";

import { useState } from "react";
import { Search } from "lucide-react";

// Sample data for search results
const searchResults = {
  songs: [
    { id: 1, title: "Lage M", artist: "Boukman Eksperyans", album: "Kalfou Danjere" },
    { id: 2, title: "Mwen Ale", artist: "Sweet Micky", album: "Pa Manyen" },
    { id: 3, title: "Ou Pati", artist: "T-Vice", album: "Best of T-Vice" },
  ],
  artists: [
    { id: 1, name: "Tabou Combo", genre: "Kompa", popularSong: "New York City" },
    { id: 2, name: "Carimi", genre: "Kompa", popularSong: "Ayiti Bang Bang" },
  ],
  albums: [
    { id: 1, title: "Préliminaires", artist: "RAM", year: "2016", songs: 12 },
    { id: 2, title: "Tanbou Nan Lakou Brooklyn", artist: "Djarara", year: "2021", songs: 9 },
  ],
  playlists: [
    { id: 1, title: "Haitian Dance Party", creator: "AyitiRitmo", songs: 25 },
    { id: 2, title: "Haitian Classics", creator: "Jean", songs: 18 },
  ],
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would fetch results from the API
    console.log("Searching for:", query);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, albums..."
            className="w-full py-3 px-12 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-haiti-gold focus:border-transparent"
          />
          <Search className="absolute left-4 top-3.5 text-white/60 h-5 w-5" />
          
          <button 
            type="submit" 
            className="absolute right-3 top-2 bg-haiti-gold text-haiti-blue py-1.5 px-4 rounded-full font-medium text-sm"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="mb-6">
        <div className="flex space-x-6 border-b border-white/10">
          <TabButton 
            label="All" 
            active={activeTab === "all"} 
            onClick={() => setActiveTab("all")} 
          />
          <TabButton 
            label="Songs" 
            active={activeTab === "songs"} 
            onClick={() => setActiveTab("songs")} 
          />
          <TabButton 
            label="Artists" 
            active={activeTab === "artists"} 
            onClick={() => setActiveTab("artists")} 
          />
          <TabButton 
            label="Albums" 
            active={activeTab === "albums"} 
            onClick={() => setActiveTab("albums")} 
          />
          <TabButton 
            label="Playlists" 
            active={activeTab === "playlists"} 
            onClick={() => setActiveTab("playlists")} 
          />
        </div>
      </div>
      
      {query ? (
        <div>
          {(activeTab === "all" || activeTab === "songs") && (
            <SearchResultSection title="Songs" items={searchResults.songs.map(song => (
              <div key={song.id} className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                <div className="w-10 h-10 bg-haiti-blue/30 rounded flex items-center justify-center mr-4">
                  ♫
                </div>
                <div>
                  <h4 className="text-white font-medium">{song.title}</h4>
                  <p className="text-white/70 text-sm">{song.artist} • {song.album}</p>
                </div>
              </div>
            ))} />
          )}
          
          {(activeTab === "all" || activeTab === "artists") && (
            <SearchResultSection title="Artists" items={searchResults.artists.map(artist => (
              <div key={artist.id} className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                <div className="w-12 h-12 bg-haiti-red/30 rounded-full flex items-center justify-center mr-4">
                  👤
                </div>
                <div>
                  <h4 className="text-white font-medium">{artist.name}</h4>
                  <p className="text-white/70 text-sm">{artist.genre} • Popular: {artist.popularSong}</p>
                </div>
              </div>
            ))} />
          )}
          
          {(activeTab === "all" || activeTab === "albums") && (
            <SearchResultSection title="Albums" items={searchResults.albums.map(album => (
              <div key={album.id} className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                <div className="w-14 h-14 bg-haiti-gold/30 rounded flex items-center justify-center mr-4">
                  💿
                </div>
                <div>
                  <h4 className="text-white font-medium">{album.title}</h4>
                  <p className="text-white/70 text-sm">{album.artist} • {album.year} • {album.songs} songs</p>
                </div>
              </div>
            ))} />
          )}
          
          {(activeTab === "all" || activeTab === "playlists") && (
            <SearchResultSection title="Playlists" items={searchResults.playlists.map(playlist => (
              <div key={playlist.id} className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                <div className="w-14 h-14 bg-white/20 rounded flex items-center justify-center mr-4">
                  📂
                </div>
                <div>
                  <h4 className="text-white font-medium">{playlist.title}</h4>
                  <p className="text-white/70 text-sm">By {playlist.creator} • {playlist.songs} songs</p>
                </div>
              </div>
            ))} />
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-white mb-4">Discover Haitian Music</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Search for your favorite Haitian artists, songs, and albums. Explore the rich culture and rhythm of Haiti.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <BrowseButton label="Kompa" color="bg-haiti-blue" />
            <BrowseButton label="Rasin" color="bg-green-700" />
            <BrowseButton label="Zouk" color="bg-purple-700" />
            <BrowseButton label="Twoubadou" color="bg-haiti-red" />
          </div>
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

interface SearchResultSectionProps {
  title: string;
  items: React.ReactNode[];
}

function SearchResultSection({ title, items }: SearchResultSectionProps) {
  if (items.length === 0) return null;
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
        {items}
      </div>
    </div>
  );
}

interface BrowseButtonProps {
  label: string;
  color: string;
}

function BrowseButton({ label, color }: BrowseButtonProps) {
  return (
    <button className={`${color} rounded-lg p-4 text-white font-medium hover:opacity-90 transition-opacity`}>
      {label}
    </button>
  );
}