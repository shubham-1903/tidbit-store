import React from 'react';
import { Review } from '@/lib/catalog';
import { Star, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewsSectionProps {
  reviews: Review[];
  ratingAvg: number;
  ratingCount: number;
}

export function ReviewsSection({ reviews, ratingAvg, ratingCount }: ReviewsSectionProps) {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="py-12 md:py-16 border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-species-budgie-base mb-1 block">
              Caretaker Community Feedback
            </span>
            <h2 id="reviews-heading" className="font-jakarta text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Loved by Avian Caretakers
            </h2>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border shadow-xs">
            <div className="flex items-center text-amber-500" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < Math.floor(ratingAvg) ? 'fill-amber-400 text-amber-400' : 'fill-border text-border'
                  )}
                />
              ))}
            </div>
            <span className="font-jakarta text-base font-bold text-text-primary tabular-numbers">
              {ratingAvg.toFixed(1)} / 5.0
            </span>
            <span className="text-text-muted text-xs tabular-numbers font-medium">
              ({ratingCount} verified reviews)
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              data-testid={`review-card-${review.authorName.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-surface rounded-2xl border border-border p-6 shadow-level1 flex flex-col justify-between hover:shadow-level2 transition-shadow"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {review.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-species-budgie-base bg-species-budgie-wash px-2 py-0.5 rounded-full border border-species-budgie-base/20">
                      <ShieldCheck className="w-3 h-3" /> Verified Caretaker
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h3 className="font-jakarta text-base font-bold text-text-primary mb-2 leading-snug">
                  {review.title}
                </h3>

                {/* Review Body */}
                <p className="font-inter text-xs text-text-muted leading-relaxed mb-6">
                  &ldquo;{review.body}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <h4 className="font-jakarta text-xs font-bold text-text-primary">
                    {review.authorName}
                  </h4>
                  <p className="font-inter text-[11px] text-text-muted">
                    {review.authorLocation}
                  </p>
                </div>
                <span className="font-inter text-[11px] text-text-subtle">
                  {review.createdAt}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
