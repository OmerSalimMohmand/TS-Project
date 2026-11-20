import type { Product } from "../domain/Product";
import type { IProductRepository } from "../repositories/contracts/IProductRepository";
import { type Result } from "../types/Result";
export declare class ProductService {
    private repository;
    constructor(repository: IProductRepository);
    addProduct(product: Product): Result<Product>;
    updateProduct(id: number, changes: Partial<Omit<Product, "id">>): Result<Product>;
    getProductById(id: number): Result<Product>;
    getAllProducts(): Product[];
    addStock(productId: number, quantity: number): Result<number>;
}
//# sourceMappingURL=ProductService.d.ts.map