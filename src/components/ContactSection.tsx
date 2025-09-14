'use client';

import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  return (
    <ScrollSection
      id="contact"
      backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80"
      overlayColor="rgba(46, 59, 41, 0.8)"
      className={`min-h-screen w-full ${className}`}
      parallaxIntensity={0}
    >
      <div className="w-full h-full flex items-center justify-center py-20">
        <div className="max-w-2xl px-6 w-full">
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
      </div>
    </ScrollSection>
  );
};

export default ContactSection;
