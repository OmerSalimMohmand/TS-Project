import type { Entity } from "./Entity";

export type ProductCategory = "Electronics" | "Appliances" | "Tools";

export interface Product extends Entity {
  name: string;
  price: number;
  stock: number;
  category: ProductCategory;
}
