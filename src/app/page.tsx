'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ScrollSection from '@/components/ScrollSection';
import TimelineSection from '@/components/TimelineSection';
import CinematicTimeline from '@/components/CinematicTimeline';
import InteractiveScript from '@/components/InteractiveScript';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import CinematicHero from '@/components/CinematicHero';
import MagneticTitle from '@/components/MagneticTitle';
import ContactSection from '@/components/ContactSection';
import useIsMobile from '@/hooks/useIsMobile';

// Timeline data for the story
const timelineEvents = [
  {
    year: "Early Years",
    title: "Where Streams Once Flowed",
    description: "The terroir of Lasmari was shaped by ancient waterways that carved fertile valleys through Corfu's landscape. This unique geological formation created the perfect drainage and mineral composition that gives our wines their distinctive character. The location between Perivolaki Loutses and Ano Perivolaki benefits from both elevation and natural water sources.",
    image: "/images/timeline/timeline-1-hero.png",
    quote: "Here was a stream - this entire area used to be a stream in time."
  },
  {
    year: "Traditional Times",
    title: "Living Off the Land", 
    description: "Traditional Corfiot farming involved a holistic approach to agriculture. Families would live seasonally on their estates, maintaining livestock alongside vineyards. This integrated farming method enriched the soil naturally and created a sustainable ecosystem where every element supported the others, from sheep fertilizing the land to olive groves providing windbreaks for delicate vines.",
    image: "/images/timeline/timeline-2-hero.png",
    quote: "With this pan we made the traditional pastitsada of old times."
  },
  {
    year: "1963-1964",
    title: "The Perfect Vintage",
    description: "Certain years in winemaking become legendary when nature aligns perfectly. The 1963-1964 seasons brought ideal rainfall patterns, optimal soil conditions, and perfect timing for harvest. These factors combined to create what winemakers call a 'perfect vintage' - where every element from grape development to fermentation exceeded expectations, setting the standard for all future wines.",
    image: "/images/timeline/timeline-3-hero.png",
    quote: "After the rains came, we worked with our hands, and everything was perfect."
  },
  {
    year: "Today",
    title: "Modern Heritage Winemaking",
    description: "Contemporary winemaking at Lasmari combines time-honored techniques with modern understanding of viticulture. We maintain traditional hand-harvesting methods while applying scientific knowledge of fermentation, aging, and terroir expression. This approach preserves the authentic character of Corfiot wines while ensuring consistent quality and sustainable practices for future generations.",
    image: "/images/timeline/timeline-4-hero.png",
    quote: "We are not just making wine; we are preserving a living heritage for future generations."
  }
];

// Welcome script segments for interactive storytelling
const welcomeScript = [
  {
    english: "Welcome to our vineyard. Here, between Loutses and Old Peritheia, just two kilometers from the village, begins a story that has lasted for more than a century.",
    greek: "Καλωσορίσατε στον αμπελώνα μας. Εδώ, ανάμεσα στις Λούτσες και την Άνω Περίθεια, δύο μόλις χιλιόμετρα από το χωριό, ξεκινά μια ιστορία που μετρά πάνω από έναν αιώνα."
  },
  {
    english: "If you look around, you will see the very same slopes my grandfather saw when he planted the first vines. From that moment until today, this land has witnessed generations of people, seasons of hardship and abundance, wildfires, abandonment, and renewal.",
    greek: "Αν κοιτάξετε γύρω σας, θα δείτε τις ίδιες πλαγιές που αντίκριζε ο παππούς μου όταν φύτεψε τα πρώτα κλήματα. Από τότε μέχρι σήμερα, η γη αυτή έζησε γενιές ανθρώπων, αλλαγές, δυσκολίες, φωτιές και αναγεννήσεις."
  },
  {
    english: "This place is not just a field; it is memory itself. It is the stone paths once walked by shepherds, the echoes of sheep bells that filled the valleys, the fragrance of grapes in September drifting through the air.",
    greek: "Ο τόπος αυτός δεν είναι απλώς χωράφι· είναι μνήμη. Είναι οι πέτρες των μονοπατιών που πατούσαν οι παλιοί, είναι οι ήχοι από τα κοπάδια που κάποτε αντηχούσαν σε όλη την πλαγιά, είναι το άρωμα του σταφυλιού που κάθε Σεπτέμβρη γέμιζε τον αέρα."
  },
  {
    english: "Over a hundred years ago, our family's story began here, among these terraces and rocky hills.",
    greek: "Εδώ, πάνω από εκατό χρόνια πριν, άρχισε η ιστορία της οικογένειας και του αμπελιού μας."
  },
  {
    english: "As you walk between the rows of vines, you can almost imagine the past: men working the soil with hand tools, children playing among the trees, women carrying water from the springs in clay pitchers.",
    greek: "Καθώς περπατά κανείς ανάμεσα στις σειρές των κλημάτων, μπορεί σχεδόν να φανταστεί πώς ήταν τότε: οι άνθρωποι να σκάβουν με τα χέρια, τα παιδιά να παίζουν ανάμεσα στα δέντρα, οι γυναίκες να γεμίζουν τα κανάτια με νερό από τις πηγές."
  },
  {
    english: "Every step of this hillside tells a story. And today, we continue that thread, preserving the bond between land, wine, and family.",
    greek: "Κάθε σπιθαμή αυτής της πλαγιάς κουβαλάει μια αφήγηση. Κι εμείς σήμερα συνεχίζουμε αυτό το νήμα, κρατώντας ζωντανό τον σύνδεσμο ανάμεσα στη γη, το κρασί και την οικογένεια."
  }
];


