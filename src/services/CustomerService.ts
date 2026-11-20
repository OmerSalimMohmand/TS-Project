import { IError } from "@/types/IError";
import type { Customer } from "../domain/Customer";
import type { ICustomerRepository } from "../repositories/contracts/ICustomerRepository";
import {
  createErrorResult,
  createSuccessResult,
  type Result,
} from "../types/Result";

export class CustomerService {
  constructor(private repository: ICustomerRepository) {}

  public addCustomer(customer: Customer): Result<Customer> {
    if (customer.name.trim().length === 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: `Customer name cannot be empty or whitespace`,
      };
      return createErrorResult(error);
    }

    if (customer.email.trim().length === 0) {
      const error: IError = {
        code: "INVALID_DATA",
        message: `Customer email cannot be empty or whitespace`,
      };
      return createErrorResult(error);
    }

    const newCustomer = this.repository.create(customer);
    return createSuccessResult(newCustomer);
  }

  public getCustomerById(id: number): Result<Customer> {
    const foundCustomer = this.repository.findById(id);
    if (!foundCustomer) {
      const error: IError = {
        code: "NOT_FOUND",
        message: `Unable to find a customer with the id ${id}`,
      };
      return createErrorResult(error);
    }

    return createSuccessResult(foundCustomer);
  }
}
