'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Heart, Truck, Check, Sparkles, Feather } from 'lucide-react';
import { DetailedProduct, ProductVariant } from '@/lib/catalog';
import { useCartStore } from '@/store/cartStore';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { FilterChip } from '@/components/ui/FilterChip';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ProductBuyBoxProps {
  product: DetailedProduct;
}

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);

  const currentPriceDollars = (selectedVariant.priceCents / 100).toFixed(2);
  const originalPriceDollars = (selectedVariant.compareAtPriceCents / 100).toFixed(2);
  const savingsPercent = Math.round(
    ((selectedVariant.compareAtPriceCents - selectedVariant.priceCents) /
      selectedVariant.compareAtPriceCents) *
      100
  );
  const savingsDollars = (
    (selectedVariant.compareAtPriceCents - selectedVariant.priceCents) /
    100
  ).toFixed(2);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      name: `${product.title} (${selectedVariant.label})`,
      price: selectedVariant.priceCents,
      quantity,
      imageUrl: product.imageUrls[0],
      species: product.species,
      variant: selectedVariant.label,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section aria-label="Product details and purchase options" className="py-6 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Stage on Species Wash */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div
              className={cn(
                'relative w-full aspect-square rounded-2xl md:rounded-3xl border border-border overflow-hidden flex items-center justify-center p-8 shadow-level1',
                'bg-species-budgie-wash'
              )}
            >
              {/* Species Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface text-species-budgie-base border border-species-budgie-base/20 shadow-xs">
                  <Feather className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{product.speciesName} Lane</span>
                </span>
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-species-budgie-base text-white shadow-xs">
                  {product.badge}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-surface/90 hover:bg-surface text-text-muted hover:text-red-500 shadow-level1 transition-all"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isWishlisted && 'fill-red-500 text-red-500'
                  )}
                />
              </button>

              {/* Product Pouch Main Image */}
              <div className="relative w-full h-full max-w-[380px] max-h-[380px]">
                <Image
                  src={product.imageUrls[0]}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                />
              </div>

              {/* Bottom Tag: Vacuum Sealed */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-text-muted px-4 py-2 bg-surface/90 backdrop-blur-sm rounded-xl border border-border">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-species-budgie-base" aria-hidden="true" />
                  Cold-sealed for maximum nutrient retention
                </span>
                <span className="font-semibold tabular-numbers text-text-primary">
                  SKU: {selectedVariant.id}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box Info & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Species Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-species-budgie-wash text-species-budgie-base text-xs font-semibold mb-3 border border-species-budgie-base/20">
              <span className="w-2 h-2 rounded-full bg-species-budgie-base" aria-hidden="true" />
              <span>{product.speciesName} Recipe</span>
            </div>

            {/* Product Title */}
            <h1 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight mb-3">
              {product.title}
            </h1>

            {/* Subtitle */}
            <p className="font-inter text-sm sm:text-base text-text-muted leading-relaxed mb-4">
              {product.subtitle}
            </p>

            {/* Rating Stars Summary */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border w-full">
              <div className="flex items-center text-amber-500" aria-label={`Rating: ${product.ratingAvg} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-inter text-sm font-semibold text-text-primary tabular-numbers">
                {product.ratingAvg.toFixed(1)}
              </span>
              <span className="text-text-subtle text-xs">•</span>
              <a href="#reviews" className="font-inter text-xs text-text-muted hover:text-species-budgie-base underline underline-offset-2">
                {product.ratingCount} caretaker reviews
              </a>
              <span className="text-text-subtle text-xs">•</span>
              <span className="text-species-budgie-base text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Verified Formulation
              </span>
            </div>

            {/* Dynamic Price Block with Savings Pill */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-jakarta text-3xl sm:text-4xl font-bold text-text-primary tabular-numbers">
                ${currentPriceDollars}
              </span>
              <span className="font-inter text-base sm:text-lg text-text-subtle line-through tabular-numbers">
                ${originalPriceDollars}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-species-budgie-wash text-species-budgie-base border border-species-budgie-base/20">
                Save ${savingsDollars} ({savingsPercent}% Off)
              </span>
            </div>

            {/* Weight Variant Selector Chips */}
            <div className="w-full mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="font-jakarta text-xs font-bold uppercase tracking-wider text-text-primary">
                  Select Pouch Size: <strong className="text-species-budgie-base normal-case">{selectedVariant.label}</strong>
                </label>
                <span className="font-inter text-xs text-text-muted">
                  In Stock ({selectedVariant.stock} units ready)
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Product weight variants">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <FilterChip
                      key={v.id}
                      selected={isSelected}
                      onClick={() => setSelectedVariant(v)}
                      species="budgerigar"
                      className="px-4 py-2 text-xs font-semibold"
                    >
                      {v.label} — ${(v.priceCents / 100).toFixed(2)}
                    </FilterChip>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-text-muted sm:hidden">
                  Quantity:
                </span>
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={99}
                />
              </div>

              <Button
                variant="budgerigar"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 shadow-level1 hover:shadow-level2 cursor-pointer h-12"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag</span>{' '}
                    <span className="tabular-numbers">
                      — ${((selectedVariant.priceCents * quantity) / 100).toFixed(2)}
                    </span>
                  </>
                )}
              </Button>
            </div>

            {/* Value Guarantees / Shipping Notice */}
            <div className="w-full p-4 rounded-xl bg-surface-subtle border border-border space-y-2 text-xs text-text-muted">
              <div className="flex items-center gap-2 text-text-primary font-medium">
                <Truck className="w-4 h-4 text-species-budgie-base flex-shrink-0" aria-hidden="true" />
                <span>Free Express Shipping on orders over $35</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-species-budgie-base flex-shrink-0" aria-hidden="true" />
                <span>100% Palatability Guarantee: Full refund if your bird refuses within 14 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
