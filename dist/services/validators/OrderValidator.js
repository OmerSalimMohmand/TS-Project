"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = validateOrder;
const Result_1 = require("@/types/Result");
function validateOrder(order) {
    if (order.items.length === 0) {
        const error = {
            code: "INVALID_DATA",
            message: `An order must contain at least one item`,
        };
        return (0, Result_1.createErrorResult)(error);
    }
    for (const item of order.items) {
        if (item.quantity <= 0) {
            const error = {
                code: "INVALID_DATA",
                message: `item ${item.productId} quantity must be greater than zero`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        if (item.unitPrice < 0) {
            const error = {
                code: "INVALID_DATA",
                message: `item ${item.productId} unit price must be non-negative`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
    }
    return (0, Result_1.createSuccessResult)(order);
}
//# sourceMappingURL=OrderValidator.js.map