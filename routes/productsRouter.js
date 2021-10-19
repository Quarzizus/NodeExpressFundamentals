const express = require("express");
const router = express.Router();
const ProductsService = require("../services/productsService");

const service = new ProductsService();

router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    console.log(product);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const dataNewProduct = await service.create(body);
  res.status(201).json({
    message: "Created",
    data: dataNewProduct,
  });
});

router.put("/:id", async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const productUpdated = await service.update(body, id);
    res.json({
      message: "Update with PUT",
      data: productUpdated,
      id,
    });
  } catch (error) {
    next(error);
  }
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

router.delete("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  await service.delete(id);
  res.json({
    message: "Delete",
    id,
  });
});

module.exports = router;
