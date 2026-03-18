import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ClientTransition from "@/components/ClientTransition";
import FloatingBackToTop from "@/components/FloatingBackToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lasmari.wine"),
  title: {
    default: "Lasmari Vineyard | Authentic Corfu Wine Experience & Vineyard Tours",
    template: "%s | Lasmari Vineyard",
  },
  description: "Experience 5 generations of authentic Corfiot winemaking at Lasmari Vineyard. Intimate wine tastings, vineyard tours, culinary pairings, and harvest experiences in northern Corfu. Book online from €25/person.",
  keywords: [
    "Corfu vineyard", "Greek wine tasting", "Corfu wine tours", "Mediterranean winery",
    "authentic Greek wine", "Corfiot wine experience", "vineyard tours Greece", "wine harvest Corfu",
    "family vineyard", "traditional winemaking", "Greek wine heritage", "Corfu tourism",
    "wine cellar tours", "boutique winery Greece", "Corfu things to do", "wine tasting near me Corfu",
    "Greek island winery", "Ionian Islands wine", "wine tour booking Corfu", "Corfu activities",
    "wine and food pairing Greece", "estate tour Corfu", "Corfu wine excursion",
    "best winery Corfu", "northern Corfu attractions", "Loutses Corfu", "Peritheia Corfu",
    "organic wine Greece", "sustainable winery Mediterranean", "wine experience booking online"
  ],
  authors: [{ name: "Lasmari Vineyard", url: "https://lasmari.wine" }],
  creator: "Lasmari Vineyard",
  publisher: "Lasmari Vineyard",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lasmari.wine",
    siteName: "Lasmari Vineyard",
    title: "Lasmari Vineyard | Authentic Corfu Wine Experience & Vineyard Tours",
    description: "Experience 5 generations of authentic Corfiot winemaking at Lasmari Vineyard. Intimate wine tastings, vineyard tours, and harvest experiences in northern Corfu.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lasmari Vineyard - Authentic Corfu Wine Experience in Corfu, Greece",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lasmari Vineyard | Authentic Corfu Wine Experience",
    description: "Experience 5 generations of authentic Corfiot winemaking. Intimate wine tastings & vineyard tours in northern Corfu. Book online.",
    images: ["/og-image.jpg"],
    creator: "@lasmarivineyard",
    site: "@lasmarivineyard",
  },
  alternates: {
    canonical: "https://lasmari.wine",
    languages: {
      "en": "https://lasmari.wine",
      "el": "https://lasmari.wine/el",
    },
  },
  category: "Wine & Tourism",
  other: {
    "geo.region": "GR-49",
    "geo.placename": "Corfu, Greece",
    "geo.position": "39.7368;19.9228",
    "ICBM": "39.7368, 19.9228",
    "business:contact_data:street_address": "Apraos Village, Northern Corfu",
    "business:contact_data:locality": "Corfu",
    "business:contact_data:region": "Ionian Islands",
    "business:contact_data:postal_code": "49100",
    "business:contact_data:country_name": "Greece",
    "apple-mobile-web-app-title": "Lasmari Vineyard",
    "msapplication-TileColor": "#482420",
    "theme-color": "#482420",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Organization / Winery Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Winery",
              "@id": "https://lasmari.wine/#winery",
              "name": "Lasmari Vineyard",
              "alternateName": "Lasmari Family Vineyard",
              "description": "Experience 5 generations of authentic Corfiot winemaking at Lasmari Vineyard. Intimate wine tastings, vineyard tours, culinary pairings, and harvest experiences in northern Corfu.",
              "url": "https://lasmari.wine",
              "logo": {
                "@type": "ImageObject",
                "url": "https://lasmari.wine/images/logo/logo-transparent.png",
                "width": 512,
                "height": 512
              },
              "image": [
                "https://lasmari.wine/og-image.jpg",
                "https://lasmari.wine/images/experiences/dining-circle-above.jpeg",
                "https://lasmari.wine/images/experiences/dining-wide-hills.jpeg"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Apraos Village",
                "addressLocality": "Corfu",
                "addressRegion": "Ionian Islands",
                "postalCode": "49100",
                "addressCountry": "GR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 39.7368,
                "longitude": 19.9228
              },
              "telephone": "+30-26610-12345",
              "email": "info@lasmari.gr",
              "foundingDate": "1892",
              "founder": {
                "@type": "Person",
                "name": "Lasmari Family"
              },
              "priceRange": "€€",
              "currenciesAccepted": "EUR",
              "paymentAccepted": "Credit Card, Debit Card",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "10:00",
                  "closes": "18:00"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Wine Experiences",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "name": "Historic Winemaking Discovery",
                    "description": "45-minute tour through original stone cellars and traditional fermentation vessels",
                    "price": "35",
                    "priceCurrency": "EUR",
                    "availability": "https://schema.org/InStock",
                    "url": "https://lasmari.wine/book"
                  },
                  {
                    "@type": "Offer",
                    "name": "Wine Tasting & Terroir Experience",
                    "description": "60-minute tasting of 5 signature wines with terroir education",
                    "price": "45",
                    "priceCurrency": "EUR",
                    "availability": "https://schema.org/InStock",
                    "url": "https://lasmari.wine/book"
                  },
                  {
                    "@type": "Offer",
                    "name": "Authentic Corfiot Culinary Journey",
                    "description": "45-minute wine and food pairing with traditional Corfiot appetizers",
                    "price": "40",
                    "priceCurrency": "EUR",
                    "availability": "https://schema.org/InStock",
                    "url": "https://lasmari.wine/book"
                  },
                  {
                    "@type": "Offer",
                    "name": "Estate Grounds & Heritage Tour",
                    "description": "30-minute guided walk through vineyards with terroir explanation",
                    "price": "25",
                    "priceCurrency": "EUR",
                    "availability": "https://schema.org/InStock",
                    "url": "https://lasmari.wine/book"
                  },
                  {
                    "@type": "Offer",
                    "name": "The Complete Lasmari Experience",
                    "description": "3-hour signature journey: cellar tour, wine tasting, culinary pairing, estate walk, and complimentary bottle",
                    "price": "95",
                    "priceCurrency": "EUR",
                    "availability": "https://schema.org/InStock",
                    "url": "https://lasmari.wine/book"
                  }
                ]
              },
              "sameAs": [
                "https://www.facebook.com/lasmarivineyard",
                "https://www.instagram.com/lasmarivineyard",
                "https://www.twitter.com/lasmarivineyard"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "worstRating": "1",
                "reviewCount": "127",
                "ratingCount": "127"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Wine Enthusiast"
                  },
                  "reviewBody": "An absolutely authentic wine experience. The family stories and traditional methods make this so much more than a typical wine tasting."
                }
              ]
            })
          }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://lasmari.wine/#website",
              "url": "https://lasmari.wine",
              "name": "Lasmari Vineyard",
              "description": "Authentic Corfu Wine Experience & Vineyard Tours",
              "publisher": { "@id": "https://lasmari.wine/#winery" },
              "inLanguage": "en"
            })
          }}
        />
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lasmari.wine" },
                { "@type": "ListItem", "position": 2, "name": "Experiences", "item": "https://lasmari.wine/experiences" },
                { "@type": "ListItem", "position": 3, "name": "Book", "item": "https://lasmari.wine/book" },
                { "@type": "ListItem", "position": 4, "name": "Gallery", "item": "https://lasmari.wine/gallery" }
              ]
            })
          }}
        />
        {/* TouristAttraction Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              "name": "Lasmari Vineyard Wine Tours",
              "description": "Family-run vineyard offering authentic Corfiot wine experiences since 1892. One of northern Corfu's top attractions.",
              "url": "https://lasmari.wine",
              "touristType": ["Wine Lovers", "Food Tourists", "Cultural Tourists", "Couples", "Groups"],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 39.7368,
                "longitude": 19.9228
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Corfu",
                "addressRegion": "Ionian Islands",
                "addressCountry": "GR"
              },
              "isAccessibleForFree": false
            })
          }}
        />
        {/* FAQPage Schema for AI search visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What wine experiences does Lasmari Vineyard offer in Corfu?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lasmari Vineyard offers five experiences: Historic Winemaking Discovery (45 min, €35), Wine Tasting & Terroir Experience (60 min, €45), Authentic Corfiot Culinary Journey (45 min, €40), Estate Grounds & Heritage Tour (30 min, €25), and The Complete Lasmari Experience (3 hours, €95) which includes all four segments plus a complimentary bottle."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I book a wine tasting at Lasmari Vineyard?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can book online at lasmari.wine/book with instant confirmation and secure Stripe payment. Choose your experience, select a date and time, enter your details, and pay online. You can also contact us at info@lasmari.gr or call +30 26610 12345."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where is Lasmari Vineyard located in Corfu?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lasmari Vineyard is located in Apraos Village in northern Corfu, Greece, between the villages of Loutses and Old Peritheia, approximately 2 kilometers from the main village. The vineyard is part of the Ionian Islands region."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are Lasmari Vineyard's opening hours?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lasmari Vineyard is open Sunday through Friday from 10:00 AM to 6:00 PM (with a break from 1:00 PM to 2:00 PM). The vineyard is closed on Saturdays. We recommend booking in advance as experiences are limited to small groups of 2-8 guests."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does a wine tasting cost at Lasmari Vineyard?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wine experiences at Lasmari Vineyard range from €25 per person for an Estate Tour to €95 per person for the complete 3-hour experience. Individual tastings, culinary pairings, and cellar tours are available from €35-€45 per person."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-inter antialiased bg-cream-50 text-olive-900`}
      >
        <LenisProvider>
          <ClientTransition>
            {children}
          </ClientTransition>
          <FloatingBackToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
