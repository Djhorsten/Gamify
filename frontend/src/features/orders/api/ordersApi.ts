import { apiClient } from "../../../api/client";
import type { CreateOrderInput, Order } from "../types/order";

export function fetchOrders(token: string): Promise<Order[]> {
  return apiClient.get<Order[]>("/orders", token);
}

export function fetchOrder(id: number, token: string): Promise<Order> {
  return apiClient.get<Order>(`/orders/${id}`, token);
}

export function createOrderRequest(input: CreateOrderInput, token: string): Promise<Order> {
  return apiClient.post<Order>("/orders", input, token);
}

export function cancelOrderRequest(id: number, token: string): Promise<Order> {
  return apiClient.patch<Order>(`/orders/${id}/cancel`, {}, token);
}
