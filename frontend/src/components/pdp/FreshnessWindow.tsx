import React from 'react';
import { Calendar, ShieldCheck, Sparkles, Clock } from 'lucide-react';

interface FreshnessWindowProps {
  milledOn: string;
  bestBy: string;
}

export function FreshnessWindow({ milledOn, bestBy }: FreshnessWindowProps) {
  // Format dates: '2026-09-14' -> 'Sep 14, 2026'
  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formattedMilled = formatDate(milledOn);
  const formattedBestBy = formatDate(bestBy);

  return (
    <div
      data-testid="freshness-window"
      className="bg-surface rounded-2xl border border-border shadow-level1 p-6 md:p-8 my-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-border gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-species-budgie-wash text-species-budgie-base flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-jakarta text-lg font-bold text-text-primary">
              Clear Freshness Window & Guaranteed Milled Date
            </h3>
            <p className="font-inter text-xs text-text-muted">
              Live batch tracking for maximum volatile seed oil viability and zero rancidity
            </p>
          </div>
        </div>

        <span className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-species-budgie-wash text-species-budgie-base border border-species-budgie-base/20">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Peak Freshness Window
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Milled Date */}
        <div className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-subtle border border-border">
          <div className="w-9 h-9 rounded-lg bg-surface text-species-budgie-base flex items-center justify-center flex-shrink-0 shadow-xs">
            <Calendar className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <span className="font-inter text-[11px] uppercase tracking-wider text-text-muted font-semibold block">
              Freshly Milled On
            </span>
            <strong className="font-jakarta text-sm text-text-primary font-bold">
              {formattedMilled}
            </strong>
          </div>
        </div>

        {/* Best By Date */}
        <div className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-subtle border border-border">
          <div className="w-9 h-9 rounded-lg bg-surface text-text-muted flex items-center justify-center flex-shrink-0 shadow-xs">
            <Clock className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <span className="font-inter text-[11px] uppercase tracking-wider text-text-muted font-semibold block">
              Optimal Best By Date
            </span>
            <strong className="font-jakarta text-sm text-text-primary font-bold">
              {formattedBestBy}
            </strong>
          </div>
        </div>

        {/* Shelf-life & Trust Microcopy */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-text-muted">Potency & Viability Index</span>
            <span className="text-species-budgie-base font-bold tabular-numbers">98.5% Active</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-species-budgie-base rounded-full"
              style={{ width: '98.5%' }}
              role="progressbar"
              aria-valuenow={98}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="font-inter text-[11px] text-text-subtle leading-tight">
            Vacuum sealed immediately after gentle stone cleaning to safeguard essential amino acids and cold-pressed seed oils.
          </p>
        </div>
      </div>
    </div>
  );
}
