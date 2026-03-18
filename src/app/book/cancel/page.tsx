'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookingCancel() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-cream-50">
      <Navbar />

      <div className="pt-32 pb-20 px-4 md:px-8 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <X size={40} className="text-cream-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-playfair text-4xl md:text-5xl font-bold text-evergreen-800 mb-4"
        >
          Booking Cancelled
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-cream-600 font-inter mb-12"
        >
          No worries! Your payment was not processed. You can try again anytime or contact us directly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => router.push('/book')}
            className="px-8 py-3 bg-evergreen-800 text-cream-50 rounded-xl font-inter font-semibold hover:bg-evergreen-700 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Try Again
          </button>
          <a
            href="tel:+302661012345"
            className="px-8 py-3 bg-cream-100 text-evergreen-800 rounded-xl font-inter font-semibold hover:bg-cream-200 transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={18} /> Call Us
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
