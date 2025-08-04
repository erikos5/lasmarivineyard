'use client';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Gallery from '@/components/Gallery';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <main className="min-h-screen bg-cream-50">
        <Navbar />
        
        <Hero />
        
        {/* Our Story Section */}
        <Section
          id="story"
          title="LASMARI VINEYARD"
          subtitle="Heritage & Tradition"
          description="Surrounded by vineyards, in the heart of our estate in Corfu, lies our ancient hamlet, currently a luxury resort and part of the Relais & Châteaux collection since 1992. Lasmari Vineyard is a family-owned estate rooted in the sun-drenched hills of Corfu. For generations, we have been crafting exceptional wines that capture the essence of our Mediterranean terroir."
          imageUrl="https://images.unsplash.com/photo-1503457574462-bd27054394c1?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Historic vineyard estate"
          className="bg-cream-50"
          buttonText="DISCOVER MORE"
          onButtonClick={() => router.push('/our-story')}
        />
        
        {/* Experiences Section */}
        <Section
          id="experiences"
          title="WINE EXPERIENCES"
          subtitle="Taste & Discover"
          description="Immerse yourself in the world of Corfiot winemaking through our carefully curated experiences. From intimate wine tastings to hands-on harvest participation, each experience is designed to connect you with our vineyard's rich heritage. Join us for guided tours through our historic cellars and discover traditional winemaking techniques."
          imageUrl="https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Wine tasting experience"
          reverse={true}
          className="bg-cream-100"
          buttonText="DISCOVER MORE"
          onButtonClick={() => router.push('/experiences')}
        />
        
        <Gallery />
        
        <Booking />
        
        <Footer />
      </main>
    </AnimatePresence>
  );
}
