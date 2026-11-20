import type { Customer } from "../domain/Customer";
import { BaseRepository } from "./BaseRepository";
import { ICustomerRepository } from "./contracts/ICustomerRepository";

export class CustomerRepository extends BaseRepository<Customer> implements ICustomerRepository {}
