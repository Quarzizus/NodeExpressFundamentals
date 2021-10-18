const faker = require("faker");

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((element) => element.id === id);
  }

  update(changes, id) {
    const index = this.products.findIndex((element) => element.id === id);

    if (index === -1) {
      throw new Error("Product not found");
    }
    this.products[index] = {
      ...this.products[index],
      ...changes,
    };
  }

  delete(id) {
    const index = this.products.findIndex((element) => element.id === id);
    index === -1
      ? new Error("Product not found")
      : this.products.splice(index, 1);
  }
}

module.exports = ProductsServices;
