import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

vi.mock(import('../context/CartContext'));

const mockUseCart = vi.mocked(useCart);

const mockItem = {
    product: {
        id: 1,
        title: 'Test Product',
        price: 9.99,
        description: 'A product for testing',
        category: 'test',
        image: 'test.jpg',
    },
    quantity: 2,
};

describe('Cart component', () => {
    it('shows "Your cart is empty." when cart is empty', () => {
        mockUseCart.mockReturnValue({
            cart: [],
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            isDrawerOpen: true,
            setIsDrawerOpen: vi.fn()
        })

        render(<Cart />);
        expect(screen.getByText(/Your cart is empty./i)).toBeInTheDocument();
    });

    it('renders items and running total when cart has items', () => {
        mockUseCart.mockReturnValue({
            cart: [mockItem],
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            isDrawerOpen: true,
            setIsDrawerOpen: vi.fn()
        })

        render(<Cart />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$19.98')).toBeInTheDocument();
    })

    it('calculates total correctly (price × quantity summed)', () => {
        const items = [
            {
                product: {
                    id: 1,
                    title: 'Test Product',
                    price: 10.00,
                    description: 'A product for testing',
                    category: 'test',
                    image: 'test.jpg',
                }, quantity: 3
            },
            {
                product: {
                    id: 2,
                    title: 'Another Product',
                    price: 5.00,
                    description: 'Another product for testing',
                    category: 'test',
                    image: 'test2.jpg',
                }, quantity: 2
            },
        ];

        mockUseCart.mockReturnValue({
            cart: items,
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            isDrawerOpen: true,
            setIsDrawerOpen: vi.fn()
        });
        render(<Cart />);
        expect(screen.getByText('$40.00')).toBeInTheDocument();
    });
});