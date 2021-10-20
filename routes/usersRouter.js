const express = require("express");
const UsersService = require("../services/usersService");
const validatorHandler = require("../middlewares/validatorHandler");
const {
  getUserSchema,
  updateUserSchema,
  createUserSchema,
} = require("../schemas/userSchema");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newUser = await service.create(body);
      res.json({
        data: newUser,
        message: "User Created",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const userUpdated = await service.update(id, body);
      res.json({
        data: userUpdated,
        message: "User updated",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await service.delete(id);
  res.json({ message: "User Deleted" });
});

module.exports = router;
