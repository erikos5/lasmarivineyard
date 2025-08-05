'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ScrollSection from '@/components/ScrollSection';
import TimelineSection from '@/components/TimelineSection';
import CinematicTimeline from '@/components/CinematicTimeline';
import MosaicGallery from '@/components/MosaicGallery';
import AudioWithSubtitles from '@/components/AudioWithSubtitles';
import ImmersiveAudioPlayer from '@/components/ImmersiveAudioPlayer';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import CinematicHero from '@/components/CinematicHero';
import MagneticTitle from '@/components/MagneticTitle';

// Timeline data for the story
const timelineEvents = [
  {
    year: "Early Years",
    title: "Where Streams Once Flowed",
    description: "We found ourselves two kilometers past Loutses, in the middle between Perivolaki Loutses and Ano Perivolaki. This entire area was once a stream that carved through the landscape. At the bottom was a village called Katafi. From above, we had our estates.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80",
    audioId: "founding-story",
    quote: "Here was a stream - this entire area used to be a stream in time."
  },
  {
    year: "Traditional Times",
    title: "The Era of Traditional Pastitsada", 
    description: "With this traditional pan, we made the authentic pastitsada of old times. We stayed from early spring, had sheep, and worked the land. The house served as storage, as a place for baking, and as our helper house where we lived among the fields to tend the crops.",
    image: "https://images.unsplash.com/photo-1503457574462-bd27054394c1?auto=format&fit=crop&w=1000&q=80",
    audioId: "expansion-era",
    quote: "With this pan we made the traditional pastitsada of old times."
  },
  {
    year: "1963-1964",
    title: "The Golden Harvest Years",
    description: "Those years were magical - 1963 to 1964. After the rains came, we worked with our hands, and everything was perfect. The soil, the climate, all aligned. We had never seen such a harvest. The vines, the grapes, the wine - everything exceeded our wildest expectations.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80",
    audioId: "renaissance-period",
    quote: "After the rains came, we worked with our hands, and everything was perfect."
  },
  {
    year: "Today",
    title: "Authentic Corfiot Heritage",
    description: "Today, we continue our family legacy with the same passion and dedication, creating wines that tell the story of our land, our family, and our unwavering commitment to excellence.",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80",
    audioId: "present-day",
    quote: "We are not just making wine; we are preserving a living heritage for future generations."
  }
];

// Gallery sections organized by emotion
// Authentic subtitle data from family voice recordings
const welcomeSubtitlesEn = [
  { start: 0, end: 10, text: "We are located two kilometers past Loutses, halfway between Perivolaki Loutses and Ano Perivolaki." },
  { start: 10, end: 18, text: "Here was a stream - this entire area used to be a stream in time." },
  { start: 18, end: 26, text: "At the bottom was a village called Katafi. From above, we had our estates." },
  { start: 26, end: 34, text: "We stayed from early spring, had sheep, and worked the land with our hands." },
  { start: 34, end: 42, text: "The first thing we built here was an oven, and from there our story began." }
];

const welcomeSubtitlesGr = [
  { start: 0, end: 10, text: "Βρισκόμαστε δύο χιλιόμετρα μετά την Λούτσες, στη μέση μεταξύ Περιβόλιας Λούτσες και Άνω Περιβόλια." },
  { start: 10, end: 18, text: "Εδώ ήταν ένα ρέμα, όλοκληρη αυτή η περιοχή στο χρόνο ήταν ρέμα." },
  { start: 18, end: 26, text: "Κατάφι, ενιστάνε από πάνω, είχαμε πρόβατα." },
  { start: 26, end: 34, text: "Το σπίτι που ήταν σαν αποθήκη, σαν ψησολόγιο και βοηθητικό σπίτι." },
  { start: 34, end: 42, text: "Με αυτό το ταψί φτιάχναμε παλιά την παραδοσιακή παστιτσάδα." }
];

