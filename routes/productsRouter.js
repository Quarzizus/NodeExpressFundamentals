const express = require("express");
const faker = require("faker");
const router = express.Router();

router.get("/", (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: "Mesa Elevadora",
    price: 60000,
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  res.json({
    message: "Created",
    data: body,
  });
});

router.put("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  res.json({
    message: "Update with PUT",
    data: body,
    id,
  });
});

router.patch("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  res.json({
    message: "Update",
    data: body,
    id,
  });
});

router.delete("/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  res.json({
    message: "Delete",
    id,
  });
});

module.exports = router;
