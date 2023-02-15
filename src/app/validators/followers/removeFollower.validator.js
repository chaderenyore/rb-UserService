const Joi = require("joi").extend(require("@joi/date"));

exports.removeFollowerSchema = Joi.object({
  follower_id: Joi.string().required(),
});
