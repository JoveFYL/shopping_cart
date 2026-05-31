import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useCart } from '../context/CartContext';
import Header from './Header';

vi.mock('../context/CartContext');

describe('Header', () => {
    it('badge shows correct total item count', () => {
        vi.mocked(useCart).mockReturnValue({
            cart: [
                {
                    product: {
                        id: 1,
                        title: 'Test Product 1',
                        price: 9.99,
                        description: 'A product for testing',
                        category: 'test',
                        image: 'test1.jpg',
                    },
                    quantity: 3
                },
                {
                    product: {
                        id: 2,
                        title: 'Test Product 2',
                        price: 19.99,
                        description: 'A product for testing',
                        category: 'test',
                        image: 'test2.jpg',
                    },
                    quantity: 2
                },
            ],
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            isDrawerOpen: true,
            setIsDrawerOpen: vi.fn()
        });

        const router = createMemoryRouter([
            { path: '/', element: <Header /> }
        ], {
            initialEntries: ['/']
        });

        render(<RouterProvider router={router} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });
});
