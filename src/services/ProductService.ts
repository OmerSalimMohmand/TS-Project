import type { IError } from "@/types/IError";
import type { Product } from "../domain/Product";
import type { IProductRepository } from "../repositories/contracts/IProductRepository";
import {
  createErrorResult,
  createSuccessResult,
  type Result,
} from "../types/Result";
import { ProductValidator } from "./validators/ProductValidator";

export class ProductService {
  constructor(private repository: IProductRepository) {}

  public addProduct(product: Product): Result<Product> {
    const validationResult = ProductValidator.validateCreate(product);
    if (!validationResult.success) return validationResult;
    const validatedProduct = validationResult.data;

    const newProduct = this.repository.create(validatedProduct);
    return createSuccessResult(newProduct);
  }

  public updateProduct(
    id: number,
    changes: Partial<Omit<Product, "id">>,
  ): Result<Product> {


    const updatedProduct = this.repository.update(id, changes);
    if (!updatedProduct) {
      const error: IError = {
        code: "NOT_FOUND",
        message: `Unable to find any product with the id ${id}`,
      };
      return createErrorResult(error);
    }

    return createSuccessResult(updatedProduct);
  }

  public getProductById(id: number): Result<Product> {
    const foundProduct = this.repository.findById(id);
    if (!foundProduct) {
      const error: IError = {
        code: "NOT_FOUND",
        message: `Unable to find any product with the id ${id}`,
      };
      return createErrorResult(error);
    }

    return createSuccessResult(foundProduct);
  }

  public getAllProducts(): Product[] {
    return this.repository.findAll();
  }

  public addStock(productId: number, quantity: number): Result<number> {
    if (quantity <= 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: "Invalid quantity",
      };
      return createErrorResult(error);
    }

    let product = this.repository.findById(productId);
    if (!product) {
      const error: IError = {
        code: "NOT_FOUND",
        message: `Unable to find any product with the id ${productId}`,
      };
      return createErrorResult(error);
    }

    const newStock = product.stock + quantity;
    product = this.repository.update(productId, {
      stock: newStock,
    });

    if (!product) {
      const error: IError = {
        code: "NOT_FOUND",
        message: `Unable to find any product with the id ${productId}`,
      };
      return createErrorResult(error);
    }

    return createSuccessResult(product.stock);
  }
}
