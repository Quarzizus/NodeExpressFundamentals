const faker = require("faker");
const boom = require("@hapi/boom");

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }

  async findOne(id) {
    const product = this.products.find((element) => element.id === id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block");
    }
    return product;
  }

  async update(changes, id) {
    const index = this.products.findIndex((element) => element.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    this.products[index] = {
      ...this.products[index],
      ...changes,
    };
  }

  async delete(id) {
    const index = this.products.findIndex((element) => element.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    } else {
      this.products.splice(index, 1);
    }
  }
}

module.exports = ProductsServices;
