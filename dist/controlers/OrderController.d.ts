import type { Order } from "../domain/Order";
import type { OrderService } from "../services/OrderService";
import type { HttpResponse } from "../types/HttpResponse";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(order: Order): HttpResponse<Order>;
    private getStatusCode;
}
//# sourceMappingURL=OrderController.d.ts.map