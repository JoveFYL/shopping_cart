import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { cart, updateQuantity, isDrawerOpen, setIsDrawerOpen } = useCart();

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetContent side="right" className={styles.sheet}>
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>

                <div className={styles.items}>
                    {cart.length === 0
                        ? <p className={styles.empty}>Your cart is empty.</p>
                        : cart.map((item) => (
                            <div key={item.product.id} className={styles.item}>
                                <img
                                    src={item.product.image}
                                    alt={item.product.title}
                                    className={styles.image}
                                />
                                <div className={styles.details}>
                                    <p className={styles.title}>{item.product.title}</p>
                                    <p className={styles.price}>${item.product.price.toFixed(2)}</p>
                                    <div className={styles.quantity}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.product.id, -1)}
                                        >−</button>
                                        <span className={styles.qtyValue}>{item.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.product.id, 1)}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className={styles.checkout}>Go to Checkout</button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
