import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SessionProvider from './SessionProvider';
import { MusicProvider } from '@/context/MusicContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AyitiRitmo - Celebrating Haitian Music',
  description: 'The ultimate platform for Haitian music and culture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <MusicProvider>
              {children}
            </MusicProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}