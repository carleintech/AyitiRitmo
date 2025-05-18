import { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import MusicPlayer from "@/components/player/MusicPlayer";

export const metadata: Metadata = {
  title: "AyitiRitmo Dashboard",
  description: "Discover and enjoy Haitian music",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-haiti-blue/90 via-black to-haiti-red/90">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavbar />
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}