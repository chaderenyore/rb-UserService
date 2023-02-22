const Joi = require("joi");

exports.getAllMyFollowersQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    follower_type: Joi.string().valid('user', 'org').optional()
  });
