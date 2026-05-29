import { type Product } from '../types/product';
import styles from './Card.module.css';

export default function Card({ product }: { product: Product }) {
    return (
        <>
            <div className={styles.container}>
                <img src={product.image} alt="Product Image" className={styles.image} />
                <div className={styles.info}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <p className={styles.price}>${product.price}</p>
                    <button className={styles.button}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}