import { Outlet } from "react-router-dom";
import Header from './components/Header';
import styles from './App.module.css';

function App() {

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
