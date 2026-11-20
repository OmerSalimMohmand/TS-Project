"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./application/Application");
const product1 = {
    id: 1,
    name: "Laptop",
    price: 200,
    stock: 10,
    category: "Electronics",
};
const product2 = {
    id: 2,
    name: "Screwdriver",
    price: 20,
    stock: 20,
    category: "Tools",
};
const customer1 = {
    id: 1,
    name: "Omer",
    email: "omer@yahoo.com",
    phone: "780343343",
};
const customer2 = {
    id: 2,
    name: "Najeeb",
    email: "najeeb@yahoo.com",
};
const order1 = {
    id: 1001,
    customerId: customer1.id,
    items: [
        { productId: product1.id, quantity: 2, unitPrice: product1.price },
        { productId: product2.id, quantity: 3, unitPrice: product2.price },
        { productId: product1.id, quantity: 3, unitPrice: product1.price },
    ],
    createdAt: new Date(),
};
const app = (0, Application_1.createApplication)();
app.productRepository.create(product1);
app.productRepository.create(product2);
console.log((0, Application_1.startApplication)(app, order1));
console.log("__________________________\nProduct's Stock:\n");
console.log(app.productRepository.findAll());
//# sourceMappingURL=index.js.map