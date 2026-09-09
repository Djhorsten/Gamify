import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { Card } from "../../../components/ui/cards/Card/Card";
import styles from "./LoginPage.module.scss";

type Tab = "login" | "register";

export function LoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/account";

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={[styles.tab, tab === "login" ? styles.active : ""].join(" ")}
            onClick={() => setTab("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={[styles.tab, tab === "register" ? styles.active : ""].join(" ")}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        {tab === "login" ? (
          <LoginForm onSuccess={() => navigate(redirectTo)} />
        ) : (
          <RegisterForm onSuccess={() => navigate(redirectTo)} />
        )}
      </Card>
    </div>
  );
}
