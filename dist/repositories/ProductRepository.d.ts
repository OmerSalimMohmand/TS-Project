import type { IProductRepository } from "./contracts/IProductRepository";
import type { Product } from "../domain/Product";
import { BaseRepository } from "./BaseRepository";
export declare class ProductRepository extends BaseRepository<Product> implements IProductRepository {
    update(id: number, changes: Partial<Omit<Product, "id">>): Product | undefined;
}
//# sourceMappingURL=ProductRepository.d.ts.map