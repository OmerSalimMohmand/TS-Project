"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    createOrder(order) {
        const result = this.orderService.createOrder(order);
        if (!result.success) {
            return {
                statusCode: this.getStatusCode(result.error.code),
                body: {
                    success: false,
                    error: result.error,
                },
            };
        }
        return {
            statusCode: 201,
            body: {
                success: true,
                data: result.data,
            },
        };
    }
    getStatusCode(errorCode) {
        switch (errorCode) {
            case "INVALID_DATA":
                return 400;
            case "NOT_FOUND":
                return 404;
            case "INSUFFICIENT_STOCK":
                return 409;
            case "UPDATE_FAILED":
            case "ROLLBACK_FAILED":
                return 500;
            default:
                return 500;
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map