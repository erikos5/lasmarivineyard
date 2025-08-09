import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import SwupProvider from "@/components/SwupProvider";

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
  title: "Lasmari Vineyard | Premium Corfu Wine Experience",
  description: "Discover the authentic flavors of Corfu at Lasmari Vineyard, where centuries-old family traditions meet exceptional winemaking in the heart of the Mediterranean.",
  keywords: "Corfu vineyard, Greek wine, wine tasting, Mediterranean wines, Lasmari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-inter antialiased bg-cream-50 text-olive-900`}
      >
        <LenisProvider>
          <SwupProvider>
            <div id="swup">
              {children}
            </div>
          </SwupProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
