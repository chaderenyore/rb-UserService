const Joi = require("joi");
exports.validatePasswordTokenSchema = Joi.object({
    image: Joi.string().trim().optional(),
  file: Joi.string().trim().optional(),
  });