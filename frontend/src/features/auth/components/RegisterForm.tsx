import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/ui/forms/FormField/FormField";
import { Input } from "../../../components/ui/forms/Input/Input";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { ApiError } from "../../../api/client";
import { registerSchema } from "../types/schemas";
import type { RegisterFormValues } from "../types/schemas";
import { useRegisterMutation } from "../hooks/useRegisterMutation";
import styles from "./AuthForms.module.scss";

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const registerMutation = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  function onSubmit(values: RegisterFormValues) {
    registerMutation.mutate(values, { onSuccess });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="Name" htmlFor="register-name" error={errors.name?.message}>
        <Input id="register-name" autoComplete="name" hasError={!!errors.name} {...register("name")} />
      </FormField>
      <FormField label="Email" htmlFor="register-email" error={errors.email?.message}>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          hasError={!!errors.email}
          {...register("email")}
        />
      </FormField>
      <FormField label="Password" htmlFor="register-password" error={errors.password?.message}>
        <Input
          id="register-password"
          type="password"
          autoComplete="new-password"
          hasError={!!errors.password}
          {...register("password")}
        />
      </FormField>
      <FormField
        label="Confirm password"
        htmlFor="register-confirm-password"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="register-confirm-password"
          type="password"
          autoComplete="new-password"
          hasError={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </FormField>

      {registerMutation.isError && (
        <p className={styles.formError} role="alert">
          {registerMutation.error instanceof ApiError
            ? registerMutation.error.message
            : "Registration failed. Please try again."}
        </p>
      )}

      <Button type="submit" fullWidth disabled={registerMutation.isPending}>
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
