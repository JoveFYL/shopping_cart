import styles from './Card.module.css';

export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={styles.container}>
                <img src="https://via.placeholder.com/150" alt="Product Image" className={styles.image} />
                {children}
                <div className={styles.info}>
                    <h2 className={styles.title}>Product Title</h2>
                    <p className={styles.price}>$99.99</p>
                    <button className={styles.button}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}