const gallerySections = [
  {
    title: "Harvest Mornings",
    emotion: "Golden Awakening",
    description: "The magic of dawn in our vineyards, where every sunrise brings the promise of another exceptional vintage.",
    images: [
      {
        id: "harvest-1",
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        alt: "Morning harvest in the vineyard",
        story: "Every morning at 5 AM, our family gathers in the vineyard as the mist rises from the Mediterranean...",
        audioId: "harvest-morning",
        aspectRatio: "landscape" as const,
        size: "large" as const
      },
      {
        id: "harvest-2",
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
        alt: "Hands picking grapes",
        aspectRatio: "portrait" as const,
        size: "medium" as const
      },
      {
        id: "harvest-3", 
        src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        alt: "Grape clusters",
        aspectRatio: "square" as const,
        size: "small" as const
      }
    ]
  },
  {
    title: "The Family Hands",
    emotion: "Living Heritage",
    description: "Five generations of knowledge passed down through loving hands that shape every bottle.",
    images: [
      {
        id: "family-1",
        src: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
        alt: "Family hands working with wine",
        story: "These hands have touched every vine, guided every harvest, and crafted every vintage for over 130 years...",
        audioId: "family-heritage", 
        aspectRatio: "wide" as const,
        size: "large" as const
      },
      {
        id: "family-2",
        src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
        alt: "Traditional wine making",
        aspectRatio: "landscape" as const,
        size: "medium" as const
      }
    ]
  }
];

