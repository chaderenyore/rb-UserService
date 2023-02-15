const Joi = require("joi").extend(require("@joi/date"));

exports.followUserSchema = Joi.object({
  follower_id: Joi.string().required(),
  follower_owner_id: Joi.string().optional(),
  follower_username: Joi.string().optional(),
  follower_firstname: Joi.string().optional(),
  following_type: Joi.string().optional(),
  follower_type: Joi.string().optional()
});
