import type { HttpResponse } from "../types/HttpResponse";
import type { Order } from "../domain/Order";
import { OrderController } from "../controlers/OrderController";
import { IProductRepository } from "../repositories/contracts/IProductRepository";
interface Application {
    orderController: OrderController;
    productRepository: IProductRepository;
}
export declare function createApplication(): Application;
export declare function startApplication(app: Application, data: Order): HttpResponse<Order>;
export {};
//# sourceMappingURL=Application.d.ts.map