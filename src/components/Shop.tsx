import styles from './Shop.module.css';
import { useLoaderData } from 'react-router';
import { type Product } from '../types/product';
import Card from './Card';

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
    }

    const allProducts: Product[] = await response.json();
    const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(q.toLowerCase()));
    return { products: filteredProducts };
}

export default function Shop() {
    const { products } = useLoaderData<{ products: Product[] }>();
    return (
        <>
            <div className={styles.container}>
                {products.map((product, index) => (
                    <Card product={product} key={product.id} index={index} />
                ))}
            </div>
        </>
    )
}