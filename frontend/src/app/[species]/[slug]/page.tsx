import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySpeciesAndSlug, getRelatedProducts, CATALOG_PRODUCTS } from '@/lib/catalog';
import { AnnouncementBar, Header } from '@/components/layout';
import { MiniCartDrawer } from '@/components/cart';
import {
  Breadcrumbs,
  ProductBuyBox,
  FreshnessWindow,
  GuaranteedAnalysisCard,
  IngredientsSection,
  FeedingGuidanceCard,
  ReviewsSection,
  RelatedProducts,
} from '@/components/pdp';

interface PageProps {
  params: Promise<{
    species: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths: { species: string; slug: string }[] = [];

  for (const product of CATALOG_PRODUCTS) {
    paths.push({ species: product.species, slug: product.slug });
    if (product.species === 'budgerigar') {
      paths.push({ species: 'budgerigar', slug: 'daily-vitality' });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { species, slug } = await params;
  const product = getProductBySpeciesAndSlug(species, slug);

  if (!product) {
    return {
      title: 'Product Not Found | Tidbit Avian Nutrition',
    };
  }

  return {
    title: `${product.title} | Tidbit Avian Wellness`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.imageUrls[0],
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { species, slug } = await params;
  const product = getProductBySpeciesAndSlug(species, slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.species, product.id);

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.imageUrls,
    brand: {
      '@type': 'Brand',
      name: 'Tidbit',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: (product.variants[0].priceCents / 100).toFixed(2),
      highPrice: (product.variants[product.variants.length - 1].priceCents / 100).toFixed(2),
      offerCount: product.variants.length,
      offers: product.variants.map((v) => ({
        '@type': 'Offer',
        name: v.label,
        price: (v.priceCents / 100).toFixed(2),
        priceCurrency: 'USD',
        availability: v.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratingAvg,
      reviewCount: product.ratingCount,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary selection:bg-species-budgie-wash selection:text-species-budgie-base">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Announcement Bar & Header */}
      <AnnouncementBar />
      <Header />

      {/* Species Hero Header Bar / Wash matching species lane */}
      <div className="bg-species-budgie-wash/60 border-b border-border py-2">
        <Breadcrumbs
          speciesName={product.speciesName}
          speciesSlug={product.species}
          productTitle={product.title}
        />
      </div>

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Buy Box & Gallery Section */}
        <ProductBuyBox product={product} />

        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Freshness Window with Milled On & Best By dates */}
          <FreshnessWindow
            milledOn={product.milledOn}
            bestBy={product.bestBy}
          />

          {/* Guaranteed Nutritional Analysis Card */}
          <GuaranteedAnalysisCard
            nutritionFacts={product.nutritionFacts}
            productTitle={product.title}
          />

          {/* 100% Botanical Ingredients Section */}
          <IngredientsSection ingredients={product.ingredients} />

          {/* Species-Specific Feeding Guidance */}
          <FeedingGuidanceCard guidance={product.feedingGuidance} />
        </div>

        {/* Customer Reviews Section with Verified Buyer Badges */}
        <ReviewsSection
          reviews={product.reviews}
          ratingAvg={product.ratingAvg}
          ratingCount={product.ratingCount}
        />

        {/* Related Products Carousel / Grid */}
        <RelatedProducts
          products={relatedProducts}
          speciesName={product.speciesName}
        />
      </main>

      {/* Slide-over Mini-Cart Drawer */}
      <MiniCartDrawer />
    </div>
  );
}
