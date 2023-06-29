const Joi = require("joi");

exports.TopReserachersSchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
  });