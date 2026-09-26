import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NutritionalAnalysisTable } from './NutritionalAnalysisTable';

describe('NutritionalAnalysisTable component', () => {
  it('renders section headline and trust feature cards', () => {
    render(<NutritionalAnalysisTable />);
    expect(screen.getByRole('heading', { name: /why avian caretakers trust tidbit/i })).toBeInTheDocument();
    expect(screen.getByText('Complete Amino Acids')).toBeInTheDocument();
    expect(screen.getByText('Calcium & Vitamin D3')).toBeInTheDocument();
    expect(screen.getByText('Triple Cleaned Seeds')).toBeInTheDocument();
    expect(screen.getByText('Clear Freshness Window')).toBeInTheDocument();
  });

  it('renders table columns for all 3 species lanes', () => {
    render(<NutritionalAnalysisTable />);
    expect(screen.getByRole('columnheader', { name: /budgerigar daily vitality/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /lovebird & cockatiel mix/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /finch & canary formula/i })).toBeInTheDocument();
  });

  it('renders all canonical nutrient rows with tabular figures', () => {
    render(<NutritionalAnalysisTable />);
    expect(screen.getByRole('rowheader', { name: /crude protein \(min\)/i })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: /crude fat \(min\)/i })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: /crude fiber \(max\)/i })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: /calcium \/ phosphorus ratio/i })).toBeInTheDocument();

    // Verify cell content
    expect(screen.getByText('11.5%')).toHaveClass('tabular-numbers');
    expect(screen.getByText('14.2%')).toHaveClass('tabular-numbers');
    expect(screen.getByText('13.8%')).toHaveClass('tabular-numbers');
    expect(screen.getByText('1.8 : 1')).toHaveClass('tabular-numbers');
  });
});
