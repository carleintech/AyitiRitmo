export interface User {
  id: string;
  email: string;
  name: string;
  type: 'fan' | 'artist';
  avatar?: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  genres: string[];
  followers: number;
  verified: boolean;
  avatar: string;
  coverImage: string;
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  album?: string;
  duration: number;
  coverArt: string;
  audioUrl: string;
  likes: number;
  plays: number;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  coverArt: string;
  creator: User;
  public: boolean;
}

export interface Chart {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  updatedAt: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  href: string;
}