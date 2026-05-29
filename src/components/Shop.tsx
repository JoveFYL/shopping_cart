import styles from './Shop.module.css';
import useProducts from '../hooks/useProducts';
import Card from './Card';

export default function Shop() {
    const { products, loading, error } = useProducts();
    return (
        <>
            <div className={styles.container}>
                {
                    products.map(product => {
                        return <Card product={product} key={product.id} />
                    })
                }
            </div>
        </>
    )
}