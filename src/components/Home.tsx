import styles from './Home.module.css';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

export default function Home() {
    const items = ["Item 1", "Item 2", "Item 3"];

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
                    <CarouselContent className={styles.carousel_content}>
                        {items.map((item, i) => (
                            <CarouselItem key={i} className={styles.carousel_item}>
                                <div>{item}</div>
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