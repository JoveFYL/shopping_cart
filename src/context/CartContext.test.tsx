import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import userEvent from '@testing-library/user-event';
import type { Product } from '../types/product';

const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 9.99,
    description: 'A product for testing',
    category: 'test',
    image: 'test.jpg',
}

function TestComponent() {
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
    return (
        <div>
            <span data-testid="count">{cart.length}</span>
            <span data-testid="quantity">{cart[0]?.quantity ?? 0}</span>
            <button onClick={() => addToCart(mockProduct)}>Add to Cart</button>
            <button onClick={() => removeFromCart(mockProduct)}>Remove from Cart</button>
            <button onClick={() => updateQuantity(mockProduct.id, 1)}>Increment Quantity</button>
            <button onClick={() => updateQuantity(mockProduct.id, -1)}>Decrement Quantity</button>
        </div>
    )
}

describe('add to cart', () => {
    it('adds a product to the cart', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);
        const addButton = screen.getByText(/Add to Cart/i);
        await user.click(addButton);

        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByTestId('quantity')).toHaveTextContent('1');

    })
    it('increments quantity if product already in cart', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);
        const addButton = screen.getByText(/Add to Cart/i);
        await user.click(addButton);
        await user.click(addButton);
        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByTestId('quantity')).toHaveTextContent('2');
    })
});

describe('remove from cart', () => {
    it('removes a product from the cart', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);
        const addButton = screen.getByText(/Add to Cart/i);
        await user.click(addButton);

        const checkoutButton = screen.getByText(/Remove from Cart/i);
        await user.click(checkoutButton);

        expect(screen.getByTestId('count')).toHaveTextContent('0');
        expect(screen.getByTestId('quantity')).toHaveTextContent('0');

    })
});

describe('useCart', () => {
    it('throws if used outside CartProvider', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });
        function BrokenComponent() {
            useCart();
            return null;
        }

        expect(() => render(<BrokenComponent />)).toThrow('useCart must be used within a CartProvider');
        spy.mockRestore();
    });
});

describe('updateQuantity', () => {
    it('increments quantity', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);
        const addButton = screen.getByRole('button', { name: /Increment Quantity/i });
        await user.click(screen.getByText(/Add to Cart/i));
        await user.click(addButton);
        expect(screen.getByTestId('quantity')).toHaveTextContent('2');
    })

    it('decrements quantity', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);
        await user.click(screen.getByText(/Add to Cart/i));
        await user.click(screen.getByRole('button', { name: /Increment Quantity/i }));
        await user.click(screen.getByRole('button', { name: /Decrement Quantity/i }));
        expect(screen.getByTestId('quantity')).toHaveTextContent('1');
    })

    it('removes item when quantity hits 0', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);
        await user.click(screen.getByText(/Add to Cart/i));
        await user.click(screen.getByRole('button', { name: /Decrement Quantity/i }));
        expect(screen.getByTestId('count')).toHaveTextContent('0');
    })
});