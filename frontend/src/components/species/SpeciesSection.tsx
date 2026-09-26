import React from 'react';
import { SpeciesCard, SpeciesCardProps } from './SpeciesCard';

const speciesData: SpeciesCardProps[] = [
  {
    slug: 'budgerigar',
    badge: 'Active & Vitality',
    name: 'Budgerigar Balanced Blend',
    subtitle: '1.0 Kg Stand-Up Eco Kraft Pouch',
    imageSrc: '/images/species/budgerigar-pouch.png',
    imageAlt: 'Tidbit Budgerigar Blend Stand-Up Eco Kraft Pouch',
    features: [
      'Canary seeds & Australian golden millet',
      'Micro gastric grit for smooth digestion',
      'Enriched with Spirulina algae minerals',
    ],
    ctaText: 'Explore Budgie Blend',
    href: '/budgerigar',
  },
  {
    slug: 'lovebird',
    badge: 'Bestseller',
    name: 'Lovebird & Cockatiel Seed Mix',
    subtitle: '1.0 Kg Stand-Up Eco Kraft Pouch',
    imageSrc: '/images/species/lovebird-pouch.png',
    imageAlt: 'Tidbit Lovebird and Cockatiel Blend Stand-Up Eco Kraft Pouch',
    features: [
      'White safflower, sunflower & buckwheat',
      'Dried elderberries & mountain rowan fruit',
      'Fortified with active calcium carbonate',
    ],
    ctaText: 'Explore Cockatiel Blend',
    href: '/budgerigar', // Directs to POC vertical slice
  },
  {
    slug: 'finch',
    badge: 'Micro-Seed',
    name: 'Finch & Canary Vitality Mix',
    subtitle: '1.0 Kg Stand-Up Eco Kraft Pouch',
    imageSrc: '/images/species/finch-pouch.png',
    imageAlt: 'Tidbit Finch and Canary Blend Stand-Up Eco Kraft Pouch',
    features: [
      'Fine golden panicle millet & dark niger seed',
      'Golden flaxseed for seasonal molting support',
      'High-metabolism seed oils for song vigor',
    ],
    ctaText: 'Explore Finch Blend',
    href: '/budgerigar', // Directs to POC vertical slice
  },
];

export function SpeciesSection() {
  return (
    <section
      id="species-section"
      aria-labelledby="species-heading"
      className="bg-canvas py-16 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex flex-col">
            <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-species-budgie-base mb-2">
              Species Specialization
            </span>
            <h2
              id="species-heading"
              className="font-jakarta text-3xl sm:text-4xl font-bold text-text-primary tracking-tight"
            >
              Tailored by Species
            </h2>
          </div>
          <p className="font-inter text-sm text-text-muted max-w-md leading-relaxed">
            Formulated for specific metabolic ratios, beak size calibrations, and innate foraging habits.
          </p>
        </div>

        {/* 3 Species Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {speciesData.map((species) => (
            <SpeciesCard key={species.slug} {...species} />
          ))}
        </div>
      </div>
    </section>
  );
}
