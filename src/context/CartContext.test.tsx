import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { toHaveTextContent } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import type { Product } from '../types/product';

const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 9.99,
    image: 'test.jpg',
}

function TestComponent() {
    const { cart, addToCart, removeFromCart } = useCart();
    return (
        <div>
            <span data-testid="count">{cart.length}</span>
            <span data-testid="quantity">{cart[0]?.quantity ?? 0}</span>
            <button onClick={() => addToCart(mockProduct)}>Add to Cart</button>
            <button onClick={() => removeFromCart(mockProduct)}>Remove from Cart</button>
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

// describe('remove from cart', () => {
//     it('removes a product from the cart', async () => {
//         const user = userEvent.setup();
//         render(<CartProvider><TestComponent /></CartProvider>);
//         const addButton = screen.getByText(/Add to Cart/i);
//         await user.click(addButton);

//     })
// });

// describe('useCart', () => {
//     it('throws if used outside CartProvider', () => {

//     });
// });