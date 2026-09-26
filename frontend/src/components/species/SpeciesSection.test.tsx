import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpeciesSection } from './SpeciesSection';

describe('SpeciesSection component', () => {
  it('renders section title in an h2 element with category tag', () => {
    render(<SpeciesSection />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/tailored by species/i);
    expect(screen.getByText(/species specialization/i)).toBeInTheDocument();
  });

  it('renders all three canonical species cards', () => {
    render(<SpeciesSection />);
    expect(screen.getByTestId('species-card-budgerigar')).toBeInTheDocument();
    expect(screen.getByTestId('species-card-lovebird')).toBeInTheDocument();
    expect(screen.getByTestId('species-card-finch')).toBeInTheDocument();
  });

  it('provides a navigation link for Budgerigar lane to /budgerigar', () => {
    render(<SpeciesSection />);
    const budgieCard = screen.getByTestId('species-card-budgerigar');
    const budgieLink = budgieCard.querySelector('a');
    expect(budgieLink).toHaveAttribute('href', '/budgerigar');
  });
});
