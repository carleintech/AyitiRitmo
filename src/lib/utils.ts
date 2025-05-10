import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export const GENRES = [
  'Kompa',
  'Zouk',
  'Rasin',
  'Rap Kreyòl',
  'Twoubadou',
  'Rara',
  'Afro-Antillais',
  'Haiti Jazz',
]

export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  SUBSCRIBE: '/subscribe',
  DASHBOARD: '/dashboard',
  CHARTS: '/charts',
  MUSIC: '/music',
  VIDEOS: '/videos',
  SHOP: '/shop',
  AWARDS: '/awards',
  CULTURE: '/culture',
  ARTIST: '/artist',
  AUTH: '/auth',
} as const