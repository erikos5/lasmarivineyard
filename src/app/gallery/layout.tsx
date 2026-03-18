import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery | Lasmari Vineyard Corfu Greece',
  description: 'Browse stunning photos of Lasmari Vineyard in Corfu, Greece. View our vineyards, wine cellars, tasting experiences, estate grounds, and the beautiful northern Corfu landscape.',
  keywords: 'Lasmari Vineyard photos, Corfu vineyard gallery, wine tasting photos Corfu, vineyard photography Greece, Corfu winery images',
  openGraph: {
    title: 'Photo Gallery | Lasmari Vineyard Corfu',
    description: 'Explore stunning imagery from our family vineyard in northern Corfu.',
    url: 'https://lasmari.wine/gallery',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Lasmari Vineyard Gallery' }],
  },
  alternates: {
    canonical: 'https://lasmari.wine/gallery',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
