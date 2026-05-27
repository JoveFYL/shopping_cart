import { Link } from "react-router";
import { ShoppingCart, Search } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <>
            <div className={styles.header}>
                <Link to="/shop" className={styles.link}>
                    <h2>Shop</h2>
                </Link>
                <Link to="/home" className={styles.link}>
                    <h1>Emart</h1>
                </Link>
                <div className={styles.search_cart}>
                    <button type="button" className={styles.icon_button}>
                        <Search size={28} />
                    </button>
                    <div className={styles.cart_container}>
                        <Link to="/cart" className={`${styles.icon_button} ${styles.link}`}>
                            <ShoppingCart />
                        </Link>
                        <div className={styles.badge}>0</div>
                    </div>
                </div>
            </div>
        </>
    )
}