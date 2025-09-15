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
  title: "Lasmari Vineyard | Authentic Corfu Wine Experience & Vineyard Tours",
  description: "Experience 5 generations of authentic Corfiot winemaking at Lasmari Vineyard. Intimate wine tastings, vineyard tours, and harvest experiences in the heart of northern Corfu. Book your exclusive Mediterranean wine adventure today.",
  keywords: "Corfu vineyard, Greek wine tasting, Corfu wine tours, Mediterranean winery, authentic Greek wine, Corfiot wine experience, vineyard tours Greece, wine harvest Corfu, family vineyard, traditional winemaking, Greek wine heritage, Corfu tourism, wine cellar tours, boutique winery Greece",
  authors: [{ name: "Lasmari Vineyard" }],
  creator: "Lasmari Vineyard",
  publisher: "Lasmari Vineyard",
  robots: "index, follow",
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
        alt: "Lasmari Vineyard - Authentic Corfu Wine Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lasmari Vineyard | Authentic Corfu Wine Experience",
    description: "Experience 5 generations of authentic Corfiot winemaking. Intimate wine tastings & vineyard tours in northern Corfu.",
    images: ["/og-image.jpg"],
    creator: "@lasmarivineyard",
  },
  alternates: {
    canonical: "https://lasmari.wine",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Winery",
              "name": "Lasmari Vineyard",
              "description": "Experience 5 generations of authentic Corfiot winemaking at Lasmari Vineyard. Intimate wine tastings, vineyard tours, and harvest experiences in northern Corfu.",
              "url": "https://lasmari.wine",
              "logo": "https://lasmari.wine/logo.jpg",
              "image": "https://lasmari.wine/og-image.jpg",
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
              "offers": {
                "@type": "Offer",
                "name": "Wine Tasting Experience",
                "description": "Intimate wine tastings, vineyard tours, and harvest experiences",
                "price": "95",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "10:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/lasmarivineyard",
                "https://www.instagram.com/lasmarivineyard",
                "https://www.twitter.com/lasmarivineyard"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              }
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
