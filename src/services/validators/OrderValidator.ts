import type { Order } from "@/domain/Order";
import type { IError } from "@/types/IError";
import type { Result } from "@/types/Result";
import { createErrorResult, createSuccessResult } from "@/types/Result";
export function validateOrder(order: Order): Result<Order> {
  if (order.items.length === 0) {
    const error: IError = {
      code: "INVALID_DATA",
      message: `An order must contain at least one item`,
    };
    return createErrorResult(error);
  }

  for (const item of order.items) {
    if (item.quantity <= 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: `item ${item.productId} quantity must be greater than zero`,
      };
      return createErrorResult(error);
    }

    if (item.unitPrice < 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: `item ${item.productId} unit price must be non-negative`,
      };
      return createErrorResult(error);
    }
  }

  return createSuccessResult(order);
}
