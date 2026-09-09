import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import { useCart } from "../../features/cart/context/CartContext";
import { Button } from "../ui/buttons/Button/Button";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { totalQuantity } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function linkClass({ isActive }: { isActive: boolean }) {
    return [styles.navLink, isActive ? styles.active : ""].filter(Boolean).join(" ");
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          Gamify
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={[styles.nav, menuOpen ? styles.navOpen : ""].join(" ")}>
          <NavLink to="/products" className={linkClass} onClick={() => setMenuOpen(false)}>
            Products
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/orders" className={linkClass} onClick={() => setMenuOpen(false)}>
                Orders
              </NavLink>
              <NavLink to="/account" className={linkClass} onClick={() => setMenuOpen(false)}>
                Account
              </NavLink>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
              Log in
            </NavLink>
          )}
          <NavLink to="/cart" className={styles.cartLink} onClick={() => setMenuOpen(false)}>
            Cart
            {totalQuantity > 0 && <span className={styles.cartBadge}>{totalQuantity}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