export default function Home() {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <main className="min-h-screen bg-cream-50">
        <Navbar />
        
        {/* Cinematic Hero Section */}
        <CinematicHero />
        
        {/* Immersive Introduction */}
        <ScrollSection
          id="introduction"
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
          overlayColor="rgba(46, 59, 41, 0.6)"
          cinematicZoom={false}
          parallaxIntensity={0}
          className="min-h-screen w-full"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-8 max-w-4xl px-6">
              <MagneticTitle 
                text="Authentic Corfiot Wine Heritage"
                className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-cream-50 leading-tight mb-12"
              />
              <div>
                <p className="text-xl lg:text-2xl xl:text-3xl text-cream-100 font-inter leading-relaxed font-light">
                  We are located two kilometers past Loutses, halfway between Perivolaki Loutses and Ano Perivolaki. Here was a stream - this entire area used to be a stream in time. From above, we had estates, livestock, and sheep. The first thing we built here was an oven, and from there our story began.
                </p>
              </div>
              
              {/* Immersive Audio Introduction */}
              <div>
                <ImmersiveAudioPlayer
                  audioSrc="/audio/recordings/section1-welcome.mp3"
                  subtitlesEn={welcomeSubtitlesEn}
                  subtitlesGr={welcomeSubtitlesGr}
                  title="Welcome to Lasmari"
                  description="Listen to our story in the voice of our family"
                  className="w-full"
                />
              </div>
              
              {/* Horizontal Timeline with beautiful animations */}
              <div className="flex justify-center items-center space-x-8">
                {["1892", "1930s", "1975", "Today"].map((year, index) => (
                  <div key={year} className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-cream-50 rounded-full mb-2 animate-timeline-pulse" 
                         style={{ animationDelay: `${index * 0.5}s` }} />
                    <span className="text-cream-200 font-inter text-sm">{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Our Story - Cinematic Timeline */}
        <CinematicTimeline events={timelineEvents} className="bg-gradient-to-b from-cream-50 to-evergreen-50" />

        {/* The Lasmari Experience */}
        <ScrollSection
          id="experience"
          backgroundImage="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=2000&q=80"
          overlayColor="rgba(46, 59, 41, 0.7)"
          cinematicZoom={false}
          parallaxIntensity={0}
          className="min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto text-center space-y-16">
              <div className="space-y-8">
                <MagneticTitle 
                  text="The Lasmari Experience"
                  className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-cream-50 leading-tight"
                />
                              <div className="max-w-4xl mx-auto">
                <p className="text-xl lg:text-2xl xl:text-3xl text-cream-100 font-inter leading-relaxed font-light text-center">
                  Experience the authentic traditions of our family vineyard - from working the soil with our hands to tasting the wine that carries the essence of our land and the wisdom of generations.
                </p>
              </div>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                  {[
                    { title: "Work the Land", description: "Experience farming with your hands, as our family has done for generations" },
                    { title: "Traditional Cooking", description: "Learn to make authentic pastitsada with our original family pan" },
                    { title: "Taste Our Legacy", description: "Sample wines from the golden harvest years and taste the terroir" }
                  ].map((item, index) => (
                    <div 
                      key={item.title} 
                      className="bg-cream-50/10 backdrop-blur-sm rounded-2xl p-8 border border-cream-50/20 hover:bg-cream-50/20 hover:border-cream-50/40 transition-all duration-300 hover:scale-105 transform text-center w-full max-w-sm"
                    >
                      <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-cream-50 mb-4 text-center">{item.title}</h3>
                      <p className="text-cream-200 font-inter text-lg leading-relaxed text-center">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => router.push('/experiences')}
                  className="inline-block bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold px-12 py-5 text-lg rounded-full transition-all duration-200 hover:scale-105 transform"
                >
                  Discover All Experiences
                </button>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Emotion-Based Gallery */}
        <ScrollSection
          id="gallery"
          backgroundImage="https://images.unsplash.com/photo-1596400033635-bac1b5ba2480?auto=format&fit=crop&w=2000&q=80"
          overlayColor="rgba(253, 245, 230, 0.85)"
          className="min-h-screen w-full"
          storyReveal={true}
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-16 max-w-7xl px-6 py-20">
              <div className="space-y-6">
                <MagneticTitle 
                  text="Moments that Define Us"
                  className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-evergreen-800 leading-tight"
                />
                <p className="text-xl lg:text-2xl xl:text-3xl text-evergreen-700 font-inter max-w-4xl mx-auto leading-relaxed font-light">
                  Every photograph captures more than a moment—it preserves the emotions, traditions, and stories that make Lasmari more than just a vineyard.
                </p>
              </div>
              
              <MosaicGallery sections={gallerySections} className="max-w-7xl mx-auto" />
            </div>
          </div>
        </ScrollSection>

        {/* Visit Us Section */}
        <ScrollSection
          id="visit"
          backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80"
          overlayColor="rgba(46, 59, 41, 0.8)"
          className="min-h-screen w-full"
          parallaxIntensity={0}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-12 max-w-6xl px-6">
              <div className="space-y-6">
                <MagneticTitle 
                  text="Visit Lasmari"
                  className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-cream-50 leading-tight"
                />
                <p className="text-xl lg:text-2xl xl:text-3xl text-cream-100 font-inter leading-relaxed font-light">
                  Experience the authentic flavors of Corfu at our family vineyard. Contact us to arrange your wine tasting, tour, or special event.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <motion.a
                  href="tel:+302661012345"
                  className="bg-cream-50/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-cream-50/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-playfair text-2xl text-cream-50 mb-2">Phone</h3>
                  <p className="text-cream-200 group-hover:text-cream-100 transition-colors">+30 26610 12345</p>
                </motion.a>

                <motion.a
                  href="mailto:info@lasmari.gr"
                  className="bg-cream-50/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-cream-50/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-playfair text-2xl text-cream-50 mb-2">Email</h3>
                  <p className="text-cream-200 group-hover:text-cream-100 transition-colors">info@lasmari.gr</p>
                </motion.a>

                <motion.div
                  className="bg-cream-50/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-cream-50/20 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-playfair text-2xl text-cream-50 mb-2">Location</h3>
                  <p className="text-cream-200 group-hover:text-cream-100 transition-colors">Corfu, Greece</p>
                </motion.div>

                <motion.div
                  className="bg-cream-50/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-cream-50/20 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-playfair text-2xl text-cream-50 mb-2">Hours</h3>
                  <p className="text-cream-200 group-hover:text-cream-100 transition-colors">10:00 - 18:00</p>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div 
                className="mt-12"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <button className="bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold px-12 py-5 text-lg rounded-full transition-all duration-300">
                  Book Your Visit
                </button>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        <Footer />
      </main>
    </AnimatePresence>
  );
}
