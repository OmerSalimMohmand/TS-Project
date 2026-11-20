"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
class OrderRepository {
    orders = [];
    create(order) {
        const newOrder = {
            ...order,
            items: order.items.map((item) => ({ ...item })),
            createdAt: new Date(order.createdAt.getTime()),
        };
        this.orders.push(newOrder);
        return {
            ...newOrder,
            items: newOrder.items.map((item) => ({ ...item })),
            createdAt: new Date(newOrder.createdAt.getTime()),
        };
    }
    findById(id) {
        const foundOrder = this.orders.find((order) => order.id === id);
        if (!foundOrder)
            return undefined;
        const returnOrder = { ...foundOrder };
        returnOrder.items = foundOrder.items.map((item) => ({ ...item }));
        returnOrder.createdAt = new Date(foundOrder.createdAt.getTime());
        return returnOrder;
    }
    findAll() {
        return this.orders.map((order) => {
            const orderCopy = { ...order };
            orderCopy.items = order.items.map((item) => ({ ...item }));
            orderCopy.createdAt = new Date(order.createdAt.getTime());
            return orderCopy;
        });
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map