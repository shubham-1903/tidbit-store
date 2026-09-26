'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, Check } from 'lucide-react';
import { SpeciesSlug } from '@/types/catalog';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

export interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  species: SpeciesSlug;
  speciesLabel: string;
  badge?: string;
  ratingAvg: number;
  ratingCount: number;
  basePriceCents: number;
  compareAtPriceCents?: number | null;
  specs?: string[];
  imageUrl: string;
  defaultVariant?: string;
  productHref?: string;
}

const speciesThemes: Record<
  SpeciesSlug,
  {
    wash: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonHover: string;
    savingsBg: string;
    savingsText: string;
    borderHover: string;
  }
> = {
  budgerigar: {
    wash: 'bg-species-budgie-wash',
    badgeBg: 'bg-species-budgie-wash',
    badgeText: 'text-species-budgie-base',
    buttonBg: 'bg-species-budgie-base hover:bg-species-budgie-deepen',
    buttonHover: 'hover:bg-species-budgie-deepen',
    savingsBg: 'bg-species-budgie-wash',
    savingsText: 'text-species-budgie-base',
    borderHover: 'hover:border-species-budgie-base/40',
  },
  lovebird: {
    wash: 'bg-species-lovebird-wash',
    badgeBg: 'bg-species-lovebird-wash',
    badgeText: 'text-species-lovebird-base',
    buttonBg: 'bg-species-lovebird-base hover:bg-species-lovebird-hover',
    buttonHover: 'hover:bg-species-lovebird-hover',
    savingsBg: 'bg-species-lovebird-wash',
    savingsText: 'text-species-lovebird-base',
    borderHover: 'hover:border-species-lovebird-base/40',
  },
  finch: {
    wash: 'bg-species-finch-wash',
    badgeBg: 'bg-species-finch-wash',
    badgeText: 'text-species-finch-base',
    buttonBg: 'bg-species-finch-base hover:bg-species-finch-hover',
    buttonHover: 'hover:bg-species-finch-hover',
    savingsBg: 'bg-species-finch-wash',
    savingsText: 'text-species-finch-base',
    borderHover: 'hover:border-species-finch-base/40',
  },
};

export function ProductCard({
  id,
  slug,
  title,
  subtitle,
  species,
  speciesLabel,
  badge,
  ratingAvg,
  ratingCount,
  basePriceCents,
  compareAtPriceCents,
  specs = [],
  imageUrl,
  defaultVariant = '1 kg',
  productHref,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const theme = speciesThemes[species];
  const targetHref = productHref || `/${species === 'budgerigar' ? 'budgerigar' : 'budgerigar'}/${slug}`;

  const currentPriceDollars = (basePriceCents / 100).toFixed(2);
  const originalPriceDollars = compareAtPriceCents ? (compareAtPriceCents / 100).toFixed(2) : null;
  const savingsPercent = compareAtPriceCents
    ? Math.round(((compareAtPriceCents - basePriceCents) / compareAtPriceCents) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${id}-${defaultVariant}`,
      name: title,
      price: basePriceCents,
      quantity: 1,
      imageUrl,
      species,
      variant: defaultVariant,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <article
      data-testid={`product-card-${slug}`}
      className={cn(
        'group flex flex-col justify-between bg-surface rounded-xl border border-border p-5 shadow-level1',
        'transition-all duration-300 ease-out hover:shadow-level2 hover:-translate-y-1',
        theme.borderHover
      )}
    >
      <div>
        {/* Top Image Stage on Species Wash */}
        <div
          className={cn(
            'relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center p-4 mb-4',
            theme.wash
          )}
        >
          {/* Top-Left Badges (Promotional / Species) */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            {badge && (
              <span
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider',
                  theme.badgeBg,
                  theme.badgeText,
                  'border border-current/20 shadow-xs'
                )}
              >
                {badge}
              </span>
            )}
            <span className="bg-surface/90 text-text-muted px-2 py-0.5 rounded-full text-[10px] font-semibold border border-border">
              {speciesLabel}
            </span>
          </div>

          {/* Top-Right Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-surface/80 hover:bg-surface text-text-muted hover:text-red-500 shadow-xs transition-colors"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn('w-4 h-4', isWishlisted && 'fill-red-500 text-red-500')}
            />
          </button>

          {/* Product Pouch Image */}
          <div className="relative w-full h-full max-w-[200px] max-h-[200px]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 320px"
            />
          </div>
        </div>

        {/* Rating Stars and Review Count */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center text-amber-500" aria-label={`Rating: ${ratingAvg} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3.5 h-3.5',
                  i < Math.floor(ratingAvg)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-border text-border'
                )}
              />
            ))}
          </div>
          <span className="font-inter text-xs text-text-muted font-medium tabular-numbers">
            {ratingAvg.toFixed(1)} ({ratingCount})
          </span>
        </div>

        {/* Product Title */}
        <Link href={targetHref} className="block group-hover:text-text-primary">
          <h3 className="font-jakarta text-base font-bold text-text-primary line-clamp-2 leading-snug mb-1.5 hover:underline">
            {title}
          </h3>
        </Link>

        {subtitle && (
          <p className="font-inter text-xs text-text-muted line-clamp-1 mb-3">
            {subtitle}
          </p>
        )}

        {/* Sub-specs chips */}
        {specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {specs.map((spec, i) => (
              <span
                key={i}
                className="bg-surface-subtle text-text-muted px-2 py-0.5 rounded text-[11px] font-medium border border-border/60"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & Add to Cart Block */}
      <div className="pt-3 border-t border-border mt-2 space-y-3">
        {/* Price Row */}
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-jakarta text-lg font-bold text-text-primary tabular-numbers">
              ${currentPriceDollars}
            </span>
            {originalPriceDollars && (
              <span className="font-inter text-xs text-text-subtle line-through tabular-numbers">
                ${originalPriceDollars}
              </span>
            )}
          </div>

          {savingsPercent > 0 && (
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight',
                theme.savingsBg,
                theme.savingsText
              )}
            >
              Save {savingsPercent}%
            </span>
          )}
        </div>

        {/* Add to Cart CTA Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={cn(
            'w-full h-11 px-5 rounded-full text-white font-jakarta text-xs font-semibold tracking-wide',
            'flex items-center justify-center gap-2 shadow-xs transition-all duration-200 active:scale-[0.98]',
            theme.buttonBg
          )}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span>Add to Cart ({defaultVariant})</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
