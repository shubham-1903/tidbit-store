import React from 'react';
import { Microscope, ShieldCheck, Wind, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NutritionRow {
  nutrient: string;
  budgie: string;
  lovebird: string;
  finch: string;
}

const nutritionData: NutritionRow[] = [
  {
    nutrient: 'Crude Protein (min)',
    budgie: '11.5%',
    lovebird: '14.2%',
    finch: '13.8%',
  },
  {
    nutrient: 'Crude Fat (min)',
    budgie: '5.2%',
    lovebird: '8.9%',
    finch: '7.1%',
  },
  {
    nutrient: 'Crude Fiber (max)',
    budgie: '6.8%',
    lovebird: '7.0%',
    finch: '6.4%',
  },
  {
    nutrient: 'Calcium / Phosphorus Ratio',
    budgie: '1.8 : 1',
    lovebird: '1.9 : 1',
    finch: '1.5 : 1',
  },
];

export function NutritionalAnalysisTable() {
  return (
    <section
      id="quality"
      aria-labelledby="nutrition-standards-heading"
      className="bg-species-budgie-deepen text-white py-16 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-species-budgie-wash/90 mb-2 block">
            Nutritional Standard of Care
          </span>
          <h2
            id="nutrition-standards-heading"
            className="font-jakarta text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Why Avian Caretakers Trust Tidbit
          </h2>
          <p className="font-inter text-sm md:text-base text-species-budgie-wash/80 leading-relaxed">
            Generic commercial bird seeds harbor filler grains and dangerous ambient dust. Tidbit raises the standard through botanical purity and medical rigor.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-species-budgie-wash text-species-budgie-base flex items-center justify-center mb-4">
              <Microscope className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-jakarta text-base font-bold text-white mb-1.5">
              Complete Amino Acids
            </h3>
            <p className="font-inter text-xs text-species-budgie-wash/80 leading-relaxed mb-3">
              Rich lysine and methionine profiles directly support healthy molting cycles and vivid, silky feather pigment without stress bars.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-species-budgie-wash">
              ✓ Laboratory Assayed
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-species-budgie-wash text-species-budgie-base flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-jakarta text-base font-bold text-white mb-1.5">
              Calcium & Vitamin D3
            </h3>
            <p className="font-inter text-xs text-species-budgie-wash/80 leading-relaxed mb-3">
              Fortified to counteract the chronic hypocalcemia common in companion seed-eaters, reinforcing bone structural integrity and beak hardness.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-species-budgie-wash">
              ✓ Avian Nutrition Standard
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-species-budgie-wash text-species-budgie-base flex items-center justify-center mb-4">
              <Wind className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-jakarta text-base font-bold text-white mb-1.5">
              Triple Cleaned Seeds
            </h3>
            <p className="font-inter text-xs text-species-budgie-wash/80 leading-relaxed mb-3">
              99.9% dust-free mechanical air aspiration removes micro-fungal spores and chaff that cause air sac infections in delicate songbirds.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-species-budgie-wash">
              ✓ Aspiration Air-Washed
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-species-budgie-wash text-species-budgie-base flex items-center justify-center mb-4">
              <CalendarCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-jakarta text-base font-bold text-white mb-1.5">
              Clear Freshness Window
            </h3>
            <p className="font-inter text-xs text-species-budgie-wash/80 leading-relaxed mb-3">
              Every kraft pouch includes an organic inspection circular window. What you see is whole, vibrant, uncracked harvest seeds ready to sprout.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-species-budgie-wash">
              ✓ Sproutability Guaranteed
            </span>
          </div>
        </div>

        {/* Guaranteed Nutritional Analysis Across Blends Card & Table */}
        <div className="bg-surface text-text-primary rounded-2xl p-6 sm:p-8 shadow-level2 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-4 border-b border-border gap-2">
            <div>
              <h3 className="font-jakarta text-lg sm:text-xl font-bold text-text-primary">
                Guaranteed Nutritional Analysis Across Blends
              </h3>
              <p className="font-inter text-xs text-text-muted mt-1">
                Validated per AAFCO Avian Formulation Guidelines (per 100g serving)
              </p>
            </div>
            <span className="inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-surface-subtle text-text-muted border border-border">
              Batch Tested #TB-2026-04
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Nutritional comparison table across species blends">
              <thead>
                <tr className="border-b-2 border-border text-xs font-jakarta">
                  <th scope="col" className="py-3.5 px-4 font-bold text-text-primary uppercase tracking-wider">
                    Nutrient Factor
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-species-budgie-base text-right">
                    Budgerigar Daily Vitality
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-species-lovebird-base text-right">
                    Lovebird & Cockatiel Mix
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-species-finch-base text-right">
                    Finch & Canary Formula
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm font-inter">
                {nutritionData.map((row, index) => (
                  <tr
                    key={row.nutrient}
                    className={cn(
                      'transition-colors hover:bg-species-budgie-wash/30',
                      index % 2 === 0 ? 'bg-surface' : 'bg-canvas'
                    )}
                  >
                    <th scope="row" className="py-3.5 px-4 font-medium text-text-primary">
                      {row.nutrient}
                    </th>
                    <td className="py-3.5 px-4 text-right font-bold text-text-primary tabular-numbers">
                      {row.budgie}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-text-primary tabular-numbers">
                      {row.lovebird}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-text-primary tabular-numbers">
                      {row.finch}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
