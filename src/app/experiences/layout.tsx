import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wine Experiences & Tours | Lasmari Vineyard Corfu Greece',
  description: 'Explore our curated wine experiences at Lasmari Vineyard in Corfu. Historic cellar tours, wine tastings with 5 signature wines, Corfiot culinary pairings, and estate heritage walks. From €25/person.',
  keywords: 'Corfu wine tasting experience, vineyard tour Corfu Greece, wine cellar tour, Corfiot culinary experience, estate tour Greece, Mediterranean wine tasting, Lasmari wine experience, Greek wine tours',
  openGraph: {
    title: 'Wine Experiences & Tours | Lasmari Vineyard Corfu',
    description: 'Explore curated wine experiences: cellar tours, tastings, culinary pairings, and estate walks at a 5-generation family vineyard in Corfu.',
    url: 'https://lasmari.wine/experiences',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Lasmari Vineyard Wine Experiences' }],
  },
  alternates: {
    canonical: 'https://lasmari.wine/experiences',
  },
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
