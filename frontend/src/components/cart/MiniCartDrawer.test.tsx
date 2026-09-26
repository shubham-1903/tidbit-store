import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MiniCartDrawer } from './MiniCartDrawer';
import { useCartStore } from '@/store/cartStore';

describe('MiniCartDrawer component', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useCartStore.setState({ isOpen: false });
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<MiniCartDrawer />);
    expect(container.firstChild).toBeNull();
  });

  it('renders empty cart message when open with no items', () => {
    useCartStore.setState({ isOpen: true });
    render(<MiniCartDrawer />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('renders line items and free shipping progress when items exist', async () => {
    const user = userEvent.setup();
    useCartStore.getState().addItem({
      id: 'item-1',
      name: 'Tidbit Budgie Blend',
      price: 1299,
      quantity: 1,
      imageUrl: '/images/products/budgie-daily-vitality.png',
      species: 'budgerigar',
      variant: '1 kg',
    });

    render(<MiniCartDrawer />);
    expect(screen.getByText('Tidbit Budgie Blend')).toBeInTheDocument();
    expect(screen.getByText('$22.01')).toBeInTheDocument();
    expect(screen.getByText(/more for free shipping/i)).toBeInTheDocument();

    // Increment quantity
    const plusButton = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(plusButton);

    expect(screen.getAllByText('$25.98').length).toBeGreaterThanOrEqual(1);
  });

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup();
    useCartStore.setState({ isOpen: true });
    render(<MiniCartDrawer />);

    const closeBtn = screen.getByRole('button', { name: /close cart drawer/i });
    await user.click(closeBtn);

    expect(useCartStore.getState().isOpen).toBe(false);
  });
});
