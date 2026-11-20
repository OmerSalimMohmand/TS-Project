"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const Result_1 = require("../types/Result");
class CustomerService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    addCustomer(customer) {
        if (customer.name.trim().length === 0) {
            const error = {
                code: "INVALID_DATA",
                message: `Customer name cannot be empty or whitespace`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        if (customer.email.trim().length === 0) {
            const error = {
                code: "INVALID_DATA",
                message: `Customer email cannot be empty or whitespace`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        const newCustomer = this.repository.create(customer);
        return (0, Result_1.createSuccessResult)(newCustomer);
    }
    getCustomerById(id) {
        const foundCustomer = this.repository.findById(id);
        if (!foundCustomer) {
            const error = {
                code: "NOT_FOUND",
                message: `Unable to find a customer with the id ${id}`,
            };
            return (0, Result_1.createErrorResult)(error);
        }
        return (0, Result_1.createSuccessResult)(foundCustomer);
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map