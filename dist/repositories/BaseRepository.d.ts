import type { Entity } from "@/domain/Entity";
import type { IRepository } from "./contracts/IRepository";
export declare class BaseRepository<T extends Entity> implements IRepository<T> {
    protected entities: T[];
    create(entity: T): T;
    findById(id: number): T | undefined;
    findAll(): T[];
}
//# sourceMappingURL=BaseRepository.d.ts.map