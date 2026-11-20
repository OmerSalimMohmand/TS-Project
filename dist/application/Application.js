"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplication = createApplication;
exports.startApplication = startApplication;
const OrderRepository_1 = require("../repositories/OrderRepository");
const OrderService_1 = require("../services/OrderService");
const OrderController_1 = require("../controlers/OrderController");
const ExceptionHandler_1 = require("./ExceptionHandler");
const ProductRepository_1 = require("../repositories/ProductRepository");
function createApplication() {
    const productRepository = new ProductRepository_1.ProductRepository();
    const orderRepository = new OrderRepository_1.OrderRepository();
    const orderService = new OrderService_1.OrderService(orderRepository, productRepository);
    const orderController = new OrderController_1.OrderController(orderService);
    return {
        productRepository,
        orderController,
    };
}
function startApplication(app, data) {
    const response = (0, ExceptionHandler_1.executeSafely)(() => app.orderController.createOrder(data));
    return response;
}
//# sourceMappingURL=Application.js.map