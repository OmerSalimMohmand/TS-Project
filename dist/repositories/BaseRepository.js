"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    entities = [];
    create(entity) {
        const newEntity = { ...entity };
        this.entities.push(newEntity);
        return { ...newEntity };
    }
    findById(id) {
        const foundEntity = this.entities.find((entity) => entity.id === id);
        if (!foundEntity)
            return undefined;
        return { ...foundEntity };
    }
    findAll() {
        return this.entities.map((entity) => ({ ...entity }));
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map