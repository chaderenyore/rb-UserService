const Joi = require("joi").extend(require("@joi/date"));

exports.unfollowUserSchema = Joi.object({
    follower_owner_id: Joi.string().optional(),
});
