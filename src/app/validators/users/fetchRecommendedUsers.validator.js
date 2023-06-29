const Joi = require("joi");

exports.RecomnededUsersSchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
  });