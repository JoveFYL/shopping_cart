import { NavLink, useViewTransitionState } from "react-router";
import { ShoppingCart, Search } from 'lucide-react';
import { type Product } from '../types/product';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { cart } = useCart();

    return (
        <>
            <div className={styles.header}>
                <NavLink to="/shop" viewTransition className={styles.link}>
                    <h2>Shop</h2>
                </NavLink>
                <NavLink to="/home" viewTransition className={styles.link}>
                    <h1>Emart</h1>
                </NavLink>
                <div className={styles.search_cart}>
                    <button type="button" className={styles.icon_button}>
                        <Search size={28} />
                    </button>
                    <div className={styles.cart_container}>
                        <NavLink to="/cart" viewTransition className={`${styles.icon_button} ${styles.link}`}>
                            <ShoppingCart />
                        </NavLink>
                        <div className={styles.badge}>{cart.reduce((total, item) => total + item.quantity, 0)}</div>
                    </div>
                </div>
            </div>
        </>
    )
}