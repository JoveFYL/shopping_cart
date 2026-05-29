import { createContext, useState, useContext, type ReactNode } from 'react';
import { type Product } from '../types/product';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface ShopContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
}

export const CartContext = createContext<ShopContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    function addToCart(product: Product) {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id)
            if (existing) {
                return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                return [...prev, { product, quantity: 1 }]
            }
        });
    }

    function removeFromCart(product: Product) {
        setCart(prev => prev.filter(item => item.product.id !== product.id));
    }

    return (
        <CartContext value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}