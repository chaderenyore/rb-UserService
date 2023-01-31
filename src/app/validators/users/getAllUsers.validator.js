const Joi = require("joi");

exports.getAllUsersSchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    type: Joi.string().optional()
  });