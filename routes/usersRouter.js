const express = require("express");
const faker = require("faker");
const router = express.Router();

router.get("/", (req, res) => {
  const { size } = req.query;
  const limit = size || 30;
  const users = Array.from({ length: limit }, (user) => {
    return {
      name: faker.name.findName(),
      favoriteColor: faker.internet.color(),
    };
  });
  res.json(users);
});

module.exports = router;
