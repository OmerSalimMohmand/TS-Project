import type { Entity } from "@/domain/Entity";
import type { IRepository } from "./contracts/IRepository";

export class BaseRepository<T extends Entity> implements IRepository<T> {
  protected entities: T[] = [];
  public create(entity: T): T {
    const newEntity = { ...entity };
    this.entities.push(newEntity);
    return { ...newEntity };
  }

  public findById(id: number): T | undefined {
    const foundEntity = this.entities.find((entity) => entity.id === id);
    if (!foundEntity) return undefined;
    return { ...foundEntity };
  }

  public findAll(): T[] {
    return this.entities.map((entity) => ({ ...entity }));
  }
}