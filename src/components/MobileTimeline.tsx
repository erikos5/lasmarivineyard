'use client';

import { motion } from 'framer-motion';
import InteractiveScript from './InteractiveScript';

// Timeline events optimized for mobile
const timelineEvents = [
  {
    year: "1892",
    title: "Family Roots",
    description: "The Lasmari family begins their winemaking journey in the fertile hills of northern Corfu, where the Mediterranean climate and ancient soil create perfect conditions for viticulture.",
    image: "/images/timeline/timeline-1-hero.png",
    quote: "In these hills, our ancestors found their calling among the vines."
  },
  {
    year: "1920s",
    title: "Traditional Methods",
    description: "Three generations work the land using time-honored techniques passed down through families. Every grape is hand-picked, every barrel personally tended, creating wines that capture the essence of Corfu.",
    image: "/images/timeline/timeline-2-hero.png",
    quote: "With this pan, we made the traditional pastitsada in the old days."
  },
  {
    year: "1963-1964",
    title: "The Perfect Vintage",
    description: "Legendary seasons when nature aligned perfectly. Ideal rainfall, optimal soil conditions, and perfect harvest timing created what winemakers call a 'perfect vintage' - setting the standard for all future wines.",
    image: "/images/timeline/timeline-3-hero.png",
    quote: "After the rains came, we worked with our hands, and everything was perfect."
  },
  {
    year: "Today",
    title: "Modern Heritage",
    description: "Contemporary winemaking combines time-honored techniques with modern understanding. We maintain traditional hand-harvesting while applying scientific knowledge, preserving authentic Corfiot character.",
    image: "/images/timeline/timeline-4-hero.png",
    quote: "We honor the past while embracing the future of winemaking."
  }
];

// Interactive scripts for mobile
const familyLegacyScript = [
  { 
    english: "Welcome to our family's story",
    greek: "Καλώς ήρθατε στην ιστορία της οικογένειάς μας"
  },
  { 
    english: "Five generations of dedication",
    greek: "Πέντε γενιές αφοσίωσης"
  },
  { 
    english: "Rooted in Corfiot tradition",
    greek: "Ριζωμένοι στην παράδοση της Κέρκυρας"
  }
];

const MobileTimeline = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-evergreen-800 mb-4">
            Our Journey Through Time
          </h2>
          <p className="text-evergreen-600 font-inter text-base leading-relaxed max-w-md mx-auto">
            Every vintage tells a story of dedication, tradition, and the pursuit of excellence.
          </p>
        </motion.div>

        {/* Family Legacy Interactive Script */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <InteractiveScript
            title="Family Legacy"
            description="Our story through generations"
            segments={familyLegacyScript}
            className="bg-evergreen-50 border border-evergreen-200"
          />
        </motion.div>

        {/* Timeline Cards */}
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-200"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Year Badge */}
                <div className="inline-block bg-pink-400 text-evergreen-800 font-inter font-bold text-sm px-3 py-1 rounded-full mb-3">
                  {event.year}
                </div>

                {/* Title */}
                <h3 className="font-playfair text-xl font-bold text-evergreen-800 mb-3">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-evergreen-600 font-inter text-sm leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Quote */}
                <blockquote className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50 rounded-r-lg">
                  <p className="text-evergreen-700 font-inter text-sm italic">
                    &quot;{event.quote}&quot;
                  </p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline End */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-400 rounded-full mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0 0 rgba(244, 114, 182, 0.4)',
                  '0 0 20px 10px rgba(244, 114, 182, 0.1)',
                  '0 0 0 0 rgba(244, 114, 182, 0.4)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-8 h-8 bg-cream-50 rounded-full"
            />
          </div>
          <h3 className="font-playfair text-xl font-bold text-evergreen-800 mb-2">
            The Story Continues...
          </h3>
          <p className="text-evergreen-600 font-inter text-sm">
            Join us in writing the next chapter
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileTimeline;
