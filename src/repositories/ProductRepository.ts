import type { IProductRepository } from "./contracts/IProductRepository";
import type { Product } from "../domain/Product";
import { BaseRepository } from "./BaseRepository";

export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository
{
  public update(
    id: number,
    changes: Partial<Omit<Product, "id">>,
  ): Product | undefined {
    const foundProduct = this.entities.find((product) => product.id === id);
    if (!foundProduct) return undefined;
    Object.assign(foundProduct, changes);
    return { ...foundProduct };
  }
}
