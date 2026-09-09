import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import styles from "./Layout.module.scss";

export function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={`${styles.main} container`}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>This is a practice project, not a real webshop!</p>
      </footer>
    </div>
  );
}
