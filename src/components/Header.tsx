import { NavLink, Form, useLocation } from "react-router";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { cart } = useCart();
    const location = useLocation();

    return (
        <>
            <div className={styles.header}>
                <NavLink to="/shop" viewTransition className={styles.link}>
                    <h2 className={styles.shop}>Shop</h2>
                </NavLink>
                <NavLink to="/home" viewTransition className={styles.link}>
                    <h1 className={styles.title}>Emart</h1>
                </NavLink>
                <div className={styles.search_cart}>
                    <Form key={location.pathname} id="search-form" viewTransition method="get" action="/shop" role="search" className={styles.search}>
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search Items..."
                            type="search"
                            name="q"
                            className={styles.input}
                        />
                    </Form>
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