import type { Order } from "@/domain/Order";
import type { IRepository } from "./IRepository";

export interface IOrderRepository extends IRepository<Order> {}
