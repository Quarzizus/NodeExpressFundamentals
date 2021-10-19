const faker = require("faker");
const boom = require("@hapi/boom");

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const users = Array.from({ length: 100 }, (user) => {
      return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        favoriteColor: faker.internet.color(),
        phone: faker.phone.phoneNumber(),
      };
    });
    this.users.push(...users);
  }

  find() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw boom.notFound("Not found user");
    }
    return user;
  }

  create(data) {
    if (!Object.values(data).length) {
      throw boom.badData("Bad data");
    }

    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id, changes) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound("Not found user");
    }
    this.users[index] = {
      ...this.users[index],
      ...changes,
    };

    return this.users[index];
  }

  delete(id) {
    this.users.splice(id, 1);
  }
}

module.exports = UsersService;
