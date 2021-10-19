const { json } = require("express");
const express = require("express");
const UsersService = require("../services/usersService");

const router = express.Router();
const service = new UsersService();

router.get("/", (req, res) => {
  const users = service.find();
  res.json(users);
});

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const user = service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { body } = req;
    const newUser = service.create(body);
    res.json({
      data: newUser,
      message: "User Created",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const userUpdated = service.update(id, body);
    res.json({
      data: userUpdated,
      message: "User updated",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  service.delete(id);
  res.json({ message: "User Deleted" });
});

module.exports = router;
