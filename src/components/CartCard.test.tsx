import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCart } from '../context/CartContext';
import CartCard from './CartCard';
import type { CartItem } from '../context/CartContext';

vi.mock(import('../context/CartContext'));

const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();

const mockItem: CartItem = {
    product: {
        id: 1,
        title: 'Test Product',
        price: 9.99,
        description: 'A product for testing',
        category: 'test',
        image: 'test.jpg',
    },
    quantity: 3,
}

beforeEach(() => {
    vi.mocked(useCart).mockReturnValue({
        updateQuantity: mockUpdateQuantity,
        removeFromCart: mockRemoveFromCart,
        cart: [],
        addToCart: vi.fn(),
        isDrawerOpen: true,
        setIsDrawerOpen: vi.fn()
    });
});

describe('CartCard', () => {
    it('renders title, price, and quantity', () => {
        render(<CartCard item={mockItem} />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$9.99')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('+ button calls updateQuantity with +1', async () => {
        const user = userEvent.setup();
        render(<CartCard item={mockItem} />);
        await user.click(screen.getByText('+'));
        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
    });

    it('− button calls updateQuantity with -1', async () => {
        const user = userEvent.setup();
        render(<CartCard item={mockItem} />);
        await user.click(screen.getByText('−'));
        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, -1);
    });

    it('✕ button calls removeFromCart', async () => {
        const user = userEvent.setup();
        render(<CartCard item={mockItem} />);
        await user.click(screen.getByRole('button', { name: /remove item/i }));
        expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItem.product);
    });
});