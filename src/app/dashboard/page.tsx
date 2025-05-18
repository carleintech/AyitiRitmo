import HeroCarousel from "@/components/dashboard/HeroCarousel";
import RecentlyPlayed from "@/components/dashboard/RecentlyPlayed";
import MadeForYou from "@/components/dashboard/MadeForYou";
import TrendingInHaiti from "@/components/dashboard/TrendingInHaiti";
import GenreExploration from "@/components/dashboard/GenreExploration";
import CulturalSpotlight from "@/components/dashboard/CulturalSpotlight";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <HeroCarousel />
      
      <RecentlyPlayed />
      
      <MadeForYou />
      
      <TrendingInHaiti />
      
      <GenreExploration />
      
      <CulturalSpotlight />
    </div>
  );
}