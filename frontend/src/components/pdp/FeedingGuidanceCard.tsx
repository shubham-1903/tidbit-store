import React from 'react';
import { FeedingGuidance } from '@/lib/catalog';
import { Scale, Utensils, Info, CheckCircle2 } from 'lucide-react';

interface FeedingGuidanceCardProps {
  guidance: FeedingGuidance;
}

export function FeedingGuidanceCard({ guidance }: FeedingGuidanceCardProps) {
  return (
    <div
      data-testid="feeding-guidance-card"
      className="bg-surface rounded-2xl border border-border shadow-level1 p-6 md:p-8 my-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-border gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-species-budgie-wash text-species-budgie-base flex items-center justify-center flex-shrink-0">
            <Utensils className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-jakarta text-lg sm:text-xl font-bold text-text-primary">
              Avian Feeding Guidance & Daily Rations
            </h3>
            <p className="font-inter text-xs text-text-muted">
              Calibrated for {guidance.speciesName} metabolic burn rate
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-species-budgie-wash text-species-budgie-base border border-species-budgie-base/20">
          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Species Calibrated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-subtle border border-border">
          <div className="w-9 h-9 rounded-lg bg-surface text-species-budgie-base flex items-center justify-center flex-shrink-0 shadow-xs">
            <Scale className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
              Companion Body Weight
            </span>
            <strong className="font-jakarta text-base font-bold text-text-primary">
              {guidance.birdWeightRangeG}
            </strong>
            <p className="font-inter text-xs text-text-muted mt-0.5">
              Standard adult weight range
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-subtle border border-border">
          <div className="w-9 h-9 rounded-lg bg-surface text-species-budgie-base flex items-center justify-center flex-shrink-0 shadow-xs">
            <Utensils className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
              Recommended Daily Amount
            </span>
            <strong className="font-jakarta text-base font-bold text-text-primary">
              {guidance.dailyAmountG}
            </strong>
            <p className="font-inter text-xs text-text-muted mt-0.5">
              Adjust slightly during molting seasons
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-subtle/80 border border-border/80 flex items-start gap-3">
        <Info className="w-4 h-4 text-species-budgie-base flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-text-muted leading-relaxed">
          <strong className="text-text-primary font-semibold block mb-0.5">
            Avian Caretaker Notes:
          </strong>
          {guidance.notes}
        </div>
      </div>
    </div>
  );
}
