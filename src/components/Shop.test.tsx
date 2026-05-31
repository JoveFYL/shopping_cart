import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { loader, default as Shop } from './Shop';
import { CartProvider, useCart } from '../context/CartContext';

vi.mock('../context/CartContext', async (importOriginal) => ({
    ...(await importOriginal()),
    useCart: vi.fn(),
}));

const mockUseCart = vi.mocked(useCart);

describe('Shop loader', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('filters products based on q param', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => [
                { id: 1, title: 'Red Shoes' },
                { id: 2, title: 'Blue Hat' },
            ],
        } as Response);

        const request = new Request('http://localhost/shop?q=shoes');
        const result = await loader({ request });
        expect(result.products).toHaveLength(1);
        expect(result.products[0].title).toBe('Red Shoes');
    })

    it('returns all products if q param is empty', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => [
                { id: 1, title: 'Red Shoes' },
                { id: 2, title: 'Blue Hat' },
            ],
        } as Response);

        const request = new Request('http://localhost/shop?q=');
        const result = await loader({ request });
        expect(result.products).toHaveLength(2);
    })

    it('throws error when API returns non-ok response', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 500
        } as Response);
        const request = new Request('http://localhost/shop');
        await expect(loader({ request })).rejects.toThrow('HTTP error: Status 500');
    });

});

describe('Shop component', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
        mockUseCart.mockReturnValue({
            cart: [],
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            isDrawerOpen: false,
            setIsDrawerOpen: vi.fn()
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('renders Card for each product', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => [
                { id: 1, title: 'Red Shoes' },
                { id: 2, title: 'Blue Hat' },
            ],
        } as Response);

        const routes = [{ path: '/shop', element: <Shop />, loader }];
        const router = createMemoryRouter(routes, {
            initialEntries: ['/shop'],
        });
        render(<CartProvider><RouterProvider router={router} /></CartProvider>);
        expect(await screen.findByText('Red Shoes')).toBeInTheDocument();
        expect(await screen.findByText('Blue Hat')).toBeInTheDocument();

        const addToCartButtons = await screen.findAllByRole('button', { name: /add to cart/i });
        expect(addToCartButtons).toHaveLength(2);
    });

    it('shows "No products found." when list is empty', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => [],
        } as Response);

        const routes = [{ path: '/shop', element: <Shop />, loader }];
        const router = createMemoryRouter(routes, {
            initialEntries: ['/shop'],
        });
        render(<CartProvider><RouterProvider router={router} /></CartProvider>);
        expect(await screen.findByText('No products found.')).toBeInTheDocument();
    });

})
