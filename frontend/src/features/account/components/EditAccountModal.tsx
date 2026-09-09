import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../components/ui/modals/Modal/Modal";
import { FormField } from "../../../components/ui/forms/FormField/FormField";
import { Input } from "../../../components/ui/forms/Input/Input";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { ApiError } from "../../../api/client";
import type { User } from "../types/user";
import { accountFormSchema } from "../types/schemas";
import type { AccountFormValues } from "../types/schemas";
import { useUpdateAccountMutation } from "../hooks/useUpdateAccountMutation";
import styles from "./EditAccountModal.module.scss";

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function EditAccountModal({ isOpen, onClose, user }: EditAccountModalProps) {
  const updateAccount = useUpdateAccountMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    values: {
      name: user.name,
      email: user.email,
      address: user.address ?? "",
      postalCode: user.postalCode ?? "",
      city: user.city ?? "",
    },
  });

  function onSubmit(values: AccountFormValues) {
    updateAccount.mutate(values, { onSuccess: onClose });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit account details"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="edit-account-form" disabled={updateAccount.isPending}>
            {updateAccount.isPending ? "Saving..." : "Save"}
          </Button>
        </>
      }
    >
      <form id="edit-account-form" className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField label="Name" htmlFor="account-name" error={errors.name?.message}>
          <Input id="account-name" hasError={!!errors.name} {...register("name")} />
        </FormField>
        <FormField label="Email" htmlFor="account-email" error={errors.email?.message}>
          <Input id="account-email" type="email" hasError={!!errors.email} {...register("email")} />
        </FormField>
        <FormField label="Address" htmlFor="account-address" error={errors.address?.message}>
          <Input id="account-address" hasError={!!errors.address} {...register("address")} />
        </FormField>
        <FormField
          label="Postal code"
          htmlFor="account-postal-code"
          error={errors.postalCode?.message}
        >
          <Input
            id="account-postal-code"
            hasError={!!errors.postalCode}
            {...register("postalCode")}
          />
        </FormField>
        <FormField label="City" htmlFor="account-city" error={errors.city?.message}>
          <Input id="account-city" hasError={!!errors.city} {...register("city")} />
        </FormField>

        {updateAccount.isError && (
          <p role="alert">
            {updateAccount.error instanceof ApiError
              ? updateAccount.error.message
              : "Saving failed. Please try again."}
          </p>
        )}
      </form>
    </Modal>
  );
}
