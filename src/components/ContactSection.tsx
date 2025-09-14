'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollSection from './ScrollSection';

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
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
            
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-500/20 border border-green-400/30 rounded-xl">
                <p className="text-green-300 text-center font-medium">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-500/20 border border-red-400/30 rounded-xl">
                <p className="text-red-300 text-center font-medium">
                  ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cream-200 text-sm font-medium mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 disabled:opacity-50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-cream-200 text-sm font-medium mb-2">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 disabled:opacity-50"
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 disabled:opacity-50"
                    placeholder="+30 123 456 7890"
                  />
                </div>
                <div>
                  <label className="block text-cream-200 text-sm font-medium mb-2">Preferred Experience</label>
                  <select 
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 disabled:opacity-50"
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
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-cream-50/10 border border-cream-50/30 rounded-xl px-4 py-3 text-cream-50 placeholder-cream-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none disabled:opacity-50"
                  placeholder="Tell us about your visit preferences, number of guests, preferred dates, or any special requirements..."
                />
              </div>
              
              <motion.button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold py-4 text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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
