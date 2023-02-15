const Joi = require("joi");

exports.getAllMyFollowersQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    follower_type: Joi.string().optional()
  });

exports.getAllMyFollowersBodySchema = Joi.object({
    follower_id: Joi.string().required(),
    follower_username: Joi.string().optional(),
    follower_firstname: Joi.string().optional(),
})  