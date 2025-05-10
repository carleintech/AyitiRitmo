import type { Metadata } from 'next'
import './globals.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

export const metadata: Metadata = {
  title: 'AyitiRitmo - The Haitian Music Revolution',
  description: 'Empowering Haitian music and culture through technology',
  keywords: ['Haitian music', 'Caribbean music', 'Kompa', 'Zouk', 'Rasin', 'AyitiRitmo'],
  authors: [{ name: 'AyitiRitmo Team' }],
  openGraph: {
    title: 'AyitiRitmo - The Haitian Music Revolution',
    description: 'Experience the rich rhythms of Haiti like never before',
    type: 'website',
    locale: 'en_US',
    siteName: 'AyitiRitmo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AyitiRitmo - The Haitian Music Revolution',
    description: 'Experience the rich rhythms of Haiti like never before',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}