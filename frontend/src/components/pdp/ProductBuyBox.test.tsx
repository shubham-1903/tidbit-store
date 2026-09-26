import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductBuyBox } from './ProductBuyBox';
import { CATALOG_PRODUCTS } from '@/lib/catalog';
import { useCartStore } from '@/store/cartStore';

describe('ProductBuyBox component', () => {
  const product = CATALOG_PRODUCTS[0]; // Budgerigar Daily Vitality

  beforeEach(() => {
    useCartStore.getState().clearCart();
    useCartStore.setState({ isOpen: false });
  });

  it('renders species badge, product title, and rating summary', () => {
    render(<ProductBuyBox product={product} />);
    expect(screen.getByText('Budgerigar Recipe')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: product.title })).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText(/208 caretaker reviews/i)).toBeInTheDocument();
  });

  it('renders default price block and savings pill', () => {
    render(<ProductBuyBox product={product} />);
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('$18.99')).toBeInTheDocument();
    expect(screen.getByText(/save \$6\.00/i)).toBeInTheDocument();
  });

  it('switches price and variant label when weight chips are clicked without reload', async () => {
    const user = userEvent.setup();
    render(<ProductBuyBox product={product} />);

    // Click 3kg variant chip
    const chip3kg = screen.getByRole('button', { name: /3 kg/i });
    await user.click(chip3kg);

    expect(screen.getByText('$32.99')).toBeInTheDocument();
    expect(screen.getByText('$44.99')).toBeInTheDocument();
    expect(screen.getByText(/save \$12\.00/i)).toBeInTheDocument();

    // Click 5kg variant chip
    const chip5kg = screen.getByRole('button', { name: /5 kg/i });
    await user.click(chip5kg);

    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByText('$69.99')).toBeInTheDocument();
  });

  it('operates quantity stepper and bounds checking', async () => {
    const user = userEvent.setup();
    render(<ProductBuyBox product={product} />);

    const plusBtn = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(plusBtn);

    // Quantity should now be 2, button text should show $25.98
    expect(screen.getByRole('button', { name: /add to bag.*25\.98/i })).toBeInTheDocument();

    const minusBtn = screen.getByRole('button', { name: /decrease quantity/i });
    await user.click(minusBtn);

    // Back to 1
    expect(screen.getByRole('button', { name: /add to bag.*12\.99/i })).toBeInTheDocument();
  });

  it('adds selected variant and quantity to cart store on Add to Bag click', async () => {
    const user = userEvent.setup();
    render(<ProductBuyBox product={product} />);

    // Select 3kg variant
    const chip3kg = screen.getByRole('button', { name: /3 kg/i });
    await user.click(chip3kg);

    // Increase quantity to 2
    const plusBtn = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(plusBtn);

    // Click Add to Bag
    const addBtn = screen.getByRole('button', { name: /add to bag/i });
    await user.click(addBtn);

    const cartState = useCartStore.getState();
    expect(cartState.items).toHaveLength(1);
    expect(cartState.items[0].name).toContain('3 kg');
    expect(cartState.items[0].quantity).toBe(2);
    expect(cartState.items[0].price).toBe(3299);
    expect(cartState.isOpen).toBe(true);
    expect(screen.getByText(/added to bag!/i)).toBeInTheDocument();
  });
});
