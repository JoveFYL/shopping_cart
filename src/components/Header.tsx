import { ShoppingCart, Search } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <>
            <div className={styles.header}>
                <h2>Shop</h2>
                <h1>Emart</h1>
                <div className={styles.search_cart}>
                    <button type="button" className={styles.icon_button}>
                        <Search size={28} />
                    </button>
                    <div className={styles.cart_container}>
                        <button type="button" className={styles.icon_button}>
                            <ShoppingCart />
                        </button>
                        <div className={styles.badge}>0</div>
                    </div>
                </div>
            </div>
        </>
    )
}