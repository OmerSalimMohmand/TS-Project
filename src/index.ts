import type { Product } from "./domain/Product";
import type { Order } from "./domain/Order";
import type { Customer } from "./domain/Customer";
import { createApplication, startApplication } from "./application/Application";

// Sample Data:
const product1: Product = {
  id: 1,
  name: "Laptop",
  price: 200,
  stock: 10,
  category: "Electronics",
};

const product2: Product = {
  id: 2,
  name: "Screwdriver",
  price: 20,
  stock: 20,
  category: "Tools",
};

const customer1: Customer = {
  id: 1,
  name: "Omer",
  email: "omer@yahoo.com",
  phone: "780343343",
};

const customer2: Customer = {
  id: 2,
  name: "Najeeb",
  email: "najeeb@yahoo.com",
};

const order1: Order = {
  id: 1001,
  customerId: customer1.id,
  items: [
    { productId: product1.id, quantity: 2, unitPrice: product1.price },
    { productId: product2.id, quantity: 3, unitPrice: product2.price },
    { productId: product1.id, quantity: 3, unitPrice: product1.price },
  ],
  createdAt: new Date(),
};

//Running:

const app = createApplication();
app.productRepository.create(product1);
app.productRepository.create(product2);
console.log(startApplication(app, order1));

console.log("__________________________\nProduct's Stock:\n");
console.log(app.productRepository.findAll());
