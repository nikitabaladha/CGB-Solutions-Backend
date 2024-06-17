const Joi = require("joi");

const signupValidationSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "subadmin").required(),
});

module.exports = signupValidationSchema;
