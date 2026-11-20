import type { HttpResponse } from "../types/HttpResponse";
import type { Order } from "../domain/Order";
import { OrderRepository } from "../repositories/OrderRepository";
import { OrderService } from "../services/OrderService";
import { OrderController } from "../controlers/OrderController";
import { executeSafely } from "./ExceptionHandler";
import { ProductRepository } from "../repositories/ProductRepository";
import { IProductRepository } from "../repositories/contracts/IProductRepository";

//Application Layer
//We only implement application layer safe execution on Order for this project, not for the Product and Customer
interface Application {
  orderController: OrderController;
  productRepository: IProductRepository;
}
export function createApplication(): Application {
  const productRepository = new ProductRepository();
  const orderRepository = new OrderRepository();

  const orderService = new OrderService(orderRepository, productRepository);

  const orderController = new OrderController(orderService);

  return {
    productRepository,
    orderController,
  };
}
export function startApplication(
  app: Application,
  data: Order,
): HttpResponse<Order> {
  const response = executeSafely<Order>(() => app.orderController.createOrder(data));
  return response;
}
