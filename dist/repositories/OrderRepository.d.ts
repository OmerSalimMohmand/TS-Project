import type { Order } from "../domain/Order";
import type { IOrderRepository } from "./contracts/IOrderRepository";
export declare class OrderRepository implements IOrderRepository {
    private orders;
    create(order: Order): Order;
    findById(id: number): Order | undefined;
    findAll(): Order[];
}
//# sourceMappingURL=OrderRepository.d.ts.map