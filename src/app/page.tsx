'use client';

import { AnimatePresence } from 'framer-motion';
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
    year: "1892",
    title: "The Beginning - Where Streams Once Flowed",
    description: "Between Loutses and Perivolaki, where ancient streams carved the landscape, our great-great-grandfather found the perfect terroir. Here, two kilometers from Peritheia, he built our first oven and planted the foundation of our legacy.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80",
    audioId: "founding-story",
    quote: "The land spoke to us, and we listened with reverence and determination."
  },
  {
    year: "1930s",
    title: "The Katafi Years - Building Tradition", 
    description: "In the village called Katafi, from above the estates, we had our livestock and built our traditions. This was the era when the traditional pastitsada pan was crafted, when each meal became a celebration of our heritage.",
    image: "https://images.unsplash.com/photo-1503457574462-bd27054394c1?auto=format&fit=crop&w=1000&q=80",
    audioId: "expansion-era",
    quote: "With this pan we made the traditional pastitsada of old times."
  },
  {
    year: "1963-1964",
    title: "The Golden Years - Prosperity & Growth",
    description: "The soil, the climate, everything aligned perfectly. We worked the land with our hands, and the harvest was beyond our dreams. These were the years that defined our approach to winemaking.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80",
    audioId: "renaissance-period",
    quote: "Everything was perfect - the land, the weather, the harvest that exceeded all expectations."
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
// Sample subtitle data - to be replaced with actual voice recording subtitles
const welcomeSubtitlesEn = [
  { start: 0, end: 8, text: "We found two kilometers between Loutses, in the middle between Perivolaki and Loutses." },
  { start: 8, end: 16, text: "There are two kilometers from Peritheia, but two kilometers from here is also Anu Peritheia." },
  { start: 16, end: 24, text: "Here was a stream, the whole area was a stream, at the bottom there was a village called Katafi." },
  { start: 24, end: 32, text: "From above, we had estates. The first thing that happened there was that we built an oven." }
];

const welcomeSubtitlesGr = [
  { start: 0, end: 8, text: "Βρισκόμαστε δύο χιλιόμετρα μετά την Λούτσες, στη μέση μεταξύ Περιβόλιας Λούτσες και Άνω Περιβόλια." },
  { start: 8, end: 16, text: "Εδώ ήταν ένα ρέμα, όλοκληρη αυτή η περιοχή στο χρόνο ήταν ρέμα." },
  { start: 16, end: 24, text: "Κατάφι, ενιστάνε από πάνω, είχαμε πρόβατα." },
  { start: 24, end: 32, text: "Το σπίτι που ήταν σαν αποθήκη, σαν ψησολόγιο και βοηθητικό σπίτι μας μέναμε στην πόρους περιβόλια στα χωράφια να νοιμε." }
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
          className="min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-7xl mx-auto space-y-12">
              <MagneticTitle 
                text="Authentic Corfiot Wine Heritage"
                className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-cream-50 leading-tight mb-12"
              />
              <div className="max-w-4xl mx-auto">
                <p className="text-xl lg:text-2xl xl:text-3xl text-cream-100 font-inter leading-relaxed font-light">
                  In northern Corfu, between Loutses and Perivolaki, our family has tended this land for generations. Here, where ancient streams once flowed, we built our first oven and began our journey.
                </p>
              </div>
              
              {/* Immersive Audio Introduction */}
              <div className="max-w-4xl mx-auto">
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
              <div className="flex justify-center items-center space-x-8 pt-8">
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
                    From sunrise harvest walks to intimate cellar tastings, immerse yourself in the authentic rhythm of Mediterranean winemaking.
                  </p>
                </div>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                  {[
                    { title: "Walk the Vines", description: "Sunrise tours through our historic vineyards" },
                    { title: "Taste the Terroir", description: "Intimate tastings in our ancient cellars" },
                    { title: "Harvest with Us", description: "Join our family during harvest season" }
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
          className="py-20 bg-cream-50"
          storyReveal={true}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-5xl lg:text-6xl font-bold text-evergreen-800 mb-6">
                Moments that Define Us
              </h2>
              <p className="text-xl text-evergreen-600 font-inter max-w-3xl mx-auto leading-relaxed">
                Every photograph captures more than a moment—it preserves the emotions, traditions, and stories that make Lasmari more than just a vineyard.
              </p>
            </div>
            
            <MosaicGallery sections={gallerySections} />
          </div>
        </ScrollSection>

        <Booking />
        <Footer />
      </main>
    </AnimatePresence>
  );
}
