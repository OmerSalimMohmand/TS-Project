import type { Entity } from "./Entity";

interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}
export interface Order extends Entity {
  customerId: number;
  items: OrderItem[];
  createdAt: Date;
}
