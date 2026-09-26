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

    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(/tailored by species/i);
  });

  it('contains the Budgerigar species card with link to /budgerigar', () => {
    render(<HomePage />);
    const budgieCard = screen.getByTestId('species-card-budgerigar');
    expect(budgieCard).toBeInTheDocument();
    const link = budgieCard.querySelector('a');
    expect(link).toHaveAttribute('href', '/budgerigar');
  });
});
