import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductGrid } from './ProductGrid';

describe('ProductGrid component', () => {
  it('renders all 3 core POC formulas by default', () => {
    render(<ProductGrid />);
    expect(screen.getByText('Tidbit Parakeet & Budgerigar Daily Vitality')).toBeInTheDocument();
    expect(screen.getByText('Tidbit Premium Lovebird & Cockatiel Seed Mix')).toBeInTheDocument();
    expect(screen.getByText('Tidbit Goldfinch / French & Canary Seed Formula')).toBeInTheDocument();
  });

  it('filters products by species when filter chips are clicked', async () => {
    const user = userEvent.setup();
    render(<ProductGrid />);

    // Filter to Budgerigars
    const budgieChip = screen.getByRole('button', { name: 'Budgerigars' });
    await user.click(budgieChip);

    expect(screen.getByText('Tidbit Parakeet & Budgerigar Daily Vitality')).toBeInTheDocument();
    expect(screen.queryByText('Tidbit Premium Lovebird & Cockatiel Seed Mix')).not.toBeInTheDocument();
    expect(screen.queryByText('Tidbit Goldfinch / French & Canary Seed Formula')).not.toBeInTheDocument();

    // Filter back to All Species
    const allChip = screen.getByRole('button', { name: 'All Species' });
    await user.click(allChip);

    expect(screen.getByText('Tidbit Parakeet & Budgerigar Daily Vitality')).toBeInTheDocument();
    expect(screen.getByText('Tidbit Premium Lovebird & Cockatiel Seed Mix')).toBeInTheDocument();
    expect(screen.getByText('Tidbit Goldfinch / French & Canary Seed Formula')).toBeInTheDocument();
  });
});
