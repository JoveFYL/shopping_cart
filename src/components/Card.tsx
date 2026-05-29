import { type Product } from '../types/product';
import { useCart } from '../context/CartContext';
import styles from './Card.module.css';

export default function Card({ product, index = 0 }: { product: Product; index?: number }) {
    const { addToCart } = useCart();

    return (
        <>
            <div className={styles.container} style={{ animationDelay: `${index * 0.05}s` }}>
                <img src={product.image} alt="Product Image" className={styles.image} />
                <div className={styles.info}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <p className={styles.price}>${product.price}</p>
                    <button className={styles.button} onClick={() => addToCart(product)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    )
}