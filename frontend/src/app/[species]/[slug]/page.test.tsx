import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDetailPage from './page';

describe('ProductDetailPage', () => {
  it('renders PDP for Budgerigar Daily Vitality with all core sections', async () => {
    const pageComponent = await ProductDetailPage({
      params: Promise.resolve({
        species: 'budgerigar',
        slug: 'daily-vitality',
      }),
    });

    render(pageComponent);

    // Hero / Breadcrumbs / Buy Box
    expect(screen.getByRole('heading', { level: 1, name: /tidbit parakeet & budgerigar daily vitality/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();

    // Freshness Window
    expect(screen.getByTestId('freshness-window')).toBeInTheDocument();
    expect(screen.getByText('Sep 14, 2026')).toBeInTheDocument();

    // Guaranteed Analysis
    expect(screen.getByTestId('guaranteed-analysis-card')).toBeInTheDocument();
    expect(screen.getByText('11.5%')).toBeInTheDocument();

    // Ingredients
    expect(screen.getByTestId('ingredients-section')).toBeInTheDocument();
    expect(screen.getAllByText('Canary Grass Seed').length).toBeGreaterThanOrEqual(1);

    // Feeding Guidance
    expect(screen.getByTestId('feeding-guidance-card')).toBeInTheDocument();
    expect(screen.getByText('30–45g')).toBeInTheDocument();

    // Customer Reviews
    expect(screen.getByRole('heading', { name: /loved by avian caretakers/i })).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();
    expect(screen.getByText('Dr. Elena Lin')).toBeInTheDocument();

    // Related Products
    expect(screen.getByRole('heading', { name: /more in the budgerigar lane/i })).toBeInTheDocument();
  });
});
