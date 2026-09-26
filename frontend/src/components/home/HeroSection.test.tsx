import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection component', () => {
  it('renders the editorial headline in an h1 element', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/avian nutrition/i);
    expect(heading).toHaveTextContent(/precision-milled/i);
  });

  it('renders brand subcopy with avian wellness messaging', () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/natural seeds enriched with essential vitamins/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/pure nutrition for every feather/i)
    ).toBeInTheDocument();
  });

  it('renders primary CTA linking to the Budgerigar species lane', () => {
    render(<HeroSection />);
    const budgieLink = screen.getByRole('link', { name: /explore budgerigar lane/i });
    expect(budgieLink).toBeInTheDocument();
    expect(budgieLink).toHaveAttribute('href', '/budgerigar');
  });

  it('renders secondary CTA button for finding bird mix', () => {
    render(<HeroSection />);
    const mixLink = screen.getByRole('link', { name: /find your bird's mix/i });
    expect(mixLink).toBeInTheDocument();
  });

  it('renders hero image with descriptive alt text', () => {
    render(<HeroSection />);
    const image = screen.getByAltText(/budgerigar and a cockatiel/i);
    expect(image).toBeInTheDocument();
  });

  it('renders trust badges and floating badges', () => {
    render(<HeroSection />);
    expect(screen.getByText(/100% natural • avian veterinarian approved/i)).toBeInTheDocument();
    expect(screen.getByText(/\+35% feather gloss/i)).toBeInTheDocument();
    expect(screen.getByText(/triple-cleaned dust free/i)).toBeInTheDocument();
    expect(screen.getByText(/whole-grain/i)).toBeInTheDocument();
  });
});
