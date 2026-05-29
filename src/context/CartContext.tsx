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
    updateQuantity: (productId: number, delta: number) => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
}

export const CartContext = createContext<ShopContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    function addToCart(product: Product) {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id)
            if (existing) {
                return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                return [...prev, { product, quantity: 1 }]
            }
        });

        setIsDrawerOpen(true);
    }

    function removeFromCart(product: Product) {
        setCart(prev => prev.filter(item => item.product.id !== product.id));
    }

    function updateQuantity(productId: number, delta: number) {
        setCart(prev => prev.flatMap(item => {
            if (item.product.id !== productId) return [item];
            const next = item.quantity + delta;
            return next <= 0 ? [] : [{ ...item, quantity: next }];
        }));
    }

    return (
        <CartContext value={{ cart, addToCart, removeFromCart, updateQuantity, isDrawerOpen, setIsDrawerOpen }}>
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