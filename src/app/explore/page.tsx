"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Play, User, Music, Disc, HeadphonesIcon } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-haiti-blue via-black to-haiti-red">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <Link href="/welcome" className="flex items-center">
            <div className="w-12 h-12 mr-2 relative">
              <Image src="/images/logo.png" alt="AyitiRitmo" layout="fill" objectFit="contain" />
            </div>
            <span className="text-2xl font-bold text-white">AyitiRitmo</span>
          </Link>
          
          <div className="flex gap-4">
            <Link href="/welcome">
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-medium transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/welcome?signup=true">
              <button className="bg-haiti-gold text-haiti-blue px-4 py-2 rounded-full font-medium">
                Sign Up
              </button>
            </Link>
          </div>
        </header>
        
        <main className="space-y-20">
          <section className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Discover the Rhythm of Haiti</h1>
                <p className="text-white/80 text-lg mb-8">
                  AyitiRitmo is the premier platform for Haitian music, connecting artists and fans through the powerful rhythms and melodies of Haiti.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/welcome?signup=true">
                    <button className="bg-haiti-gold text-haiti-blue px-6 py-3 rounded-full font-bold text-lg">
                      Get Started
                    </button>
                  </Link>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2">
                    <Play fill="currentColor" size={20} />
                    Watch Demo
                  </button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-haiti-blue/30 to-haiti-red/30 rounded-xl overflow-hidden flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <HeadphonesIcon className="w-1/2 h-1/2 text-white/20" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-haiti-gold rounded-full p-6 text-haiti-blue">
                        <Play fill="currentColor" size={32} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
          
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Experience Haitian Music Like Never Before</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                AyitiRitmo brings together the diverse sounds of Haiti, from vibrant Kompa to soulful Twoubadou.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Music className="h-8 w-8" />} 
                title="Discover" 
                description="Explore a vast catalog of Haitian music from both established and emerging artists." 
              />
              <FeatureCard 
                icon={<User className="h-8 w-8" />} 
                title="Connect" 
                description="Follow your favorite artists and connect with fans who share your passion for Haitian music." 
              />
              <FeatureCard 
                icon={<Disc className="h-8 w-8" />} 
                title="Celebrate" 
                description="Immerse yourself in the rich cultural traditions behind the music of Haiti." 
              />
            </div>
          </section>
          
          <section className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Genres</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Explore the diverse styles and rhythms that make Haitian music so unique.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <GenreCard name="Kompa" description="The modern dance music of Haiti" color="bg-haiti-blue" />
              <GenreCard name="Rasin" description="Traditional roots music with Vodou influences" color="bg-green-700" />
              <GenreCard name="Twoubadou" description="Folk music inspired by Spanish troubadours" color="bg-haiti-red" />
              <GenreCard name="Rap Kreyòl" description="Hip-hop with Haitian Creole lyrics" color="bg-haiti-gold text-haiti-blue" />
            </div>
          </section>
          
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Join the Revolution</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Be part of the movement to celebrate and preserve Haitian music and culture.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <Link href="/welcome?signup=true">
                <button className="bg-haiti-gold text-haiti-blue px-8 py-4 rounded-full font-bold text-xl mb-4">
                  Sign Up for Free
                </button>
              </Link>
              <p className="text-white/60">
                No credit card required. Start listening today.
              </p>
            </div>
          </section>
        </main>
        
        <footer className="mt-24 pt-8 border-t border-white/10 text-white/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">AyitiRitmo</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Communities</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">For Artists</Link></li>
                <li><Link href="#" className="hover:text-white">Developers</Link></li>
                <li><Link href="#" className="hover:text-white">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Copyright</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">Instagram</Link></li>
                <li><Link href="#" className="hover:text-white">Twitter</Link></li>
                <li><Link href="#" className="hover:text-white">Facebook</Link></li>
                <li><Link href="#" className="hover:text-white">YouTube</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center py-6 border-t border-white/10">
            <p>© 2025 AyitiRitmo. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="bg-haiti-gold/20 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-haiti-gold">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
      
      <div className="mt-4">
        <Link href="/welcome" className="text-haiti-gold font-medium flex items-center gap-1 hover:gap-2 transition-all">
          <span>Learn more</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

interface GenreCardProps {
  name: string;
  description: string;
  color: string;
}

function GenreCard({ name, description, color }: GenreCardProps) {
  return (
    <motion.div 
      className={`${color} rounded-xl p-6 h-48 flex flex-col justify-between`}
      whileHover={{ scale: 1.05 }}
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
      
      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 self-end transition-colors">
        <Play fill="currentColor" size={20} />
      </button>
    </motion.div>
  );
}