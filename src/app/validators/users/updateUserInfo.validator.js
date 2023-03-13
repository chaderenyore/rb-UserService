const Joi = require("joi").extend(require("@joi/date"));

exports.updateProfileSchema = Joi.object({
  phone_number: Joi.string()
    // .length(11)
    .pattern(/^\+[0-9]+$/)
    .trim()
    .optional()
    .label("Phone number"),
  username: Joi.string().trim().optional(),
  gender: Joi.string().trim().optional(),
  email: Joi.string().trim().email().optional(),
  first_name: Joi.string().trim().optional(),
  last_name: Joi.string().trim().optional(),
  dob: Joi.date()
    .format(["YYYY/MM/DD", "DD-MM-YYYY", "MM/DD/YYYY"])
    .less("now")
    .message("dob must be in the past")
    .optional(),
  address: Joi.string().trim().optional(),
  street: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  lga: Joi.string().trim().optional(),
  country: Joi.string().trim().optional(),
  web_url: Joi.string().uri().optional(),
  twitter_url: Joi.string().uri().optional(),
  bio: Joi.string().optional()
});
