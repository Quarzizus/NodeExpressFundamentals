const joi = require("joi");

const id = joi.string().uuid();
const name = joi.string().min(3);
const favoriteColor = joi.string().min(3);
const phone = joi.string().min(10);

const createUserSchema = joi.object({
  id,
  name: name.required(),
  favoriteColor: favoriteColor.required(),
  phone: phone.required(),
});

const updateUserSchema = joi.object({
  name: name,
  favoriteColor: favoriteColor,
  phone: phone,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
