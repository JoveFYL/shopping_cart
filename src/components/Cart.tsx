import { useCart } from '../context/CartContext';
import CartCard from './CartCard';
import styles from './Cart.module.css';

export default function Cart() {
    const { cart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className={styles.container}>
            <h1>Cart</h1>
            <div className={styles.items}>
                {cart.length === 0
                    ? <p>Your cart is empty.</p>
                    : <>
                        {cart.map((item) => <CartCard key={item.product.id} item={item} />)}
                    </>
                }
            </div>
            {cart.length != 0 && <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>}
        </div>
    );
}