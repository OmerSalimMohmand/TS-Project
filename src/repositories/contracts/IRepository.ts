export interface IRepository<T> {
  create(entity: T): T;
  findById(id: number): T | undefined;
  findAll(): T[];
}
