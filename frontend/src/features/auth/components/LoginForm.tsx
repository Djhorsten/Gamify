import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/ui/forms/FormField/FormField";
import { Input } from "../../../components/ui/forms/Input/Input";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { ApiError } from "../../../api/client";
import { loginSchema } from "../types/schemas";
import type { LoginFormValues } from "../types/schemas";
import { useLoginMutation } from "../hooks/useLoginMutation";
import styles from "./AuthForms.module.scss";

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values, { onSuccess });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="Email" htmlFor="login-email" error={errors.email?.message}>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          hasError={!!errors.email}
          {...register("email")}
        />
      </FormField>
      <FormField label="Password" htmlFor="login-password" error={errors.password?.message}>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          hasError={!!errors.password}
          {...register("password")}
        />
      </FormField>

      {loginMutation.isError && (
        <p className={styles.formError} role="alert">
          {loginMutation.error instanceof ApiError
            ? loginMutation.error.message
            : "Login failed. Please try again."}
        </p>
      )}

      <Button type="submit" fullWidth disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Log in"}
      </Button>

      <p className={styles.hint}>Demo account: demo@example.com / demo1234</p>
    </form>
  );
}
