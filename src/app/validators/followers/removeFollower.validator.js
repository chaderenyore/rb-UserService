const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.removeFollowerSchema = Joi.object({
  follower_id: Joi.objectId().required(),
});
