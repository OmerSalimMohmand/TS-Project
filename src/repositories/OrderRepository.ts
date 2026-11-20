import type { Order } from "../domain/Order";
import type { IOrderRepository } from "./contracts/IOrderRepository";

export class OrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  public create(order: Order): Order {
    const newOrder = {
      ...order,
      items: order.items.map((item) => ({ ...item })),
      createdAt: new Date(order.createdAt.getTime()),
    };

    this.orders.push(newOrder);

    return {
      ...newOrder,
      items: newOrder.items.map((item) => ({ ...item })),
      createdAt: new Date(newOrder.createdAt.getTime()),
    };

    // throw new Error("Order Creation Exception.") // for testing
  }

  public findById(id: number): Order | undefined {
    const foundOrder = this.orders.find((order) => order.id === id);
    if (!foundOrder) return undefined;
    const returnOrder = { ...foundOrder };
    returnOrder.items = foundOrder.items.map((item) => ({ ...item }));
    returnOrder.createdAt = new Date(foundOrder.createdAt.getTime());
    return returnOrder;
  }

  public findAll(): Order[] {
    return this.orders.map((order) => {
      const orderCopy = { ...order };
      orderCopy.items = order.items.map((item) => ({ ...item }));
      orderCopy.createdAt = new Date(order.createdAt.getTime());
      return orderCopy;
    });
  }
}
