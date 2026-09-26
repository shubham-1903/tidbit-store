import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FreshnessWindow } from './FreshnessWindow';
import { GuaranteedAnalysisCard } from './GuaranteedAnalysisCard';
import { FeedingGuidanceCard } from './FeedingGuidanceCard';
import { ReviewsSection } from './ReviewsSection';
import { CATALOG_PRODUCTS } from '@/lib/catalog';

describe('PDP Detail Cards', () => {
  const product = CATALOG_PRODUCTS[0];

  it('FreshnessWindow renders formatted dates and trust copy', () => {
    render(<FreshnessWindow milledOn={product.milledOn} bestBy={product.bestBy} />);
    expect(screen.getByText(/clear freshness window/i)).toBeInTheDocument();
    expect(screen.getByText('Sep 14, 2026')).toBeInTheDocument();
    expect(screen.getByText('Aug 31, 2027')).toBeInTheDocument();
    expect(screen.getByText(/vacuum sealed immediately/i)).toBeInTheDocument();
  });

  it('GuaranteedAnalysisCard renders tabular numbers and all nutrient factors', () => {
    render(
      <GuaranteedAnalysisCard
        nutritionFacts={product.nutritionFacts}
        productTitle={product.title}
      />
    );
    expect(screen.getByRole('heading', { name: /guaranteed nutritional analysis/i })).toBeInTheDocument();
    expect(screen.getByText('Crude Protein (min)')).toBeInTheDocument();
    expect(screen.getByText('11.5%')).toHaveClass('tabular-numbers');
    expect(screen.getByText('5.2%')).toHaveClass('tabular-numbers');
    expect(screen.getByText('6.8%')).toHaveClass('tabular-numbers');
    expect(screen.getByText('1.8 : 1')).toHaveClass('tabular-numbers');
  });

  it('FeedingGuidanceCard renders species weight range and daily amount', () => {
    render(<FeedingGuidanceCard guidance={product.feedingGuidance} />);
    expect(screen.getByText(/avian feeding guidance & daily rations/i)).toBeInTheDocument();
    expect(screen.getByText('30–45g')).toBeInTheDocument();
    expect(screen.getByText('4–8g (1–2 teaspoons)')).toBeInTheDocument();
  });

  it('ReviewsSection renders verified customer reviews including Sarah Johnson, Marcus Vance, and Dr. Elena Lin', () => {
    render(
      <ReviewsSection
        reviews={product.reviews}
        ratingAvg={product.ratingAvg}
        ratingCount={product.ratingCount}
      />
    );
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();
    expect(screen.getByText('Dr. Elena Lin')).toBeInTheDocument();
    expect(screen.getAllByText(/verified caretaker/i).length).toBe(3);
  });
});
