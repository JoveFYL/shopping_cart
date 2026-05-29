import { type CartItem } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import styles from './CartCard.module.css';

export default function CartCard({ item }: { item: CartItem }) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className={styles.card}>
            <img src={item.product.image} alt={item.product.title} className={styles.image} />
            <div className={styles.details}>
                <p className={styles.title}>{item.product.title}</p>
                <p className={styles.price}>${item.product.price.toFixed(2)}</p>
                <div className={styles.quantity}>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.product.id, -1)}>−</button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                </div>
            </div>
            <button className={styles.removeBtn} onClick={() => removeFromCart(item.product)} aria-label="Remove item">✕</button>
        </div>
    );
}
