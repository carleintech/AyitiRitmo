import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to get time-based greeting
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return "Bonjou"; // Good morning in Haitian Creole
  } else if (hour < 18) {
    return "Bon Apremidi"; // Good afternoon in Haitian Creole
  } else {
    return "Bonswa"; // Good evening in Haitian Creole
  }
}

// Function to format duration
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Define app routes
export const ROUTES = {
  HOME: "/",
  WELCOME: "/welcome",
  DASHBOARD: "/dashboard",
  EXPLORE: "/explore",
  SEARCH: "/search",
  LIBRARY: "/library",
  PROFILE: "/profile",
  ARTIST_PORTAL: "/artist-portal",
  UPLOAD: "/artist-portal/upload",
  CREATE_PLAYLIST: "/create-playlist",
  RECOMMENDATIONS: "/recommendations",
  SUBSCRIBE: "/subscribe",
  ABOUT: "/about",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  AUTH_LOGIN: "/welcome?signin=true",
  AUTH_REGISTER: "/welcome?signup=true"
};

// Extract search parameters from URL
export function getURLParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}