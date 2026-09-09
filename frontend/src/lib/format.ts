export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
