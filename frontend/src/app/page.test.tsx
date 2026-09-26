import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders skip link for accessibility', () => {
    render(<HomePage />);
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders announcement bar and header navigation', () => {
    render(<HomePage />);
    expect(screen.getByText(/spring avian wellness sale/i)).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('renders editorial hero headline in h1 and species in h2', () => {
    render(<HomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/avian nutrition/i);
    expect(h1).toHaveTextContent(/precision-milled/i);

    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.some((h) => h.textContent?.includes('Tailored by Species'))).toBe(true);
    expect(h2s.some((h) => h.textContent?.includes('Fresh Batches Ready to Ship'))).toBe(true);
    expect(h2s.some((h) => h.textContent?.includes('Why Avian Caretakers Trust Tidbit'))).toBe(true);
  });

  it('renders 3 core POC formulas in the product grid', () => {
    render(<HomePage />);
    expect(screen.getByText('Tidbit Parakeet & Budgerigar Daily Vitality')).toBeInTheDocument();
    expect(screen.getByText('Tidbit Premium Lovebird & Cockatiel Seed Mix')).toBeInTheDocument();
    expect(screen.getByText('Tidbit Goldfinch / French & Canary Seed Formula')).toBeInTheDocument();
  });

  it('renders the cross-species nutritional comparison table', () => {
    render(<HomePage />);
    expect(screen.getByText('Guaranteed Nutritional Analysis Across Blends')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /budgerigar daily vitality/i })).toBeInTheDocument();
    expect(screen.getByText('11.5%')).toBeInTheDocument();
  });

  it('renders the resident avian clinician endorsement', () => {
    render(<HomePage />);
    expect(screen.getByText('Dr. Elena Lin, DVM')).toBeInTheDocument();
    expect(screen.getByText(/seed quality isn't just about calories/i)).toBeInTheDocument();
  });
});
