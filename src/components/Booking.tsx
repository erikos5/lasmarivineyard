'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const Booking = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+30 26610 12345',
      href: 'tel:+302661012345'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@lasmari.gr',
      href: 'mailto:info@lasmari.gr'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Corfu, Greece',
      href: '#'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: '10:00 - 18:00',
      href: '#'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <SectionWrapper
      id="contact"
      className="py-20 lg:py-32 bg-olive-900 relative overflow-hidden"
      stagger={true}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <motion.span
                className="inline-block text-cream-300 font-inter font-medium text-sm uppercase tracking-wider"
                variants={itemVariants}
              >
                Visit Us
              </motion.span>
              
              <motion.h2
                className="heading-secondary text-cream-50"
                variants={itemVariants}
              >
                Plan Your Visit to Lasmari
              </motion.h2>
              
              <motion.p
                className="text-large text-cream-200"
                variants={itemVariants}
              >
                Experience the authentic flavors of Corfu at our vineyard. 
                Contact us to arrange your wine tasting, tour, or special event.
              </motion.p>
            </div>

            {/* Coming Soon Badge */}
            <motion.div
              className="inline-flex items-center space-x-3 bg-burgundy-700 px-6 py-3 rounded-full"
              variants={itemVariants}
            >
              <motion.div
                className="w-3 h-3 bg-burgundy-300 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-cream-50 font-inter font-medium">
                Online Booking Coming Soon
              </span>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-4 p-4 bg-olive-800/50 rounded-xl hover:bg-olive-800/70 transition-colors duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center">
                    <item.icon size={20} className="text-olive-900" />
                  </div>
                  <div>
                    <p className="text-cream-300 text-sm font-inter">{item.label}</p>
                    <p className="text-cream-50 font-inter font-medium">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-cream-50 p-8 lg:p-12 rounded-2xl shadow-2xl"
            variants={itemVariants}
          >
            <motion.h3
              className="heading-tertiary text-olive-900 mb-6"
              variants={itemVariants}
            >
              Get in Touch
            </motion.h3>
            
            <motion.form
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label className="block text-olive-700 font-inter font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-olive-700 font-inter font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-olive-700 font-inter font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your visit preferences..."
                />
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full btn-primary"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Booking; 