import type { Customer } from "../domain/Customer";
import type { ICustomerRepository } from "../repositories/contracts/ICustomerRepository";
import { type Result } from "../types/Result";
export declare class CustomerService {
    private repository;
    constructor(repository: ICustomerRepository);
    addCustomer(customer: Customer): Result<Customer>;
    getCustomerById(id: number): Result<Customer>;
}
//# sourceMappingURL=CustomerService.d.ts.map