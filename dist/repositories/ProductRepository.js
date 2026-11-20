"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
class ProductRepository extends BaseRepository_1.BaseRepository {
    update(id, changes) {
        const foundProduct = this.entities.find((product) => product.id === id);
        if (!foundProduct)
            return undefined;
        Object.assign(foundProduct, changes);
        return { ...foundProduct };
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map