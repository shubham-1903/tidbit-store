import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpeciesCard, SpeciesCardProps } from './SpeciesCard';

describe('SpeciesCard component', () => {
  const defaultProps: SpeciesCardProps = {
    slug: 'budgerigar',
    badge: 'Active & Vitality',
    name: 'Budgerigar Balanced Blend',
    subtitle: '1.0 Kg Stand-Up Eco Kraft Pouch',
    imageSrc: '/images/species/budgerigar-pouch.png',
    imageAlt: 'Tidbit Budgerigar Blend Stand-Up Eco Kraft Pouch',
    features: [
      'Canary seeds & Australian golden millet',
      'Micro gastric grit for smooth digestion',
      'Enriched with Spirulina algae minerals',
    ],
    ctaText: 'Explore Budgie Blend',
    href: '/budgerigar',
  };

  it('renders species card content and badges accurately', () => {
    render(<SpeciesCard {...defaultProps} />);
    expect(screen.getByText('Budgerigar Balanced Blend')).toBeInTheDocument();
    expect(screen.getByText('Active & Vitality')).toBeInTheDocument();
    expect(screen.getByText('1.0 Kg Stand-Up Eco Kraft Pouch')).toBeInTheDocument();
    expect(screen.getByAltText(defaultProps.imageAlt)).toBeInTheDocument();
  });

  it('renders all bullet features with check icons', () => {
    render(<SpeciesCard {...defaultProps} />);
    for (const feature of defaultProps.features) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });

  it('links to the specified species path', () => {
    render(<SpeciesCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/budgerigar');
  });

  it('applies Budgerigar species lane color tokens', () => {
    render(<SpeciesCard {...defaultProps} slug="budgerigar" />);
    const card = screen.getByTestId('species-card-budgerigar');
    expect(card).toHaveClass('hover:shadow-level2');
    expect(card).toHaveClass('hover:scale-[1.02]');
  });

  it('applies Lovebird species lane color tokens', () => {
    render(<SpeciesCard {...defaultProps} slug="lovebird" badge="Bestseller" name="Lovebird Mix" />);
    const card = screen.getByTestId('species-card-lovebird');
    expect(card).toBeInTheDocument();
  });

  it('applies Finch species lane color tokens', () => {
    render(<SpeciesCard {...defaultProps} slug="finch" badge="Micro-Seed" name="Finch Mix" />);
    const card = screen.getByTestId('species-card-finch');
    expect(card).toBeInTheDocument();
  });
});
