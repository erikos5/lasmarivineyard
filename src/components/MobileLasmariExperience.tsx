'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const experiences = [
  {
    title: "Walk the Vines",
    description: "Sunrise tours through our historic vineyards",
    icon: "🍇",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Taste the Terroir", 
    description: "Intimate tastings in our ancient cellars",
    icon: "🍷",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Harvest with Us",
    description: "Join our family during harvest season", 
    icon: "🌿",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80"
  }
];

const MobileLasmariExperience = () => {
  const router = useRouter();

  return (
    <section id="lasmari-experience" className="py-16 bg-gradient-to-b from-evergreen-50 to-cream-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-4xl font-bold text-evergreen-800 mb-4"
          >
            The Lasmari Experience
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-evergreen-600 font-inter text-base leading-relaxed max-w-sm mx-auto mb-8"
          >
            From sunrise harvest walks to intimate cellar tastings, immerse yourself in the authentic rhythm of Mediterranean winemaking.
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6 mb-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-200"
            >
              <div className="flex">
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4 flex items-center">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{experience.icon}</span>
                      <h3 className="font-playfair text-lg font-bold text-evergreen-800">
                        {experience.title}
                      </h3>
                    </div>
                    <p className="text-evergreen-600 font-inter text-sm leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/experiences')}
            className="bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold px-8 py-4 text-base rounded-full transition-all duration-300 shadow-lg"
          >
            Discover All Experiences
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileLasmariExperience;
