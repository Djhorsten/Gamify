import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../cart/context/CartContext";
import { useAccountQuery } from "../../account/hooks/useAccountQuery";
import { useCreateOrderMutation } from "../../orders/hooks/useCreateOrderMutation";
import { checkoutSchema } from "../types/schemas";
import type { CheckoutFormValues } from "../types/schemas";
import { PageHeader } from "../../../components/ui/navigation/PageHeader/PageHeader";
import { FormField } from "../../../components/ui/forms/FormField/FormField";
import { Input } from "../../../components/ui/forms/Input/Input";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { Price } from "../../../components/ui/display/Price/Price";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import { ApiError } from "../../../api/client";
import styles from "./CheckoutPage.module.scss";

export function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const { data: account } = useAccountQuery();
  const createOrder = useCreateOrderMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    values: account
      ? {
          name: account.name,
          email: account.email,
          address: account.address ?? "",
          postalCode: account.postalCode ?? "",
          city: account.city ?? "",
        }
      : undefined,
  });

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add products before you can check out."
        action={<Link to="/products">Browse products</Link>}
      />
    );
  }

  function onSubmit(values: CheckoutFormValues) {
    createOrder.mutate(
      {
        ...values,
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      },
      {
        onSuccess: (order) => {
          clear();
          navigate(`/orders/${order.id}`);
        },
      }
    );
  }

  return (
    <div>
      <PageHeader title="Checkout" description="Enter your details to place the order." />

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField label="Name" htmlFor="checkout-name" error={errors.name?.message}>
            <Input id="checkout-name" hasError={!!errors.name} {...register("name")} />
          </FormField>
          <FormField label="Email" htmlFor="checkout-email" error={errors.email?.message}>
            <Input
              id="checkout-email"
              type="email"
              hasError={!!errors.email}
              {...register("email")}
            />
          </FormField>
          <FormField label="Address" htmlFor="checkout-address" error={errors.address?.message}>
            <Input id="checkout-address" hasError={!!errors.address} {...register("address")} />
          </FormField>
          <div className={styles.row}>
            <FormField
              label="Postal code"
              htmlFor="checkout-postal-code"
              error={errors.postalCode?.message}
            >
              <Input
                id="checkout-postal-code"
                hasError={!!errors.postalCode}
                {...register("postalCode")}
              />
            </FormField>
            <FormField label="City" htmlFor="checkout-city" error={errors.city?.message}>
              <Input id="checkout-city" hasError={!!errors.city} {...register("city")} />
            </FormField>
          </div>

          {createOrder.isError && (
            <p className={styles.formError} role="alert">
              {createOrder.error instanceof ApiError
                ? createOrder.error.message
                : "Placing the order failed. Please try again."}
            </p>
          )}

          <Button type="submit" fullWidth disabled={createOrder.isPending}>
            {createOrder.isPending ? "Placing order..." : "Place order"}
          </Button>
        </form>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Summary</h2>
          <ul className={styles.summaryList}>
            {items.map((item) => (
              <li key={item.productId}>
                <span>
                  {item.quantity}× {item.name}
                </span>
                <Price amount={item.price * item.quantity} size="sm" />
              </li>
            ))}
          </ul>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <Price amount={totalPrice} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
