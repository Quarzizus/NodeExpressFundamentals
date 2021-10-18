const express = require("express");
const router = express.Router();
const ProductsService = require("../services/productsService");

const service = new ProductsService();

router.get("/", (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post("/", (req, res) => {
  const body = req.body;
  const dataNewProduct = service.create(body);
  res.status(201).json({
    message: "Created",
    data: dataNewProduct,
  });
});

router.put("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const productUpdated = service.update(body, id);
  res.json({
    message: "Update with PUT",
    data: productUpdated,
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
  const productDelete = service.delete(id);
  res.json({
    message: "Delete",
    id,
  });
});

module.exports = router;
