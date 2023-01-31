const Joi = require("joi").extend(require("@joi/date"));

exports.sortUsersByDateSchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    start_date: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).required(),
    end_date: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).required(),
    user_type: Joi.string().valid('user', 'org').optional()
  });