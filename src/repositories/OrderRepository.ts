import type { Order } from "../domain/Order";
import type { IOrderRepository } from "./contracts/IOrderRepository";

export class OrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  public create(order: Order): Order {
    const newOrder = this.cloneOrder(order);
    this.orders.push(newOrder);
    return this.cloneOrder(newOrder);

    // throw new Error("Order Creation Exception.") // for testing
  }

  public findById(id: number): Order | undefined {
    const foundOrder = this.orders.find((order) => order.id === id);
    if (!foundOrder) return undefined;
    return this.cloneOrder(foundOrder);
  }

  public findAll(): Order[] {
    return this.orders.map((order) => this.cloneOrder(order));
  }

  private cloneOrder(order: Order): Order {
    const clone = {
      ...order,
      items: order.items.map((item) => ({ ...item })),
      createdAt: new Date(order.createdAt.getTime()),
    };

    return clone;
  }
}

// Another copying style:
// const returnOrder = { ...foundOrder };
// returnOrder.items = foundOrder.items.map((item) => ({ ...item }));
// returnOrder.createdAt = new Date(foundOrder.createdAt.getTime());
