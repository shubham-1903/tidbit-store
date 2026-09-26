'use client';

import React, { useState } from 'react';
import { ProductCard, ProductCardProps } from './ProductCard';
import { FilterChip } from '@/components/ui/FilterChip';

export const coreProducts: ProductCardProps[] = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    slug: 'parakeet-budgerigar-daily-vitality',
    title: 'Tidbit Parakeet & Budgerigar Daily Vitality',
    subtitle: 'Whole-grain botanical vitality blend with chelated minerals',
    species: 'budgerigar',
    speciesLabel: 'Parakeet & Budgie',
    badge: 'Advanced Formula',
    ratingAvg: 4.9,
    ratingCount: 208,
    basePriceCents: 1299,
    compareAtPriceCents: 1899,
    specs: ['Digestive Seeds', 'Dust Free', '1 Kg Pack'],
    imageUrl: '/images/products/budgie-daily-vitality.png',
    defaultVariant: '1 kg',
    productHref: '/budgerigar/daily-vitality',
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    slug: 'premium-lovebird-cockatiel-seed-mix',
    title: 'Tidbit Premium Lovebird & Cockatiel Seed Mix',
    subtitle: 'Diversified foraging blend with safflower and rosehips',
    species: 'lovebird',
    speciesLabel: 'Lovebird & Cockatiel',
    badge: 'Bestseller',
    ratingAvg: 4.9,
    ratingCount: 127,
    basePriceCents: 1499,
    compareAtPriceCents: 1999,
    specs: ['Enriched D3 + Ca', '100% Natural', '1 Kg Pack'],
    imageUrl: '/images/products/lovebird-premium-mix.png',
    defaultVariant: '1 kg',
    productHref: '/budgerigar', // POC vertical slice
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    slug: 'goldfinch-french-canary-seed-formula',
    title: 'Tidbit Goldfinch / French & Canary Seed Formula',
    subtitle: 'Triple-cleaned micro-seed blend for delicate beaks',
    species: 'finch',
    speciesLabel: 'Finch & Canary',
    badge: 'Advanced Formula',
    ratingAvg: 4.8,
    ratingCount: 127,
    basePriceCents: 1349,
    compareAtPriceCents: 1899,
    specs: ['High Energy Niger', 'Feather Shine', '1 Kg Pack'],
    imageUrl: '/images/products/finch-goldfinch-formula.png',
    defaultVariant: '1 kg',
    productHref: '/budgerigar', // POC vertical slice
  },
];

type FilterType = 'all' | 'budgerigar' | 'lovebird' | 'finch';

export function ProductGrid() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const filteredProducts = coreProducts.filter((product) => {
    if (selectedFilter === 'all') return true;
    return product.species === selectedFilter;
  });

  return (
    <section
      id="best-sellers"
      aria-labelledby="featured-products-heading"
      className="bg-canvas py-16 md:py-24 border-t border-border"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header with Category & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col">
            <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-species-budgie-base mb-2">
              Direct From Our Mill
            </span>
            <h2
              id="featured-products-heading"
              className="font-jakarta text-3xl sm:text-4xl font-bold text-text-primary tracking-tight"
            >
              Fresh Batches Ready to Ship
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filter products by bird species">
            <FilterChip
              selected={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
              species="budgerigar"
            >
              All Species
            </FilterChip>
            <FilterChip
              selected={selectedFilter === 'budgerigar'}
              onClick={() => setSelectedFilter('budgerigar')}
              species="budgerigar"
            >
              Budgerigars
            </FilterChip>
            <FilterChip
              selected={selectedFilter === 'lovebird'}
              onClick={() => setSelectedFilter('lovebird')}
              species="lovebird"
            >
              Cockatiel & Lovebird
            </FilterChip>
            <FilterChip
              selected={selectedFilter === 'finch'}
              onClick={() => setSelectedFilter('finch')}
              species="finch"
            >
              Finches & Canaries
            </FilterChip>
          </div>
        </div>

        {/* 3 Core Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
