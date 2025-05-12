'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-white flex items-center gap-2 mb-8">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-haiti-red to-haiti-blue bg-clip-text text-transparent">
            About AyitiRitmo
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20 space-y-4">
              <h2 className="text-2xl font-bold text-haiti-gold">Introduction</h2>
              <p className="leading-relaxed">
                AyitiRitmo is a revolutionary platform dedicated to celebrating, preserving, and promoting 
                the richness of Haitian music and culture. From the vibrant beats of Kompa to the soulful 
                rhythms of Twoubadou, AyitiRitmo seeks to become the global hub for Haitian music, 
                empowering artists and connecting audiences worldwide.
              </p>
              <p className="leading-relaxed">
                By blending modern technology with traditional heritage, AyitiRitmo will not only redefine 
                how Haitian music is consumed but also foster a deeper appreciation of Haiti's cultural legacy.
              </p>
            </section>

            <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20 space-y-4">
              <h2 className="text-2xl font-bold text-haiti-gold">Vision & Mission</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-haiti-red">Vision</h3>
                <p className="leading-relaxed">
                  To position Haitian music and culture as a global phenomenon, fostering unity within the 
                  Haitian diaspora while empowering artists to achieve international recognition and success.
                </p>
                
                <h3 className="text-xl font-semibold text-haiti-red">Mission</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="leading-relaxed">
                    <span className="font-semibold">Empower Artists:</span> Provide Haitian musicians with a comprehensive platform to 
                    showcase their talent, gain global exposure, and earn fair revenue.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Preserve Culture:</span> Archive and promote the rich history and diversity of Haitian 
                    music and its cultural significance.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Connect Communities:</span> Strengthen the bond within the Haitian diaspora by 
                    creating a shared space to celebrate their cultural roots.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Innovate the Industry:</span> Leverage modern technology and AI to revolutionize how 
                    Haitian music is discovered, shared, and appreciated.
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20 space-y-4">
              <h2 className="text-2xl font-bold text-haiti-gold">Core Features</h2>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-haiti-red">For Artists</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="leading-relaxed">
                    <span className="font-semibold">Artist Profiles:</span> Personalized pages showcasing bios, discographies, tour schedules, 
                    and merchandise stores.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Creator Dashboard:</span> Performance analytics, fan engagement metrics, and revenue 
                    insights.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Revenue Tools:</span> Fair streaming royalties, crowdfunding capabilities, and direct fan 
                    support features.
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-haiti-red">For Users</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="leading-relaxed">
                    <span className="font-semibold">Music Streaming:</span> Access curated playlists, genre-specific stations, and exclusive 
                    new releases.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Interactive Features:</span> Karaoke mode with synced lyrics, dance tutorials, and fan 
                    challenges.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Fan Leaderboards:</span> Recognize and reward loyal fans with exclusive perks and 
                    experiences.
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-haiti-red">Innovative Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="leading-relaxed">
                    <span className="font-semibold">Cultural Preservation:</span> Archive historical Haitian music and share the stories 
                    behind iconic songs.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">AI-Powered Recommendations:</span> Suggest personalized tracks and 
                    underrepresented artists based on user preferences.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold">Global Visibility:</span> Collaborate with international platforms to expand the reach of 
                    Haitian music.
                  </li>
                </ul>
              </div>
            </section>
          </motion.div>

          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <section className="bg-gradient-to-br from-haiti-blue/20 to-haiti-red/20 p-6 rounded-xl shadow-lg border border-haiti-gold/20">
              <h2 className="text-2xl font-bold text-haiti-gold mb-4">The Team</h2>
              <p className="leading-relaxed mb-4">
                AyitiRitmo was founded by Erickharlein Pierre (Carleintech), a passionate advocate for Haitian culture and technological innovation. Our team consists of developers, musicians, cultural historians, and entrepreneurs dedicated to bringing Haitian music to the world stage.
              </p>
              <p className="font-semibold text-haiti-red">
                "Let's make this vision a reality and bring Haitian music to the world stage."
              </p>
            </section>

            <section className="bg-gradient-to-br from-haiti-blue/20 to-haiti-red/20 p-6 rounded-xl shadow-lg border border-haiti-gold/20">
              <h2 className="text-2xl font-bold text-haiti-gold mb-4">Subscription Tiers</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold">Free Tier</h4>
                  <p className="text-white/70">Ad-supported access to music and limited features.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold">Premium Tier</h4>
                  <p className="text-white/70">$5/month for ad-free listening, exclusive content, and offline playback.</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-haiti-blue/20 to-haiti-red/20 p-6 rounded-xl shadow-lg border border-haiti-gold/20">
              <h2 className="text-2xl font-bold text-haiti-gold mb-4">Expected Impact</h2>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-haiti-red">•</span>
                  <div>
                    <span className="font-semibold">For Artists:</span>
                    <p className="text-white/70">Increased revenue and exposure on a global scale.</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-haiti-red">•</span>
                  <div>
                    <span className="font-semibold">For Fans:</span>
                    <p className="text-white/70">A rich and immersive platform to connect with Haitian culture.</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-haiti-red">•</span>
                  <div>
                    <span className="font-semibold">For Haitian Culture:</span>
                    <p className="text-white/70">Preservation and celebration of traditional and modern Haitian music.</p>
                  </div>
                </li>
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}