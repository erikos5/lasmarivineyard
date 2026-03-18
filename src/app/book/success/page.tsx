'use client';

import { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Wine, Calendar, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Auto-confirm booking via API when landing on success page
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      fetch('/api/booking/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {
        // Silently fail - webhook will handle it if configured
      });
    }
  }, [searchParams]);

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <Check size={40} className="text-green-600" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-playfair text-4xl md:text-5xl font-bold text-evergreen-800 mb-4"
      >
        Booking Confirmed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-cream-600 font-inter mb-12"
      >
        Thank you for booking your Lasmari Vineyard experience.
        We can&apos;t wait to welcome you!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-sm space-y-6 text-left mb-12"
      >
        <h3 className="font-playfair text-xl font-bold text-evergreen-800 text-center">What Happens Next</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-pink-400" />
            </div>
            <div>
              <h4 className="font-inter font-semibold text-evergreen-800">Confirmation Email</h4>
              <p className="text-sm text-cream-600 font-inter">
                You&apos;ll receive a detailed confirmation email with all your booking details shortly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-pink-400" />
            </div>
            <div>
              <h4 className="font-inter font-semibold text-evergreen-800">Day of Your Visit</h4>
              <p className="text-sm text-cream-600 font-inter">
                Please arrive 10 minutes before your scheduled time. We&apos;ll have everything prepared for you.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Wine size={18} className="text-pink-400" />
            </div>
            <div>
              <h4 className="font-inter font-semibold text-evergreen-800">Enjoy the Experience</h4>
              <p className="text-sm text-cream-600 font-inter">
                Relax and immerse yourself in our family&apos;s winemaking heritage. We handle the rest.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-evergreen-800 text-cream-50 rounded-xl font-inter font-semibold hover:bg-evergreen-700 transition-colors"
        >
          Back to Home
        </button>
        <button
          onClick={() => router.push('/experiences')}
          className="px-8 py-3 bg-cream-100 text-evergreen-800 rounded-xl font-inter font-semibold hover:bg-cream-200 transition-colors"
        >
          Explore More Experiences
        </button>
      </motion.div>
    </div>
  );
}

export default function BookingSuccess() {
  return (
    <main className="min-h-screen bg-cream-50">
      <Navbar />
      <Suspense fallback={
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-evergreen-600" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
