import type { Order } from "../domain/Order";
import type { IOrderRepository } from "../repositories/contracts/IOrderRepository";
import type { IProductRepository } from "../repositories/contracts/IProductRepository";
import { createSuccessResult, createErrorResult } from "../types/Result";
import { validateOrder } from "./validators/OrderValidator";
import type { IError } from "../types/IError";
import type { Result } from "../types/Result";

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) {}

  createOrder(order: Order): Result<Order> {
    //---order validation
    const validationResult = validateOrder(order);
    if (!validationResult.success) return validationResult;

    const validatedOrder = validationResult.data;

    //---confirming order-items existance and quantity
    const requestedTotals = new Map<number, number>();
    for (const item of validatedOrder.items) {
      const product = this.productRepository.findById(item.productId);
      if (!product) {
        const error: IError = {
          code: "NOT_FOUND",
          message: `Unable to find a product with the id ${item.productId}`,
          details: { productId: item.productId },
        };
        return createErrorResult(error);
      }

      const requestedTotal =
        (requestedTotals.get(item.productId) ?? 0) + item.quantity;

      if (requestedTotal > product.stock) {
        const error: IError = {
          code: "INSUFFICIENT_STOCK",
          message: `Product ${product.id} - ${product.name}: ordered quantity ${requestedTotal} exceeds its available stock ${product.stock}`,
          details: {
            productId: product.id,
            requestedStock: requestedTotal,
            availableStock: product.stock,
          },
        };
        return createErrorResult(error);
      }

      requestedTotals.set(item.productId, requestedTotal);
    }

    //---updating stock and rolling back in case of failure
    // requestedTotals.set(3, 10) // for testing
    let stockUpdateError: IError | undefined;
    let stockUpdateEx: Error | undefined;
    let createdOrder: Order | undefined;

    const originalStocks = new Map<number, number>();
    try {
      for (const [productId, requestedTotal] of requestedTotals) {
        const product = this.productRepository.findById(productId);
        if (!product) {
          stockUpdateError = {
            code: "NOT_FOUND",
            message: `Order could not be placed because product ${productId} was not found during stock processing.`,
            details: { productId },
          };
          break;
        }

        originalStocks.set(product.id, product.stock);
        // [1]
        const updatedProduct = this.productRepository.update(product.id, {
          stock: product.stock - requestedTotal,
        });

        if (!updatedProduct) {
          stockUpdateError = {
            code: "UPDATE_FAILED",
            message: `Order could not be placed because the stock update failed for product ${productId}.`,
            details: { productId },
          };
          break;
        }
      }

      if (!stockUpdateError) {
        createdOrder = this.orderRepository.create(validatedOrder);
      }
    } catch (ex: unknown) {
      stockUpdateEx = ex as Error;
    }
    // [2]
    if (stockUpdateError) {
      let isRollbackSuccessful: boolean;
      try {
        isRollbackSuccessful = this.rollbackStock(originalStocks);
      } catch (ex: unknown) {
        throw new AggregateError([stockUpdateError, ex]);
      }
      if (!isRollbackSuccessful) {
        const stockRollbackError: IError = {
          code: "ROLLBACK_FAILED",
          message: `${stockUpdateError.message} Rollback failed; inventory needs reconciliation.`,
          details: {
            original_error_code: stockUpdateError.code,
            original_error_details: stockUpdateError.details,
          },
        };
        return createErrorResult(stockRollbackError);
      }

      stockUpdateError.message +=
        " All attempted stock changes were rolled back successfully.";
      return createErrorResult(stockUpdateError);
    }

    if (stockUpdateEx) {
      let isRollbackSuccessful: boolean;
      try {
        isRollbackSuccessful = this.rollbackStock(originalStocks);
      } catch (ex: unknown) {
        throw new AggregateError([stockUpdateEx, ex]);
      }
      if (!isRollbackSuccessful) {
        const stockRollbackError: IError = {
          code: "ROLLBACK_FAILED",
          message: `Rollback failed; inventory needs reconciliation.`,
        };

        throw new AggregateError([stockUpdateEx, stockRollbackError]);
      }
      stockUpdateEx.message +=
        " All attempted stock changes were rolled back successfully.";
      throw stockUpdateEx;
    }

    return createSuccessResult(createdOrder as Order);
  }

  getOrderById(id: number): Result<Order> {
    const foundOrder = this.orderRepository.findById(id);
    if (!foundOrder) {
      const error: IError = {
        code: "NOT_FOUND",
        message: `Unable to find an order with the id ${id}`,
      };
      return createErrorResult(error);
    }

    return createSuccessResult(foundOrder);
  }

  private rollbackStock(originalStocks: Map<number, number>): boolean {
    const rollbackFails: number[] = [];
    for (const [productId, originalStock] of originalStocks) {
      const product = this.productRepository.findById(productId);
      if (!product) {
        rollbackFails.push(productId);
        continue;
      }

      const restoredProduct = this.productRepository.update(product.id, {
        stock: originalStock,
      });

      if (!restoredProduct) rollbackFails.push(productId);
    }

    if (rollbackFails.length != 0) return false;
    return true;
    // throw new Error("Rollback Exception Occoured.") //for testing
  }
}

// [1]
// const deductedStock = product.stock - requestedTotal;
// if (deductedStock < 0)
//   return {
//     success: false,
//     data: null,
//     error: `Product ${product.id} - ${product.name}: ordered quantity ${requestedTotals.get(product.id)} exceeds its available stock ${product.stock}`,
//   };
// Revalidating the fresh-read stock before update, safeguard aginst the stock changes in between the time I initially read the data for validation and now rereading it for the updation
// Though, the risk still exists if another update happens after the fresh read but before the write.
// Atomic updates or optimistic concurrency control are needed to close the remaining race window.
// The repository must coordinate the check and update atomically, or use a mechanism such as optimistic concurrency control.

//[2]
// Update   Rollback      Handling

// IError   Success       Modify IError.message with rollback success and return IError
// IError   IError        return rollback IError consisting the update IError
// IError   Ex            throw new AggregateError([IError, Ex], "meesage")
// Ex       Success       Modify Ex.message with rollback success and throw it
// Ex       IError        throw new AggregateError([Ex, Error], "meesage")
// Ex       Ex            throw new AggregateError([Ex, Ex], "meesage")
