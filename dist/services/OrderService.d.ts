import type { Order } from "../domain/Order";
import type { IOrderRepository } from "../repositories/contracts/IOrderRepository";
import type { IProductRepository } from "../repositories/contracts/IProductRepository";
import type { Result } from "../types/Result";
export declare class OrderService {
    private orderRepository;
    private productRepository;
    constructor(orderRepository: IOrderRepository, productRepository: IProductRepository);
    createOrder(order: Order): Result<Order>;
    getOrderById(id: number): Result<Order>;
    private rollbackStock;
}
//# sourceMappingURL=OrderService.d.ts.map