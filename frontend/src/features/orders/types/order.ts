export type OrderStatus = "PLACED" | "CANCELLED";

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  name: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface CreateOrderInput {
  name: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  items: { productId: number; quantity: number }[];
}
