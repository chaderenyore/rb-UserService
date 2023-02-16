const Joi = require("joi");

exports.getAllMyFollowingQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    following_type: Joi.string().optional()
  });

exports.getAllMyFollowingBodySchema = Joi.object({
    following_id: Joi.string().required(),
    following_username: Joi.string().optional(),
    following_firstname: Joi.string().optional(),
})  