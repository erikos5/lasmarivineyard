'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ScrollSection from '@/components/ScrollSection';
import TimelineSection from '@/components/TimelineSection';
import CinematicTimeline from '@/components/CinematicTimeline';
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
    description: "The terroir of Lasmari was shaped by ancient waterways that carved fertile valleys through Corfu's landscape. This unique geological formation created the perfect drainage and mineral composition that gives our wines their distinctive character. The location between Perivolaki Loutses and Ano Perivolaki benefits from both elevation and natural water sources.",
    image: "/images/timeline/timeline-1-hero.png",
    audioId: "founding-story",
    quote: "Here was a stream - this entire area used to be a stream in time."
  },
  {
    year: "Traditional Times",
    title: "Living Off the Land", 
    description: "Traditional Corfiot farming involved a holistic approach to agriculture. Families would live seasonally on their estates, maintaining livestock alongside vineyards. This integrated farming method enriched the soil naturally and created a sustainable ecosystem where every element supported the others, from sheep fertilizing the land to olive groves providing windbreaks for delicate vines.",
    image: "/images/timeline/timeline-2-hero.png",
    audioId: "expansion-era",
    quote: "With this pan we made the traditional pastitsada of old times."
  },
  {
    year: "1963-1964",
    title: "The Perfect Vintage",
    description: "Certain years in winemaking become legendary when nature aligns perfectly. The 1963-1964 seasons brought ideal rainfall patterns, optimal soil conditions, and perfect timing for harvest. These factors combined to create what winemakers call a 'perfect vintage' - where every element from grape development to fermentation exceeded expectations, setting the standard for all future wines.",
    image: "/images/timeline/timeline-3-hero.png",
    audioId: "renaissance-period",
    quote: "After the rains came, we worked with our hands, and everything was perfect."
  },
  {
    year: "Today",
    title: "Modern Heritage Winemaking",
    description: "Contemporary winemaking at Lasmari combines time-honored techniques with modern understanding of viticulture. We maintain traditional hand-harvesting methods while applying scientific knowledge of fermentation, aging, and terroir expression. This approach preserves the authentic character of Corfiot wines while ensuring consistent quality and sustainable practices for future generations.",
    image: "/images/timeline/timeline-4-hero.png",
    audioId: "present-day",
    quote: "We are not just making wine; we are preserving a living heritage for future generations."
  }
];

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
          backgroundImage="/images/backgrounds/bg-wine-heritage-header.png"
          overlayColor="rgba(46, 59, 41, 0.35)"
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
                  Nestled in the heart of Corfu's countryside, Lasmari Vineyard represents five generations of winemaking tradition. Our family estate sits on ancient stream beds that have created uniquely fertile soil, perfect for cultivating exceptional Mediterranean varietals. Every bottle tells the story of this remarkable terroir and our commitment to preserving authentic Corfiot winemaking heritage.
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
          backgroundImage="/images/backgrounds/bg-experience.png"
          overlayColor="rgba(46, 59, 41, 0.45)"
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

        {/* Gallery section removed from homepage. Access via Navbar → /gallery */}

        {/* Visit Us Section */}
        <ScrollSection
          id="visit"
          backgroundImage="/images/backgrounds/bg-experience.png"
          overlayColor="rgba(46, 59, 41, 0.5)"
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

              {/* Booking & Contact Section */}
              <motion.div 
                className="mt-16 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                  {/* Left Side - Booking Preview (Blurred) */}
                  <div className="relative bg-cream-50/10 backdrop-blur-sm p-8 rounded-3xl border border-cream-50/20">
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 bg-cream-50/5 backdrop-blur-md rounded-3xl flex items-center justify-center z-10">
                      <div className="text-center">
                        <h4 className="font-playfair text-3xl text-cream-50 mb-4">Booking Available Soon</h4>
                        <p className="text-cream-200 text-lg">Online booking system coming soon</p>
                      </div>
                    </div>
                    
                    {/* Blurred Booking Form Preview */}
                    <div className="opacity-50 blur-sm">
                      <h3 className="font-playfair text-3xl text-cream-50 mb-8 text-center">Book Your Visit</h3>
                      
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cream-200 text-sm font-medium mb-2">Preferred Date</label>
                            <input 
                              type="date" 
                              className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-cream-200 text-sm font-medium mb-2">Number of Guests</label>
                            <select 
                              className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50"
                              disabled
                            >
                              <option>1-2 people</option>
                              <option>3-5 people</option>
                              <option>6-10 people</option>
                              <option>10+ people</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-cream-200 text-sm font-medium mb-2">Experience Type</label>
                          <select 
                            className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50"
                            disabled
                          >
                            <option>Wine Tasting</option>
                            <option>Vineyard Tour</option>
                            <option>Harvest Experience</option>
                            <option>Private Event</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-cream-200 text-sm font-medium mb-2">Special Requests</label>
                          <textarea 
                            rows={3}
                            className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 resize-none"
                            placeholder="Tell us about any special requirements..."
                            disabled
                          />
                        </div>
                        
                        <button 
                          type="submit"
                          className="w-full bg-pink-400 text-evergreen-800 font-inter font-semibold py-4 text-lg rounded-xl"
                          disabled
                        >
                          Book Experience
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Right Side - Working Contact Form */}
                  <div className="bg-cream-50/10 backdrop-blur-sm p-8 rounded-3xl border border-cream-50/20">
                    <h3 className="font-playfair text-3xl text-cream-50 mb-8 text-center">Contact Us</h3>
                    <p className="text-cream-200 text-center mb-8">
                      Send us your inquiry and we'll get back to you within 24 hours
                    </p>
                    
                    <form 
                      action="mailto:info@lasmari.gr"
                      method="post"
                      encType="text/plain"
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-cream-200 text-sm font-medium mb-2">Full Name *</label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-cream-200 text-sm font-medium mb-2">Email *</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-cream-200 text-sm font-medium mb-2">Phone (Optional)</label>
                          <input 
                            type="tel" 
                            name="phone"
                            className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                            placeholder="+30 123 456 7890"
                          />
                        </div>
                        <div>
                          <label className="block text-cream-200 text-sm font-medium mb-2">Preferred Experience</label>
                          <select 
                            name="experience"
                            className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                          >
                            <option value="">Select experience</option>
                            <option value="Wine Tasting">Wine Tasting</option>
                            <option value="Vineyard Tour">Vineyard Tour</option>
                            <option value="Harvest Experience">Harvest Experience</option>
                            <option value="Private Event">Private Event</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-cream-200 text-sm font-medium mb-2">Message *</label>
                        <textarea 
                          name="message"
                          rows={5}
                          required
                          className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none"
                          placeholder="Tell us about your visit preferences, number of guests, preferred dates, or any special requirements..."
                        />
                      </div>
                      
                      <motion.button 
                        type="submit"
                        className="w-full bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold py-4 text-lg rounded-xl transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </form>
                    
                    {/* Quick Contact Options */}
                    <div className="mt-8 pt-8 border-t border-cream-50/20">
                      <p className="text-cream-200 text-center mb-4 text-sm">Or contact us directly:</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.a
                          href="tel:+302661012345"
                          className="bg-cream-50/20 hover:bg-cream-50/30 text-cream-50 font-inter font-medium px-6 py-2 rounded-full transition-all duration-300 text-sm text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          📞 Call Us
                        </motion.a>
                        <motion.a
                          href="mailto:info@lasmari.gr"
                          className="bg-cream-50/20 hover:bg-cream-50/30 text-cream-50 font-inter font-medium px-6 py-2 rounded-full transition-all duration-300 text-sm text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          ✉️ Email
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
        
        <Footer />
      </main>
    </AnimatePresence>
  );
}
