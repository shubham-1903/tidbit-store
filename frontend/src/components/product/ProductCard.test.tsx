import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard, ProductCardProps } from './ProductCard';
import { useCartStore } from '@/store/cartStore';

describe('ProductCard component', () => {
  const defaultProps: ProductCardProps = {
    id: 'prod-1',
    slug: 'parakeet-budgerigar-daily-vitality',
    title: 'Tidbit Parakeet & Budgerigar Daily Vitality',
    subtitle: 'Whole-grain botanical vitality blend',
    species: 'budgerigar',
    speciesLabel: 'Parakeet & Budgie',
    badge: 'Advanced Formula',
    ratingAvg: 4.9,
    ratingCount: 208,
    basePriceCents: 1299,
    compareAtPriceCents: 1899,
    specs: ['Digestive Seeds', 'Dust Free', '1 Kg Pack'],
    imageUrl: '/images/products/budgie-daily-vitality.png',
    defaultVariant: '1 kg',
  };

  beforeEach(() => {
    useCartStore.getState().clearCart();
    useCartStore.setState({ isOpen: false });
  });

  it('renders product card details, ratings, prices, and savings pill', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Tidbit Parakeet & Budgerigar Daily Vitality')).toBeInTheDocument();
    expect(screen.getByText('Advanced Formula')).toBeInTheDocument();
    expect(screen.getByText('Parakeet & Budgie')).toBeInTheDocument();
    expect(screen.getByText('4.9 (208)')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('$18.99')).toBeInTheDocument();
    expect(screen.getByText(/save 32%/i)).toBeInTheDocument();
  });

  it('clicking Add to Cart adds item to store and opens mini-cart preview', async () => {
    const user = userEvent.setup();
    render(<ProductCard {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('prod-1-1 kg');
    expect(state.items[0].price).toBe(1299);
    expect(state.isOpen).toBe(true);
    expect(screen.getByText(/added to cart!/i)).toBeInTheDocument();
  });

  it('applies Lovebird species color theme', () => {
    render(
      <ProductCard
        {...defaultProps}
        id="prod-2"
        slug="lovebird-mix"
        species="lovebird"
        speciesLabel="Lovebird & Cockatiel"
      />
    );
    const card = screen.getByTestId('product-card-lovebird-mix');
    expect(card).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /add to cart/i });
    expect(btn).toHaveClass('bg-species-lovebird-base');
  });

  it('applies Finch species color theme', () => {
    render(
      <ProductCard
        {...defaultProps}
        id="prod-3"
        slug="finch-mix"
        species="finch"
        speciesLabel="Finch & Canary"
      />
    );
    const card = screen.getByTestId('product-card-finch-mix');
    expect(card).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /add to cart/i });
    expect(btn).toHaveClass('bg-species-finch-base');
  });
});
