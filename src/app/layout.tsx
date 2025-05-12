// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import SessionProvider from './SessionProvider';
import { MusicProvider } from '@/context/MusicContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AyitiRitmo - Haitian Music Platform',
  description: 'Discover, stream, and celebrate Haitian music culture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SessionProvider>
            <MusicProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </MusicProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}