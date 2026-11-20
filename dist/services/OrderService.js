"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const Result_1 = require("../types/Result");
const OrderValidator_1 = require("./validators/OrderValidator");
class OrderService {
    orderRepository;
    productRepository;
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }
    createOrder(order) {
        const validationResult = (0, OrderValidator_1.validateOrder)(order);
        if (!validationResult.success)
            return validationResult;
        const validatedOrder = validationResult.data;
        const requestedTotals = new Map();
        for (const item of validatedOrder.items) {
            const product = this.productRepository.findById(item.productId);
            if (!product) {
                const error = {
                    code: "NOT_FOUND",
                    message: `Unable to find a product with the id ${item.productId}`,
                    details: { productId: item.productId },
                };
                return (0, Result_1.createErrorResult)(error);
            }
            const requestedTotal = (requestedTotals.get(item.productId) ?? 0) + item.quantity;
            if (requestedTotal > product.stock) {
                const error = {
                    code: "INSUFFICIENT_STOCK",
                    message: `Product ${product.id} - ${product.name}: ordered quantity ${requestedTotal} exceeds its available stock ${product.stock}`,
                    details: {
                        productId: product.id,
                        requestedStock: requestedTotal,
                        availableStock: product.stock,
                    },
                };
                return (0, Result_1.createErrorResult)(error);
            }
            requestedTotals.set(item.productId, requestedTotal);
        }
        let stockUpdateError;
        let stockUpdateEx;
        let createdOrder;
        const originalStocks = new Map();
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
        }
        catch (ex) {
            stockUpdateEx = ex;
        }
        if (stockUpdateError) {
            let isRollbackSuccessful;
            try {
                isRollbackSuccessful = this.rollbackStock(originalStocks);
            }
            catch (ex) {
                throw new AggregateError([stockUpdateError, ex]);
            }
            if (!isRollbackSuccessful) {
                const stockRollbackError = {
                    code: "ROLLBACK_FAILED",
                    message: `${stockUpdateError.message} Rollback failed; inventory needs reconciliation.`,
                    details: {
                        original_error_code: stockUpdateError.code,
                        original_error_details: stockUpdateError.details,
                    },
                };
                return (0, Result_1.createErrorResult)(stockRollbackError);
            }
            stockUpdateError.message +=
                " All attempted stock changes were rolled back successfully.";
            return (0, Result_1.createErrorResult)(stockUpdateError);
        }
        if (stockUpdateEx) {
            let isRollbackSuccessful;
            try {
                isRollbackSuccessful = this.rollbackStock(originalStocks);
            }
            catch (ex) {
                throw new AggregateError([stockUpdateEx, ex]);
            }
            if (!isRollbackSuccessful) {
                const stockRollbackError = {
                    code: "ROLLBACK_FAILED",
                    message: `Rollback failed; inventory needs reconciliation.`,
                };
                throw new AggregateError([stockUpdateEx, stockRollbackError]);
            }
            stockUpdateEx.message +=
                " All attempted stock changes were rolled back successfully.";
            throw stockUpdateEx;
        }
        return (0, Result_1.createSuccessResult)(createdOrder);
    }
    getOrderById(id) {
        const foundOrder = this.orderRepository.findById(id);
        if (!foundOrder) {
            const error = {
                code: "NOT_FOUND",
                message: `Unable to find an order with the id ${id}`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        return (0, Result_1.createSuccessResult)(foundOrder);
    }
    rollbackStock(originalStocks) {
        const rollbackFails = [];
        for (const [productId, originalStock] of originalStocks) {
            const product = this.productRepository.findById(productId);
            if (!product) {
                rollbackFails.push(productId);
                continue;
            }
            const restoredProduct = this.productRepository.update(product.id, {
                stock: originalStock,
            });
            if (!restoredProduct)
                rollbackFails.push(productId);
        }
        if (rollbackFails.length != 0)
            return false;
        return true;
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map