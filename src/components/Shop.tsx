import styles from './Shop.module.css';
import useProducts from '../hooks/useProducts';
import Card from './Card';

export default function Shop() {
    const { products } = useProducts();
    return (
        <>
            <div className={styles.container}>
                {
                    products.map((product, index) => {
                        return <Card product={product} key={product.id} index={index} />
                    })
                }
            </div>
        </>
    )
}