const Joi = require("joi");

exports.getUserProfileSchema = Joi.object({
    username: Joi.string().trim().required(),
  });