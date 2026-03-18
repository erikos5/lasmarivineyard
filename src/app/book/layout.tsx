import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Wine Experience | Lasmari Vineyard Corfu',
  description: 'Book your authentic Corfiot wine tasting, vineyard tour, or culinary experience at Lasmari Vineyard. Online booking with instant confirmation. From €25 per person.',
  keywords: 'book wine tasting Corfu, Corfu vineyard booking, wine tour reservation Greece, Lasmari Vineyard booking, wine experience Corfu online booking',
  openGraph: {
    title: 'Book Your Wine Experience | Lasmari Vineyard Corfu',
    description: 'Reserve your spot for an unforgettable wine experience in Corfu. Online booking with secure payment.',
    url: 'https://lasmari.wine/book',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Book Lasmari Vineyard Experience' }],
  },
  alternates: {
    canonical: 'https://lasmari.wine/book',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
