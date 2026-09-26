import React from 'react';
import { Leaf, ShieldCheck } from 'lucide-react';

interface IngredientsSectionProps {
  ingredients: string[];
}

export function IngredientsSection({ ingredients }: IngredientsSectionProps) {
  return (
    <div
      data-testid="ingredients-section"
      className="bg-surface rounded-2xl border border-border shadow-level1 p-6 md:p-8 my-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-border gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-species-budgie-wash text-species-budgie-base flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-jakarta text-lg sm:text-xl font-bold text-text-primary">
              100% Botanical Ingredients & Sourcing
            </h3>
            <p className="font-inter text-xs text-text-muted">
              Zero synthetic binders, zero artificial flavorings, and zero chemical fumigants
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-species-budgie-wash text-species-budgie-base border border-species-budgie-base/20">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Non-GMO Verified
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {ingredients.map((ingredient, i) => (
          <div
            key={i}
            className="flex flex-col p-3 rounded-xl bg-surface-subtle border border-border hover:border-species-budgie-base/40 transition-colors"
          >
            <span className="text-[10px] font-bold text-species-budgie-base uppercase tracking-wider mb-1">
              Ingredient #{i + 1}
            </span>
            <span className="font-inter text-xs font-semibold text-text-primary leading-snug">
              {ingredient}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
