import Card from './Card';
import styles from './Home.module.css';
import useProducts from '../hooks/useProducts';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

export default function Home() {
    const { products, loading, error } = useProducts();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.text_section}>
                    <h1>Welcome to Emart, your one-stop shop for all your shopping needs!</h1>
                    <p>Discover a wide range of products, from electronics to fashion, all at unbeatable prices. Start shopping now and experience the convenience of Emart!</p>
                </div>
                <Carousel className={styles.carousel} opts={{
                    align: "start",
                    loop: true,
                }}>
                    <CarouselContent className={`${styles.carousel_content} -ml-4`}>
                        {products.map((product, i) => (
                            <CarouselItem key={i} className={`${styles.carousel_item} pl-4 basis-full md:basis-1/2 lg:basis-1/3`}>
                                <Card product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    )
}