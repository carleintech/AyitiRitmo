"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// Dummy data for sections (expand as needed)
const timelineItems = [
  { title: "Vodou Ceremonial Music", year: "1700s", img: "/images/vodou.jpg", audio: "/audio/vodou.mp3" },
  { title: "Rasin", year: "1960s", img: "/images/rasin.jpg", audio: "/audio/rasin.mp3" },
  { title: "Kompa", year: "1950s", img: "/images/kompa.jpg", audio: "/audio/kompa.mp3" },
  { title: "Modern Fusion", year: "2000s", img: "/images/fusion.jpg", audio: "/audio/fusion.mp3" }
];

const essentialTracks = [
  { img: "/tracks/ram.jpg", title: "RAM – “Agwe” (1998)", audio: "/audio/agwe.mp3", artist: "RAM", year: 1998 }
  // Add more...
];

const galleryImages = [
  { img: "/gallery/dancer.jpg", label: "Yanvalou Dance in Gonaïves", fact: "Traditional dance honoring the spirits." },
  { img: "/gallery/tanbou.jpg", label: "Tanbou: Heartbeat of Vodou", fact: "The tanbou drum is sacred in Vodou." }
  // Add more...
];

const facts = [
  "The tanbou drum is considered sacred in Vodou.",
  "Rasin music helped spark political resistance in the 80s.",
  "Kompa was inspired by Dominican merengue and Haitian folk."
];

const mapHotspots = [
  {
    name: "Jacmel",
    images: ["/gallery/jacmel1.jpg", "/gallery/jacmel2.jpg"],
    audio: "/audio/jacmel.mp3",
    blurb: "Known for its vibrant Carnival and art culture. Many Rasin bands perform here yearly."
  },
  // Add more...
];

