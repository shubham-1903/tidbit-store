import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SpeciesSlug } from '@/types/catalog';
import { cn } from '@/lib/utils';

export interface SpeciesCardProps {
  slug: SpeciesSlug;
  badge: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
  ctaText: string;
  href: string;
}

const speciesThemes: Record<
  SpeciesSlug,
  {
    base: string;
    hover: string;
    wash: string;
    borderHover: string;
    buttonBg: string;
    buttonHover: string;
    badgeBg: string;
    badgeText: string;
    checkBg: string;
  }
> = {
  budgerigar: {
    base: 'text-species-budgie-base',
    hover: 'group-hover:text-species-budgie-hover',
    wash: 'bg-species-budgie-wash',
    borderHover: 'hover:border-species-budgie-base/40',
    buttonBg: 'bg-species-budgie-base hover:bg-species-budgie-deepen',
    buttonHover: 'hover:bg-species-budgie-deepen',
    badgeBg: 'bg-species-budgie-wash',
    badgeText: 'text-species-budgie-base',
    checkBg: 'bg-species-budgie-wash text-species-budgie-base',
  },
  lovebird: {
    base: 'text-species-lovebird-base',
    hover: 'group-hover:text-species-lovebird-hover',
    wash: 'bg-species-lovebird-wash',
    borderHover: 'hover:border-species-lovebird-base/40',
    buttonBg: 'bg-species-lovebird-base hover:bg-species-lovebird-hover',
    buttonHover: 'hover:bg-species-lovebird-hover',
    badgeBg: 'bg-species-lovebird-wash',
    badgeText: 'text-species-lovebird-base',
    checkBg: 'bg-species-lovebird-wash text-species-lovebird-base',
  },
  finch: {
    base: 'text-species-finch-base',
    hover: 'group-hover:text-species-finch-hover',
    wash: 'bg-species-finch-wash',
    borderHover: 'hover:border-species-finch-base/40',
    buttonBg: 'bg-species-finch-base hover:bg-species-finch-hover',
    buttonHover: 'hover:bg-species-finch-hover',
    badgeBg: 'bg-species-finch-wash',
    badgeText: 'text-species-finch-base',
    checkBg: 'bg-species-finch-wash text-species-finch-base',
  },
};

export function SpeciesCard({
  slug,
  badge,
  name,
  subtitle,
  imageSrc,
  imageAlt,
  features,
  ctaText,
  href,
}: SpeciesCardProps) {
  const theme = speciesThemes[slug];

  return (
    <article
      data-testid={`species-card-${slug}`}
      className={cn(
        'group flex flex-col justify-between bg-surface rounded-xl border border-border p-6 shadow-level1',
        'transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-level2',
        theme.borderHover
      )}
    >
      <div>
        {/* Top Image Stage on Species Wash */}
        <div
          className={cn(
            'relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center p-6 mb-6',
            theme.wash
          )}
        >
          {/* Top-Left Badge Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={cn(
                'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                theme.badgeBg,
                theme.badgeText,
                'border border-current/20'
              )}
            >
              {badge}
            </span>
          </div>

          {/* Product Packaging Image */}
          <div className="relative w-full h-full max-w-[220px] max-h-[220px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col mb-6">
          <h3 className="font-jakarta text-xl font-bold text-text-primary mb-1 tracking-tight">
            {name}
          </h3>
          <p className="font-inter text-xs font-medium text-text-muted mb-4">
            {subtitle}
          </p>

          {/* Feature Bullets */}
          <ul className="space-y-2.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs text-text-primary">
                <span
                  className={cn(
                    'w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                    theme.checkBg
                  )}
                  aria-hidden="true"
                >
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </span>
                <span className="font-inter leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Species Action CTA Button */}
      <Link href={href} className="w-full mt-2">
        <button
          type="button"
          className={cn(
            'w-full h-12 px-6 rounded-full text-white font-jakarta text-sm font-semibold tracking-wide',
            'flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98]',
            theme.buttonBg
          )}
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </Link>
    </article>
  );
}
