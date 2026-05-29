import { Outlet } from "react-router-dom";
import Header from './components/Header';
import styles from './App.module.css';
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <CartProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
        <CartDrawer />
      </div>
    </CartProvider>
  )
}

export default App
