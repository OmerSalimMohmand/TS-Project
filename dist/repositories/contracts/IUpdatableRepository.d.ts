import type { Entity } from "@/domain/Entity";
export interface IUpdatableRepository<T extends Entity> {
    update(id: number, changes: Partial<Omit<T, "id">>): T | undefined;
}
//# sourceMappingURL=IUpdatableRepository.d.ts.map