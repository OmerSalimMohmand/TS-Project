import type { Product } from "@/domain/Product";
import type { IRepository } from "./IRepository";
import type { IUpdatableRepository } from "./IUpdatableRepository";
export interface IProductRepository extends IRepository<Product>, IUpdatableRepository<Product> {
}
//# sourceMappingURL=IProductRepository.d.ts.map