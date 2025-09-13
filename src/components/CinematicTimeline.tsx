'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import InteractiveScript from './InteractiveScript';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  quote?: string;
  image: string;
}

interface CinematicTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const CinematicTimeline = ({ events, className = '' }: CinematicTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Family Legacy script segments
  const familyLegacyScript = [
    {
      english: "This vineyard was planted by my grandfather a century ago. With his own hands he set the first vines in the soil, and ever since, each generation of the family has cared for them.",
      greek: "Το αμπέλι που βλέπετε το φύτεψε ο παππούς μου πριν από έναν αιώνα. Με τα ίδια του τα χέρια έβαλε τα πρώτα κλήματα στο χώμα, κι από τότε κάθε γενιά της οικογένειας φρόντισε να τα διατηρήσει ζωντανά."
    },
    {
      english: "Around the vineyard we kept herds of sheep; the slopes rang with the sound of their bells, and the land was always alive. The small house here served as both storage and a summer dwelling, sheltering families who spent whole seasons in the mountains, close to their fields.",
      greek: "Γύρω από το αμπέλι είχαμε κοπάδια με πρόβατα· η πλαγιά γέμιζε από τον ήχο των κουδουνιών τους, κι ο τόπος ήταν πάντα ζωντανός. Το μικρό σπίτι εδώ χρησίμευε σαν αποθήκη, αλλά και σαν καταφύγιο για τις οικογένειες που περνούσαν ολόκληρα καλοκαίρια στα βουνά, κοντά στα χωράφια τους."
    },
    {
      english: "This land provided everything. Wheat, lentils, chickpeas — the staples that kept a household self-sufficient. The hillsides were filled with fruit trees: cherry trees that thrived in this climate, and pear trees of many varieties.",
      greek: "Η γη αυτή μας έδινε τα πάντα. Καλλιεργούσαμε σιτάρι, φακές, ρεβίθια· βασικά αγαθά για να ζήσει μια οικογένεια χωρίς να χρειάζεται τίποτε απ' έξω. Οι πλαγιές ήταν γεμάτες καρποφόρα δέντρα: κερασιές που ευδοκιμούσαν στο κλίμα της περιοχής, και αχλαδιές από πολλές ποικιλίες."
    },
    {
      english: "Augustates, Winter pears, the short-stemmed Kontoules, and the long-stemmed Makryskourdes. Each tree had its own season, and each brought its unique flavor and memory to the family table.",
      greek: "Αυγουστάτες, Χειμωνιάτικες, Κοντούλες και Μακρυσκούρδες. Κάθε δέντρο είχε τη δική του εποχή, και το καθένα έδινε γεύση και μνήμη στο τραπέζι."
    },
    {
      english: "From Loutses all the way up here, every field was once cultivated: wheat fields, almond groves, vineyards. And at the heart of it all were our vines — the kakotrygi, a delicate white grape with a fine aroma, and the agiorgitiko, the bold red that produced full-bodied wine.",
      greek: "Από τις Λούτσες μέχρι εδώ ψηλά, όλα ήταν κάποτε καλλιεργημένα. Σιτάρια, αμυγδαλιές, αμπέλια. Και στο κέντρο αυτής της εικόνας, το δικό μας κλήμα – το κακοτρίγγι, το λευκό σταφύλι με το λεπτό άρωμα, και το αγιοργίτικο, το δυνατό κόκκινο που έδινε κρασί γεμάτο σώμα."
    },
    {
      english: "These two varieties carried our family tradition, and they still carry it forward today.",
      greek: "Αυτά τα δύο κρατούσαν ζωντανή την παράδοση της οικογένειας και συνεχίζουν να την κρατούν μέχρι σήμερα."
    }
  ];

  // Early Years script segments (for the first timeline event)
  const earlyYearsScript = [
    {
      english: "In the early 1900s, these hills were full of life. From here down to Loutses, every terrace was cultivated. Vineyards stretched across the slopes, wheat filled the fields, and almond and cherry trees stood between them.",
      greek: "Στις αρχές του 20ού αιώνα, οι πλαγιές αυτές έσφυζαν από ζωή. Από εδώ μέχρι κάτω στις Λούτσες, κάθε βήμα ήταν καλλιεργημένο. Τα αμπέλια απλώνονταν σε πεζούλες, τα σπαρτά κάλυπταν τα χωράφια, και ανάμεσά τους υψώνονταν αμυγδαλιές και κερασιές."
    },
    {
      english: "The pear trees were plentiful and diverse — some ripened in August, others in October, some with short stems, others with long clusters. Nature provided abundance, and every resource was valued.",
      greek: "Οι αχλαδιές ήταν πολλές και ξεχωριστές· άλλες έδιναν καρπό τον Αύγουστο, άλλες τον Οκτώβριο, άλλες είχαν κοντό κοτσάνι, άλλες μακρύ τσαμπί. Η φύση έδινε ποικιλία και η οικογένεια αξιοποιούσε κάθε τι που είχε αξία."
    },
    {
      english: "My grandfather planted the varieties we still grow today: kakotrygi, a white grape with delicate aroma and great character, though fragile against disease; and agiorgitiko, a strong red with rich clusters.",
      greek: "Ο παππούς μου φύτεψε τις βασικές ποικιλίες που ακόμη καλλιεργούμε: το κακοτρίγγι, λευκό σταφύλι με λεπτό άρωμα και μεγάλο χαρακτήρα αλλά ευαίσθητο στις αρρώστιες, και το αγιοργίτικο, κόκκινο δυνατό, με ρόγες γεμάτες."
    },
    {
      english: "These were the grapes that gave us wine for the family, but also for trade. Around them, life thrived: more than five hundred sheep grazed on these hillsides, their bells echoing through the valleys.",
      greek: "Αυτά ήταν τα σταφύλια που μας έδιναν κρασί για το σπίτι, αλλά και για το εμπόριο. Και γύρω τους, η ζωή έσφυζε από ήχους: πάνω από πεντακόσια πρόβατα βόσκανε στην πλαγιά, κι ο ήχος από τα κουδούνια τους ακουγόταν παντού."
    }
  ];

  // Traditional Life script segments (for the second timeline event)
  const traditionalLifeScript = [
    {
      english: "Life then was simple, self-sufficient, and bound to nature. Everything was handmade: copper was hammered into pots, trays, and pans; the village blacksmith joined them with rivets.",
      greek: "Η ζωή τότε ήταν απλή, αυτάρκης και συνδεδεμένη με τη φύση. Όλα γίνονταν με το χέρι: ο χαλκός γινόταν κατσαρόλες, ταψιά, τηγάνια· ο σιδεράς του χωριού τα έφτιαχνε και τα ένωναν με πιτσίνια."
    },
    {
      english: "Inside the house, the fire burned openly, without a chimney; the smoke drifted out through the roof tiles. In summer, families lived here for three months with the sheep, sleeping on mattresses filled with fresh straw, refilled each season.",
      greek: "Στο σπίτι η φωτιά έκαιγε μέσα, χωρίς καμινάδα· ο καπνός έβρισκε διέξοδο από τις σχισμές στα κεραμίδια. Το καλοκαίρι μέναμε εδώ μόνιμα, τρεις μήνες με τα πρόβατα, κοιμόμασταν σε στρώματα από φρέσκο άχυρο, που η μητέρα μου γέμιζε και ξαναγέμιζε κάθε χρόνο."
    },
    {
      english: "If rain dripped through the tiles, they simply moved the table and carried on. Food was cooked over the fire; pots hung from chains attached to the roof beams.",
      greek: "Αν η βροχή έσταζε από τα κεραμίδια, απλώς μετακινούσαμε το τραπέζι και συνεχίζαμε. Το φαγητό μαγειρευόταν πάνω στη φωτιά· οι κατσαρόλες κρέμονταν σε αλυσίδες από τα ξύλα της στέγης."
    },
    {
      english: "Birds caught in traps were an important summer food. Fox and marten furs were traded for value — nothing was wasted. Life was hard, but it was meaningful, lived in harmony with the rhythms of the land.",
      greek: "Τα πουλιά πιάνονταν σε παγίδες και ήταν σημαντική τροφή το καλοκαίρι. Οι γούνες από αλεπούδες και κουνάβια είχαν αξία, τίποτα δεν πετιόταν. Η ζωή ήταν σκληρή, αλλά γεμάτη νόημα και δεμένη με τους ρυθμούς της γης."
    }
  ];

  // Golden Harvest script segments (for the third timeline event)
  const goldenHarvestScript = [
    {
      english: "The years 1963 and 1964 are unforgettable. The harvests were rich: wheat in abundance, and wine from kakotrygi and agiorgitiko of such quality that it was not only kept for ourselves, but sold and exported to other regions.",
      greek: "Τα χρόνια 1963 και 1964 έμειναν αξέχαστα. Οι σοδειές ήταν πλούσιες: το σιτάρι άφθονο, το κρασί από το κακοτρίγγι και το αγιοργίτικο τόσο ποιοτικό που δεν το κρατούσαμε μόνο για μας· το πουλούσαμε και το εξάγαμε σε άλλες περιοχές."
    },
    {
      english: "These were the final years of the old way. Soon, however, wheat was abandoned — hand cultivation was too costly and laborious. Many fields were replanted with almonds, and families began leaving.",
      greek: "Αυτά ήταν τα τελευταία χρόνια της παλιάς εποχής. Σύντομα όμως το σιτάρι εγκαταλείφθηκε – η χειρωνακτική καλλιέργεια έγινε πολύ ακριβή και κουραστική. Πολλά χωράφια μετατράπηκαν σε αμυγδαλεώνες, και οι άνθρωποι άρχισαν να φεύγουν."
    },
    {
      english: "The DDT campaigns eliminated mosquitoes, so people no longer needed to escape to the mountains in summer. Slowly, the self-sufficient life came to an end.",
      greek: "Οι καμπάνιες με DDT εξάλειψαν τα κουνούπια, κι έτσι δεν υπήρχε πια ανάγκη να ανεβαίνουν οι οικογένειες το καλοκαίρι στα βουνά. Σιγά σιγά η ζωή της αυτάρκειας τελείωνε."
    },
    {
      english: "Yet those last harvests, those golden years, remain in memory as the most beautiful of all.",
      greek: "Μα οι τελευταίοι τρυγητοί, εκείνοι οι δύο χρυσοί χρόνοι, έμειναν στη μνήμη ως οι πιο όμορφοι."
    }
  ];

  // Today - Renewal script segments (for the fourth timeline event)
  const todayRenewalScript = [
    {
      english: "After 1960, great change came. Urban migration drew people into the towns; the fields were abandoned. Old Peritheia, once alive with schools, coffee houses, seven churches, and the town hall, emptied.",
      greek: "Μετά το 1960 άρχισε η μεγάλη αλλαγή. Η αστυφιλία τράβηξε τους ανθρώπους στις πόλεις· τα χωράφια εγκαταλείφθηκαν. Η Πάνω Περίθεια, που κάποτε έσφυζε από ζωή με σχολείο, καφενεία, επτά εκκλησίες και διοίκηση, άδειασε."
    },
    {
      english: "The mosquito had been eradicated with chemicals, and so there was no longer a reason for families to climb the mountains in summer to escape malaria. The old stone-paved paths with their carved steps grew over with vegetation.",
      greek: "Το κουνούπι είχε πια εξαλειφθεί με τα φάρμακα, κι έτσι δεν υπήρχε λόγος να ανεβαίνουν οι οικογένειες το καλοκαίρι για να σωθούν από την ελονοσία. Τα μονοπάτια, λιθόστρωτα με σκαλοπάτια, άρχισαν να κλείνουν από τη βλάστηση."
    },
    {
      english: "Fires destroyed much of the forest, and the vineyards of old disappeared. Only a few trees remained to remind us of the past. The self-sufficient life of earlier times was gone.",
      greek: "Οι φωτιές κατέστρεψαν μεγάλο μέρος του δάσους, τα παλιά αμπέλια χάθηκαν. Μονάχα λίγα δέντρα έμειναν να θυμίζουν το παρελθόν. Η αυτάρκης ζωή των παλιών χρόνων είχε πια τελειώσει."
    },
    {
      english: "Today, much has changed, yet the essence remains. Two years ago, fire destroyed 60% of our vineyard. But just as our grandparents rebuilt after every hardship, so too we replant, renew, and bring life back to the land.",
      greek: "Σήμερα, πολλά έχουν αλλάξει, αλλά η ουσία παραμένει. Πριν δύο χρόνια, μια φωτιά έκαψε το 60% του αμπελιού μας. Όμως, όπως οι παππούδες μας ξαναέχτιζαν μετά από κάθε δυσκολία, έτσι κι εμείς ξαναφυτεύουμε, ξαναδίνουμε ζωή."
    },
    {
      english: "Nature remains: foxes still den in the same rocks as seventy years ago, turtles wander through the grass, and birds return each season. We still grow kakotrygi and agiorgitiko, just as before.",
      greek: "Η φύση εξακολουθεί να είναι παρούσα: οι αλεπούδες έχουν φωλιές στα ίδια βράχια για πάνω από εβδομήντα χρόνια, οι χελώνες συνεχίζουν να περπατούν ανάμεσα στα χόρτα, τα πουλιά επιστρέφουν κάθε εποχή. Εμείς συνεχίζουμε να καλλιεργούμε το κακοτρίγγι και το αγιοργίτικο, όπως τότε."
    },
    {
      english: "Perhaps the tools and pots have changed, but the spirit of this place — the bond between land, wine, and family — endures. This is our vineyard. This is our story. And now, it becomes part of yours.",
      greek: "Ίσως να άλλαξαν τα εργαλεία και τα σκεύη, αλλά η ψυχή του τόπου – η σύνδεση ανάμεσα στη γη, το κρασί και την οικογένεια – παραμένει αναλλοίωτη. Αυτός είναι ο αμπελώνας μας. Αυτή είναι η ιστορία μας. Και τώρα, γίνεται μέρος και της δικής σας."
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothProgress = useSpring(progressHeight, { stiffness: 100, damping: 30 });

  // Simple intersection observer for active index
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('timeline-visible');
            const index = parseInt(element.getAttribute('data-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      { 
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
      }
    );

    events.forEach((_, index) => {
      const element = document.querySelector(`.timeline-event-${index}`);
      if (element) {
        element.setAttribute('data-index', index.toString());
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [events]);


  return (
    <div ref={containerRef} className={`relative min-h-screen ${className}`}>
      {/* Background with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-evergreen-50">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-evergreen-100 via-transparent to-pink-50" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="font-playfair text-5xl lg:text-7xl font-bold text-evergreen-800 mb-4 leading-tight">
            Our Journey Through Time
          </h2>
          <p className="text-xl lg:text-2xl text-evergreen-600 font-inter max-w-4xl mx-auto leading-relaxed">
            Every vintage tells a story. Every bottle carries the dreams, struggles, and triumphs of five generations dedicated to the art of winemaking.
          </p>
        </div>

        {/* Family Legacy Interactive Script */}
        <div className="text-center mb-20">
          <InteractiveScript
            title="Family Legacy"
            description="Discover the heritage that shaped our vineyard through five generations"
            segments={familyLegacyScript}
            className="w-full max-w-4xl mx-auto"
          />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-evergreen-200/30 z-0">
            <motion.div
              ref={progressRef}
              className="w-full bg-gradient-to-b from-pink-400 via-evergreen-600 to-evergreen-800 origin-top"
              style={{ height: smoothProgress }}
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-20">
            {events.map((event, index) => (
              <div
                key={event.year}
                className={`timeline-event timeline-event-${index} relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } group opacity-0 translate-y-10`}
                style={{ zIndex: 20 }}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-cream-50 z-30 transition-all duration-500 ${
                    activeIndex >= index 
                      ? 'bg-pink-400 scale-125 shadow-2xl shadow-pink-400/50' 
                      : 'bg-evergreen-600 scale-100'
                  } hover:scale-125`}
                />

                {/* Content Container */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                  {/* Year Badge */}
                  <div
                    className={`inline-block bg-evergreen-800 text-cream-50 px-8 py-3 rounded-full font-playfair font-bold text-2xl mb-6 shadow-lg ${
                      index % 2 === 0 ? 'float-right' : 'float-left'
                    } hover:scale-110 hover:bg-evergreen-700 hover:shadow-2xl transition-all duration-300`}
                  >
                    {event.year}
                  </div>

                  <div className="clear-both">
                    {/* Image */}
                    <div
                      className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl hover:scale-105 transition-all duration-500"
                    >
                      <div className="timeline-image relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={`${event.title} - ${event.year}`}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-evergreen-800/60 via-transparent to-transparent" />
                        
                        {/* Hover overlay */}
                        <motion.div
                          className="absolute inset-0 bg-evergreen-600/20 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-playfair text-4xl lg:text-5xl font-bold text-evergreen-800 mb-6 leading-tight hover:scale-105 transition-transform duration-200"
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xl text-evergreen-700 font-inter leading-relaxed mb-8">
                      {event.description}
                    </p>

                    {/* Quote */}
                    {event.quote && (
                      <motion.blockquote
                        className="border-l-4 border-pink-400 pl-8 py-6 bg-pink-50/80 rounded-r-2xl backdrop-blur-sm"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-evergreen-800 font-cormorant text-2xl italic leading-relaxed">
                          "{event.quote}"
                        </p>
                      </motion.blockquote>
                    )}
                  </div>
                </div>

                {/* Interactive Script or Decorative element */}
                <div className={`w-6/12 ${index % 2 === 0 ? 'pl-40' : 'pr-40'}`}>
                  {index === 0 ? (
                    /* Early Years Interactive Script */
                    <div className="w-full">
                      <InteractiveScript
                        title="Early Years (1900–1940)"
                        description="Life on the hillsides in the early 20th century"
                        segments={earlyYearsScript}
                        className="w-full bg-cream-50/90 backdrop-blur-sm border border-evergreen-200/30"
                      />
                    </div>
                  ) : index === 1 ? (
                    /* Traditional Life Interactive Script */
                    <div className="w-full">
                      <InteractiveScript
                        title="Traditional Life (1940–1960)"
                        description="Simple, self-sufficient life bound to nature"
                        segments={traditionalLifeScript}
                        className="w-full bg-cream-50/90 backdrop-blur-sm border border-evergreen-200/30"
                      />
                    </div>
                  ) : index === 2 ? (
                    /* Golden Harvest Interactive Script */
                    <div className="w-full">
                      <InteractiveScript
                        title="Golden Harvest (1963–1964)"
                        description="The unforgettable years and end of the old way"
                        segments={goldenHarvestScript}
                        className="w-full bg-cream-50/90 backdrop-blur-sm border border-evergreen-200/30"
                      />
                    </div>
                  ) : index === 3 ? (
                    /* Today - Renewal Interactive Script */
                    <div className="w-full">
                      <InteractiveScript
                        title="Today – Renewal"
                        description="From decline to rebirth, the enduring spirit of the vineyard"
                        segments={todayRenewalScript}
                        className="w-full bg-cream-50/90 backdrop-blur-sm border border-evergreen-200/30"
                      />
                    </div>
                  ) : (
                    /* Decorative element for any remaining timeline events */
                    <div className="w-full h-32 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-evergreen-200/30 to-pink-200/30 backdrop-blur-sm border border-evergreen-200/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-evergreen-400 to-pink-400"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline End */}
          <motion.div
            className="relative text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <div className="flex justify-center absolute top-0 left-0 right-0 z-10">
              <motion.div 
                className="w-12 h-12 bg-pink-400 rounded-full border-6 border-cream-50"
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
              />
            </div>
            <div className="pt-16">
              <h3 className="font-playfair text-4xl font-bold text-evergreen-800 mb-4">
                The Story Continues...
              </h3>
              <p className="text-xl text-evergreen-600 font-inter">
                Today and into the future, our legacy grows with every vintage
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CinematicTimeline;