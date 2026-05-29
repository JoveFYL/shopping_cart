import { Outlet } from "react-router-dom";
import Header from './components/Header';
import styles from './App.module.css';
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </CartProvider>
  )
}

export default App
