"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Result_1 = require("../types/Result");
class ProductService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    addProduct(product) {
        if (product.name.trim().length === 0) {
            const error = {
                code: "INVALID_DATA",
                message: "Product name cannot be empty or whitespace",
            };
            return (0, Result_1.createErrorResult)(error);
        }
        if (product.price < 0) {
            const error = {
                code: "INVALID_DATA",
                message: "Product price cannot be negative",
            };
            return (0, Result_1.createErrorResult)(error);
        }
        if (product.stock < 0) {
            const error = {
                code: "INVALID_DATA",
                message: "Product stock cannot be negative",
            };
            return (0, Result_1.createErrorResult)(error);
        }
        const newProduct = this.repository.create(product);
        return (0, Result_1.createSuccessResult)(newProduct);
    }
    updateProduct(id, changes) {
        if (changes.name?.trim().length === 0) {
            const error = {
                code: "INVALID_DATA",
                message: "Product name cannot be empty or whitespace",
            };
            return (0, Result_1.createErrorResult)(error);
        }
        if (changes.price !== undefined && changes.price < 0) {
            const error = {
                code: "INVALID_DATA",
                message: "Product price cannot be negative",
            };
            return (0, Result_1.createErrorResult)(error);
        }
        if (changes.stock !== undefined && changes.stock < 0) {
            const error = {
                code: "INVALID_DATA",
                message: "Product stock cannot be negative",
            };
            return (0, Result_1.createErrorResult)(error);
        }
        const updatedProduct = this.repository.update(id, changes);
        if (!updatedProduct) {
            const error = {
                code: "NOT_FOUND",
                message: `Unable to find any product with the id ${id}`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        return (0, Result_1.createSuccessResult)(updatedProduct);
    }
    getProductById(id) {
        const foundProduct = this.repository.findById(id);
        if (!foundProduct) {
            const error = {
                code: "NOT_FOUND",
                message: `Unable to find any product with the id ${id}`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        return (0, Result_1.createSuccessResult)(foundProduct);
    }
    getAllProducts() {
        return this.repository.findAll();
    }
    addStock(productId, quantity) {
        if (quantity <= 0) {
            const error = {
                code: "INVALID_DATA",
                message: "Invalid quantity",
            };
            return (0, Result_1.createErrorResult)(error);
        }
        let product = this.repository.findById(productId);
        if (!product) {
            const error = {
                code: "NOT_FOUND",
                message: `Unable to find any product with the id ${productId}`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        const newStock = product.stock + quantity;
        product = this.repository.update(productId, {
            stock: newStock,
        });
        if (!product) {
            const error = {
                code: "NOT_FOUND",
                message: `Unable to find any product with the id ${productId}`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        return (0, Result_1.createSuccessResult)(product.stock);
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map