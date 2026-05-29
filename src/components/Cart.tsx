import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

export default function Cart() {
    const { cart } = useCart();
    return (
        <>
            <div className={styles.container}>
                <h1>Cart</h1>
                <ul>
                    {cart.map((item) => (
                        <li key={item.product.id}>
                            <span>{item.product.title}</span>
                            <span>${item.product.price.toFixed(2)}</span>
                            <span>Quantity: {item.quantity}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}