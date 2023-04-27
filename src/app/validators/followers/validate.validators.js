const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.validateQuerySchema = Joi.object({
  id: Joi.objectId().required(),
  });