const Joi = require("joi");

const blogValidationSchema = Joi.object({
  title: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  date: Joi.date().required(),
  summary: Joi.string().trim().required(),
});

module.exports = blogValidationSchema;
