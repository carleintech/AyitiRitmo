// src/types/index.ts

// Feature Card Type for Home Page
export interface FeatureCard {
  title: string;
  description: string;
  icon: 'heart' | 'play' | 'music';
  gradient: string;
  href: string;
}

// User Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'artist' | 'admin';
  createdAt: Date;
}

export interface ArtistProfile extends UserProfile {
  role: 'artist';
  bio?: string;
  genre?: string[];
  location?: string;
  verified: boolean;
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
}

// Music Types
export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId?: string;
  albumName?: string;
  coverUrl?: string;
  audioUrl: string;
  duration: number;
  genre?: string;
  releaseDate?: Date;
  likes: number;
  streams: number;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverUrl?: string;
  releaseDate: Date;
  songs: Song[];
  totalDuration: number;
  genre?: string;
  description?: string;
}

export interface Playlist {
  id: string;
  title: string;
  coverUrl?: string;
  userId: string;
  userName: string;
  isPublic: boolean;
  songs: Song[];
  totalDuration: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Commerce Types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  artistId: string;
  artistName: string;
  category: string;
  inStock: boolean;
  attributes?: Record<string, string>;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
  interval: 'month' | 'year';
  stripePlanId: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  imageUrl?: string;
  artistId: string;
  artistName: string;
  price?: number;
  ticketsAvailable: number;
  ticketsSold: number;
}

// Settings and Preferences
export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'fr' | 'ht';
  notifications: {
    email: boolean;
    push: boolean;
    newReleases: boolean;
    artistUpdates: boolean;
  };
  privacy: {
    showListeningActivity: boolean;
    showPlaylists: boolean;
  };
}

// Analytics Types
export interface ArtistAnalytics {
  id: string;
  artistId: string;
  totalStreams: number;
  totalLikes: number;
  totalFollowers: number;
  topSongs: {
    songId: string;
    title: string;
    streams: number;
    likes: number;
  }[];
  audienceByCountry: Record<string, number>;
  streamingHistory: {
    date: string;
    streams: number;
  }[];
  revenue: {
    total: number;
    bySource: Record<string, number>;
    history: {
      date: string;
      amount: number;
    }[];
  };
}