const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.getUserByIdSchema = Joi.object({
    id: Joi.objectId().required(),
  });