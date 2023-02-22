const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.followUserSchema = Joi.object({
  follower_id: Joi.objectId().optional(),
  following_id: Joi.objectId().required(),
  follower_username: Joi.string().optional(),
  follower_firstname: Joi.string().optional(),
  following_type: Joi.string().valid('user', 'org').optional(),
  follower_type: Joi.string().optional()
});