export default function DiscoverAyitiPage() {
  const [showFallback, setShowFallback] = useState(false);
  const [slide, setSlide] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [factIdx, setFactIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setFactIdx(i => (i + 1) % facts.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showFallback) {
      const timeout = setTimeout(() => setSlide(s => (s + 1) % 3), 4000);
      return () => clearTimeout(timeout);
    }
  }, [slide, showFallback]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen font-sans relative">
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            color: { value: ["#FFD700", "#0051BA", "#DC143C", "#B621FE", "#43C6AC"] },
            shape: { type: "circle" },
            opacity: { value: 0.7 },
            size: { value: 4 },
            move: { enable: true, speed: 1.5 }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } }
          },
          retina_detect: true
        }}
        className="absolute inset-0 z-0"
      />

      {/* --- HERO Section --- */}
      <header
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
        style={{
          background:
            "linear-gradient(135deg, #0051BA 0%, #FFD700 40%, #DC143C 100%)"
        }}
      >
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            src="/videos/haiti-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setShowFallback(true)}
            style={{ display: showFallback ? "none" : "block" }}
          />
          {showFallback && (
            <AnimatePresence>
              <motion.div
                key={slide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-full absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #FF512F 0%, #F09819 100%)"
                }}
              >
                <Image
                  src={`/images/haiti${(slide % 3) + 1}.jpg`}
                  fill
                  alt="Fallback"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          )}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(25,22,84,0.75) 0%, rgba(255,81,47,0.45) 100%)"
            }}
          />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white drop-shadow-md font-serif"
            style={{ textShadow: "2px 4px 12px #191654" }}
          >
            Experience Authentic Haitian Rhythms
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg md:text-2xl text-white/90"
            style={{ textShadow: "1px 2px 8px #0051BA" }}
          >
            Dive into the soul of Ayiti through music, culture, and tradition.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => scrollToSection("roots")}
            className="mt-8 px-8 py-3 rounded-full font-bold text-lg shadow-lg"
            style={{
              background:
                "linear-gradient(90deg, #FFD700 0%, #FF00CC 100%)",
              color: "#191654",
              border: "2px solid #fff"
            }}
          >
            Explore our Community &rarr;
          </motion.button>
        </div>
      </header>

      {/* --- Section 1: The Roots of the Rhythm --- */}
      <section
        id="roots"
        className="relative py-24 z-10"
        style={{
          background:
            "linear-gradient(120deg, #191654 0%, #B621FE 50%, #FF512F 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          {/* Timeline (left) */}
          <div>
            <h2 className="text-3xl font-serif text-yellow-200 mb-8 font-bold" style={{ textShadow: "1px 2px 8px #FF512F" }}>
              The Roots of the Rhythm
            </h2>
            <div className="space-y-8">
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: idx * 0.2 }}
                  className={`flex items-center gap-4 cursor-pointer ${activeTimeline === idx ? "opacity-100" : "opacity-80"}`}
                  onMouseEnter={() => setActiveTimeline(idx)}
                  onClick={() => setActiveTimeline(idx)}
                >
                  <div className={`w-3 h-3 rounded-full ${activeTimeline === idx ? "bg-yellow-300 scale-125" : "bg-yellow-200/60"}`} />
                  <div>
                    <div className="font-bold text-white text-xl">{item.title}</div>
                    <div className="text-yellow-100 font-semibold">{item.year}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Dynamic Display (right) */}
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimeline}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7 }}
                className="bg-white/20 rounded-xl shadow-lg p-6 flex flex-col items-center"
              >
                <Image
                  src={timelineItems[activeTimeline].img}
                  alt={timelineItems[activeTimeline].title}
                  width={320}
                  height={200}
                  className="rounded-lg mb-4 object-cover"
                />
                <audio controls src={timelineItems[activeTimeline].audio} className="w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- Section 2: Essential Sounds of Ayiti --- */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(135deg, #43C6AC 0%, #FFD700 40%, #DC143C 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-white font-bold mb-10" style={{ textShadow: "1px 2px 8px #0051BA" }}>
            Essential Sounds of Ayiti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {essentialTracks.map((track, idx) => (
              <motion.div
                key={track.title}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring" }}
                className="bg-white/20 rounded-xl shadow-lg p-6 flex flex-col items-center group cursor-pointer"
              >
                <Image src={track.img} alt={track.title} width={240} height={160} className="rounded-lg mb-4 object-cover group-hover:scale-105 transition" />
                <div className="text-white font-bold mb-2">{track.title}</div>
                <div className="text-yellow-200 text-sm mb-2">{track.artist} • {track.year}</div>
                {/* Placeholder for waveform animation */}
                <div className="w-full h-2 bg-yellow-200/30 rounded mb-2 group-hover:animate-pulse" />
                <audio controls src={track.audio} className="w-full mt-2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Gallery of Culture --- */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(120deg, #FCCF31 0%, #F55555 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-white font-bold mb-10" style={{ textShadow: "1px 2px 8px #DC143C" }}>
            Gallery of Culture
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.img}
                whileHover={{ scale: 1.08 }}
                className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => setLightboxIdx(idx)}
              >
                <Image src={img.img} alt={img.label} width={320} height={200} className="object-cover transition duration-300 group-hover:blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/60">
                  <span className="text-white font-bold text-lg text-center px-2">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Lightbox modal (simple) */}
          <AnimatePresence>
            {lightboxIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                onClick={() => setLightboxIdx(null)}
              >
                <Image
                  src={galleryImages[lightboxIdx].img}
                  alt={galleryImages[lightboxIdx].label}
                  width={800}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute bottom-10 left-0 right-0 text-center text-white text-xl font-bold">
                  {galleryImages[lightboxIdx].label}
                  <div className="text-yellow-200 text-sm mt-2">{galleryImages[lightboxIdx].fact}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Section 4: Did You Know? --- */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(135deg, #FF00CC 0%, #333399 100%)"
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-white font-bold mb-10" style={{ textShadow: "1px 2px 8px #FF00CC" }}>
            Did You Know?
          </h2>
          <motion.div
            key={factIdx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7 }}
            className="bg-white/30 rounded-xl shadow-lg p-8 text-2xl font-semibold text-white"
          >
            <span className="mr-2">{["🥁", "🎶", "📜"][factIdx % 3]}</span>
            {facts[factIdx]}
          </motion.div>
        </div>
      </section>

      {/* --- Section 5: Cultural Map --- */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(120deg, #232526 0%, #414345 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-yellow-200 font-bold mb-10" style={{ textShadow: "1px 2px 8px #FFD700" }}>
            Cultural Map
          </h2>
          <div className="bg-white/10 rounded-xl shadow-lg p-10 flex flex-col items-center justify-center">
            <div className="text-white text-xl mb-4">[Interactive Map Placeholder]</div>
            <div className="flex gap-6">
              {mapHotspots.map((spot, idx) => (
                <button
                  key={spot.name}
                  className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 text-white font-bold px-4 py-2 rounded-full shadow hover:scale-105 transition"
                  onClick={() => setActiveHotspot(idx)}
                >
                  {spot.name}
                </button>
              ))}
            </div>
            <div className="text-yellow-200 mt-6">Click hotspots to learn about music & culture in each region!</div>
          </div>
          {/* Modal for hotspot */}
          <AnimatePresence>
            {activeHotspot !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                onClick={() => setActiveHotspot(null)}
              >
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto relative">
                  <h3 className="text-2xl font-bold mb-4 text-purple-700">{mapHotspots[activeHotspot].name}</h3>
                  <div className="flex gap-4 mb-4">
                    {mapHotspots[activeHotspot].images.map((img, i) => (
                      <Image key={i} src={img} alt="" width={120} height={80} className="rounded" />
                    ))}
                  </div>
                  <audio controls src={mapHotspots[activeHotspot].audio} className="w-full mb-4" />
                  <div className="text-gray-700">{mapHotspots[activeHotspot].blurb}</div>
                  <button
                    className="absolute top-2 right-2 text-pink-600 font-bold text-lg"
                    onClick={() => setActiveHotspot(null)}
                  >×</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Footer / CTA --- */}
      <footer
        className="py-16 flex flex-col items-center"
        style={{
          background:
            "linear-gradient(135deg, #FFD700 0%, #FF00CC 50%, #333399 100%)"
        }}
      >
        <h2 className="text-white text-3xl font-bold text-center font-serif" style={{ textShadow: "1px 2px 8px #FF00CC" }}>
          Join the Movement
        </h2>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="bg-gradient-to-r from-pink-400 via-yellow-300 to-orange-400 text-white font-bold px-6 py-3 rounded-full shadow hover:scale-105 transition"
            style={{ border: "2px solid #fff" }}
          >
            Watch Performances
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full">
            Connect with Artists
          </button>
        </div>
        <div className="mt-8 text-white/90 text-sm text-center">
          &copy; {new Date().getFullYear()} Discover Ayiti &mdash; Experience the Revolution of Rhythm
        </div>
      </footer>
    </div>
  );
}
