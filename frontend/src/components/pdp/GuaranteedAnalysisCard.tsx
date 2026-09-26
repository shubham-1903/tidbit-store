import React from 'react';
import { NutritionFact } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { Award } from 'lucide-react';

interface GuaranteedAnalysisCardProps {
  nutritionFacts: NutritionFact[];
  productTitle: string;
}

export function GuaranteedAnalysisCard({ nutritionFacts, productTitle }: GuaranteedAnalysisCardProps) {
  return (
    <div
      data-testid="guaranteed-analysis-card"
      className="bg-surface rounded-2xl border border-border shadow-level1 p-6 md:p-8 my-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-4 border-b border-border gap-2">
        <div>
          <h3 className="font-jakarta text-lg sm:text-xl font-bold text-text-primary">
            Guaranteed Nutritional Analysis
          </h3>
          <p className="font-inter text-xs text-text-muted mt-0.5">
            Laboratory certified per AAFCO Avian Formulation Standards (per 100g serving)
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-species-budgie-wash text-species-budgie-base border border-species-budgie-base/20">
          <Award className="w-3.5 h-3.5" aria-hidden="true" />
          Certified Analysis
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label={`Guaranteed Nutritional Analysis for ${productTitle}`}>
          <thead>
            <tr className="border-b-2 border-border text-xs font-jakarta">
              <th scope="col" className="py-3.5 px-4 font-bold text-text-primary uppercase tracking-wider">
                Nutrient Factor
              </th>
              <th scope="col" className="py-3.5 px-4 font-bold text-species-budgie-base text-right">
                Guaranteed Value
              </th>
              <th scope="col" className="py-3.5 px-4 font-bold text-text-muted text-right">
                Target Avian Range
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs sm:text-sm font-inter">
            {nutritionFacts.map((fact, index) => (
              <tr
                key={fact.nutrient}
                className={cn(
                  'transition-colors hover:bg-species-budgie-wash/20',
                  index % 2 === 0 ? 'bg-surface' : 'bg-canvas'
                )}
              >
                <th scope="row" className="py-3.5 px-4 font-medium text-text-primary">
                  {fact.nutrient}
                </th>
                <td className="py-3.5 px-4 text-right font-bold text-text-primary tabular-numbers">
                  {fact.valueText}
                </td>
                <td className="py-3.5 px-4 text-right text-text-muted tabular-numbers">
                  {fact.nutrient.includes('Protein')
                    ? '11.0% – 13.0%'
                    : fact.nutrient.includes('Fat')
                    ? '4.5% – 6.0%'
                    : fact.nutrient.includes('Fiber')
                    ? '5.0% – 7.5%'
                    : '1.5 : 1 – 2.0 : 1'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
