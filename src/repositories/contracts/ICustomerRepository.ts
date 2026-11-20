import type { Customer } from "@/domain/Customer";
import type { IRepository } from "./IRepository";

export interface ICustomerRepository extends IRepository<Customer> {}
