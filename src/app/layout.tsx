import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import RouteGuard from "@/components/auth/RouteGuard";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AyitiRitmo - Haitian Music Platform",
  description: "Celebrating and promoting Haitian music and culture",
  keywords: ["Haitian music", "Kompa", "Twoubadou", "Caribbean music", "Haiti", "music streaming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <AuthProvider>
          <RouteGuard>
            {children}
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}