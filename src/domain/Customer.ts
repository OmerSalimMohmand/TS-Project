import type { Entity } from "./Entity";

export interface Customer extends Entity {
  name: string;
  email: string;
  phone?: string;
}
