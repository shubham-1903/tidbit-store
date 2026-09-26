import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VetEndorsement } from './VetEndorsement';

describe('VetEndorsement component', () => {
  it('renders Dr. Elena Lin quote and credentials', () => {
    render(<VetEndorsement />);
    expect(screen.getByText(/resident avian clinician/i)).toBeInTheDocument();
    expect(screen.getByText(/seed quality isn't just about calories/i)).toBeInTheDocument();
    expect(screen.getByText('Dr. Elena Lin, DVM')).toBeInTheDocument();
    expect(
      screen.getByText(/board certified avian medicine specialist • tidbit head of nutrition/i)
    ).toBeInTheDocument();
  });

  it('renders clinician portrait with descriptive alt text', () => {
    render(<VetEndorsement />);
    const image = screen.getByAltText(/Dr. Elena Lin/i);
    expect(image).toBeInTheDocument();
  });

  it('renders consultation CTA button', () => {
    render(<VetEndorsement />);
    expect(
      screen.getByRole('button', { name: /ask our avian nutritionist/i })
    ).toBeInTheDocument();
  });
});
