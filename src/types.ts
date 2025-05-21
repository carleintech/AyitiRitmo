// src/types.ts

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  href: string;
}

export interface User {
  id?: string;
  email: string;
  name: string;
  isArtist: boolean;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumTitle?: string;
  coverImage?: string;
  audioSrc: string;
  duration: number; // in seconds
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverImage?: string;
  releaseDate: string;
  tracks: Track[];
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  tracks: Track[];
  createdBy: string;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  tracks: Track[];
  albums: Album[];
}