export default function Home() {
  const router = useRouter();
  const { isMobile, isLoaded } = useIsMobile(768);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show loading state until we know if it's mobile
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-evergreen-600"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-50 transition-fade">
        <Navbar />
        
        {/* Conditional Rendering: Mobile vs Desktop */}
        {isMobile ? (
          <>
            {/* Mobile Hero - Same as Desktop but Mobile Optimized */}
            <CinematicHero />
            
            {/* Mobile Welcome Section - Same content as Desktop */}
            <ScrollSection
              id="introduction"
              backgroundImage="/images/backgrounds/bg-wine-heritage-header.png"
              overlayColor="rgba(46, 59, 41, 0.35)"
              cinematicZoom={false}
              parallaxIntensity={0}
              className="min-h-screen w-full"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-sm px-4 w-full">
                  {/* Mobile Split Layout: Stack vertically */}
                  <div className="space-y-8 mb-16 pt-8">
                    {/* Title - Mobile First */}
                    <div className="text-center">
                      <MagneticTitle 
                        text="Authentic Corfiot Wine Heritage"
                        className="font-playfair text-3xl font-bold text-cream-50 leading-tight"
                      />
                    </div>
                    
                    {/* Description - Below Title on Mobile */}
                    <div className="text-center">
                      <p className="text-base text-cream-100 font-inter leading-relaxed font-light">
                        <span className="font-bold">Nestled</span> in the heart of Corfu&apos;s countryside, Lasmari Vineyard represents five generations of winemaking tradition. Our family estate sits on ancient stream beds that have created uniquely fertile soil, perfect for cultivating exceptional Mediterranean varietals. Every bottle tells the story of this remarkable terroir and our commitment to preserving authentic Corfiot winemaking heritage.
                      </p>
                    </div>
                  </div>
                  
                  {/* Interactive Content - Same as Desktop */}
                  <div className="text-center space-y-8">
                    {/* Interactive Welcome Story */}
                    <div>
                      <InteractiveScript
                        title="Welcome to Lasmari"
                        description="Discover our story through the words of our family"
                        segments={welcomeScript}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Vertical Timeline for Mobile */}
                    <div className="flex flex-col items-center space-y-4">
                      {["1892", "1930s", "1975", "Today"].map((year, index) => (
                        <div key={year} className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-cream-50 rounded-full animate-timeline-pulse" 
                               style={{ animationDelay: `${index * 0.5}s` }} />
                          <span className="text-cream-200 font-inter text-sm">{year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollSection>

            {/* Mobile Timeline - Same content as Desktop CinematicTimeline */}
            <CinematicTimeline events={timelineEvents} className="bg-gradient-to-b from-cream-50 to-evergreen-50" />

            {/* Mobile Lasmari Experience - Same content as Desktop */}
            <ScrollSection
              id="experience"
              backgroundImage="/images/backgrounds/bg-experience.png"
              overlayColor="rgba(46, 59, 41, 0.45)"
              cinematicZoom={false}
              parallaxIntensity={0}
              className="min-h-screen flex items-center pt-20 md:pt-32"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-sm mx-auto text-center space-y-8">
                  <div className="space-y-6">
                    <MagneticTitle 
                      text="The Lasmari Experience"
                      className="font-playfair text-3xl font-bold text-cream-50 leading-tight"
                    />
                    <div className="max-w-sm mx-auto">
                      <p className="text-base text-cream-100 font-inter leading-relaxed font-light text-center">
                        Experience the authentic traditions of our family vineyard - from working the soil with our hands to tasting the wine that carries the essence of our land and the wisdom of generations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="max-w-sm mx-auto">
                    <div className="space-y-6">
                      {[
                        { title: "Work the Land", description: "Experience farming with your hands, as our family has done for generations" },
                        { title: "Traditional Cooking", description: "Learn to make authentic pastitsada with our original family pan" },
                        { title: "Taste Our Legacy", description: "Sample wines from the golden harvest years and taste the terroir" }
                      ].map((item, index) => (
                        <div 
                          key={item.title} 
                          className="bg-cream-50/10 backdrop-blur-sm rounded-2xl p-6 border border-cream-50/20 hover:bg-cream-50/20 hover:border-cream-50/40 transition-all duration-300 text-center w-full"
                        >
                          <h3 className="font-playfair text-xl font-bold text-cream-50 mb-3 text-center">{item.title}</h3>
                          <p className="text-cream-200 font-inter text-sm leading-relaxed text-center">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button 
                      onClick={() => {
                        window.scrollTo(0, 0);
                        router.push('/experiences');
                      }}
                      className="inline-block bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold px-8 py-4 text-base rounded-full transition-all duration-200 hover:scale-105 transform"
                    >
                      Discover All Experiences
                    </button>
                  </div>
                </div>
              </div>
            </ScrollSection>
          </>
        ) : (
          <>
            {/* Desktop Hero */}
            <CinematicHero />
            
            {/* Desktop Welcome Section */}
            <ScrollSection
              id="introduction"
              backgroundImage="/images/backgrounds/bg-wine-heritage-header.png"
              overlayColor="rgba(46, 59, 41, 0.35)"
              cinematicZoom={false}
          parallaxIntensity={0}
          className="min-h-screen w-full"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-7xl px-6 w-full">
              {/* Split Layout: Description Left, Title Right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32 pt-24">
                {/* Left side - Description */}
                <div className="text-left pt-12">
                  <p className="text-xl lg:text-2xl xl:text-3xl text-cream-100 font-inter leading-relaxed font-light">
                    <span className="font-bold">Nestled</span> in the heart of Corfu's countryside, Lasmari Vineyard represents five generations of winemaking tradition. Our family estate sits on ancient stream beds that have created uniquely fertile soil, perfect for cultivating exceptional Mediterranean varietals. Every bottle tells the story of this remarkable terroir and our commitment to preserving authentic Corfiot winemaking heritage.
                  </p>
                </div>
                
                {/* Right side - Title */}
                <div className="text-left pt-12">
                  <MagneticTitle 
                    text="Authentic Corfiot Wine Heritage"
                    className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream-50 leading-tight"
                  />
                </div>
              </div>
              
              {/* Centered Interactive Content */}
              <div className="text-center space-y-12 pt-20">
                {/* Interactive Welcome Story */}
                <div>
                  <InteractiveScript
                    title="Welcome to Lasmari"
                    description="Discover our story through the words of our family"
                    segments={welcomeScript}
                    className="w-full max-w-4xl mx-auto"
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
          </div>
        </ScrollSection>

        {/* Our Story - Cinematic Timeline */}
        <CinematicTimeline events={timelineEvents} className="bg-gradient-to-b from-cream-50 to-evergreen-50" />

        {/* The Lasmari Experience */}
        <ScrollSection
          id="experience"
          backgroundImage="/images/backgrounds/bg-experience.png"
          overlayColor="rgba(46, 59, 41, 0.45)"
          cinematicZoom={false}
          parallaxIntensity={0}
          className="min-h-screen flex items-center pt-20 md:pt-32"
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
                  onClick={() => {
                    window.scrollTo(0, 0);
                    router.push('/experiences');
                  }}
                  className="inline-block bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold px-12 py-5 text-lg rounded-full transition-all duration-200 hover:scale-105 transform"
                >
                  Discover All Experiences
                </button>
              </div>
            </div>
          </div>
        </ScrollSection>
          </>
        )}

        {/* Shared sections for both mobile and desktop */}
        {/* Contact Section */}
        <ContactSection />
        
        <Footer />
      </main>
  );
}
