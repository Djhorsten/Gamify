export const orderKeys = {
  all: ["orders"] as const,
  detail: (id: number) => ["order", id] as const,
};
