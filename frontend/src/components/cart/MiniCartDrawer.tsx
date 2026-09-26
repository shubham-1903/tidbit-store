'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight, Trash2, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD_DOLLARS = 35.0;

export function MiniCartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

  if (!isOpen) return null;

  // Calculate subtotal. If prices are stored as cents (e.g. 1299), check and normalize
  const subtotalCents = items.reduce((acc, item) => {
    // If item.price > 100, assume it's in cents, else dollars
    const itemPriceCents = item.price > 100 ? item.price : Math.round(item.price * 100);
    return acc + itemPriceCents * item.quantity;
  }, 0);

  const subtotalDollars = subtotalCents / 100;
  const progressPercent = Math.min(100, Math.round((subtotalDollars / FREE_SHIPPING_THRESHOLD_DOLLARS) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_DOLLARS - subtotalDollars);

  const speciesWashes: Record<string, string> = {
    budgerigar: 'bg-species-budgie-wash',
    lovebird: 'bg-species-lovebird-wash',
    finch: 'bg-species-finch-wash',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mini-cart-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Scrim Overlay with 8px blur per Design System Level 3 spec */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[#212121]/35 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Container with Level 3 elevation */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-level3 flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-species-budgie-base" aria-hidden="true" />
            <h2 id="mini-cart-title" className="font-jakarta text-lg font-bold text-text-primary">
              Your Avian Pantry ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-surface-subtle transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-surface-subtle px-6 py-3.5 border-b border-border">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            {remainingForFreeShipping === 0 ? (
              <span className="text-species-budgie-base font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> You&apos;ve unlocked Free Ground Shipping!
              </span>
            ) : (
              <span className="text-text-muted">
                Add <strong className="text-text-primary font-bold tabular-numbers">${remainingForFreeShipping.toFixed(2)}</strong> more for Free Shipping
              </span>
            )}
            <span className="text-text-muted tabular-numbers font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-species-budgie-base transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Line Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-species-budgie-wash flex items-center justify-center text-species-budgie-base">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-jakarta text-base font-bold text-text-primary">Your cart is empty</h3>
              <p className="font-inter text-xs text-text-muted max-w-xs">
                Explore our precision-milled avian formulations crafted specifically for your bird&apos;s nutritional needs.
              </p>
              <Button
                variant="budgerigar"
                size="sm"
                onClick={closeCart}
                className="mt-2"
              >
                Shop Fresh Blends
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const itemPriceInDollars = item.price > 100 ? item.price / 100 : item.price;
              const lineTotalInDollars = (itemPriceInDollars * item.quantity).toFixed(2);
              const washClass = speciesWashes[item.species] || 'bg-surface-subtle';

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-lg border border-border bg-surface hover:shadow-level1 transition-all"
                >
                  {/* Thumbnail on Species Wash */}
                  <div
                    className={cn(
                      'relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center p-2',
                      washClass
                    )}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-jakarta text-xs font-bold text-text-primary leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-text-subtle hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-inter text-[11px] text-text-muted font-medium">
                        {item.variant}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.id, qty)}
                        min={1}
                        max={99}
                      />
                      <span className="font-inter font-bold text-sm text-text-primary tabular-numbers">
                        ${lineTotalInDollars}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-surface space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span className="font-bold text-text-primary text-sm tabular-numbers">
                  ${subtotalDollars.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Estimated Shipping</span>
                <span className="tabular-numbers">
                  {remainingForFreeShipping === 0 ? (
                    <strong className="text-species-budgie-base uppercase font-bold">Free</strong>
                  ) : (
                    '$4.99'
                  )}
                </span>
              </div>
              <p className="font-inter text-[11px] text-text-subtle">
                Taxes & shipping calculated at checkout. Fresh batch milled on demand.
              </p>
            </div>

            <Link href="/checkout" onClick={closeCart} className="block w-full">
              <Button
                variant="budgerigar"
                size="lg"
                className="w-full flex items-center justify-center gap-2 group shadow-level1 hover:shadow-level2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
