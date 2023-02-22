const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.unfollowUserSchema = Joi.object({
    following_id: Joi.objectId().required(),
});
