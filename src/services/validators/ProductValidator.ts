import type { Product } from "@/domain/Product";
import type { IError } from "@/types/IError";
import type { Result } from "@/types/Result";
import { createSuccessResult, createErrorResult } from "@/types/Result";

export class ProductValidator {
  public static validateCreate(product: Product): Result<Product> {
    if (product.name.trim().length === 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: "Product name cannot be empty or whitespace",
      };
      return createErrorResult(error);
    }

    if (product.price < 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: "Product price cannot be negative",
      };
      return createErrorResult(error);
    }

    if (product.stock < 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: "Product stock cannot be negative",
      };
      return createErrorResult(error);
    }

    return createSuccessResult(product);
  }

  public static validateUpdate(changes: Partial<Omit<Product, "id">>): Result<Partial<Omit<Product, "id">>> {
    if (changes.name?.trim().length === 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: "Product name cannot be empty or whitespace",
      };
      return createErrorResult(error);
    }

    if (changes.price !== undefined && changes.price < 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: "Product price cannot be negative",
      };
      return createErrorResult(error);
    }

    if (changes.stock !== undefined && changes.stock < 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: "Product stock cannot be negative",
      };
      return createErrorResult(error);
    }
    return createSuccessResult(changes);
    }
    
    private validateName(name: string): boolean{//isNameValid

    }
}
