import type { ErrorCode } from "../types/IError";
import type { Order } from "../domain/Order";
import type { OrderService } from "../services/OrderService";
import type { HttpResponse, StatusCode } from "../types/HttpResponse";

export class OrderController {
  constructor(private orderService: OrderService) {}

  createOrder(order: Order): HttpResponse<Order> {
    const result = this.orderService.createOrder(order);
    if (!result.success) {
      return {
        statusCode: this.getStatusCode(result.error.code),
        body: {
          success: false, // success: result.success
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

  private getStatusCode(errorCode: ErrorCode): StatusCode {
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
