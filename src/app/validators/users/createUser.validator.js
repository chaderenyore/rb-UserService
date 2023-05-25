const Joi = require("joi").extend(require("@joi/date"));

exports.createUserSchema = Joi.object().keys({
  phone_number: Joi.string()
    .pattern(/^\+[0-9]+$/)
    .trim()
    .label("Phone number"),
  email: Joi.string().email().trim().required(),
  auth_type: Joi.string().optional().valid("gg", "fb", "ap", "lc"),
  image: Joi.string().uri().optional(),
  imei: Joi.string().optional(),
  gender: Joi.string().trim().optional(),
  dob: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).utc().optional(),
  referral_code: Joi.string().trim().optional(),
  invite_code:Joi.string().optional(),
  username: Joi.string()
    .trim()
    .when("email", {
      not: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .label("username or email"),
  name: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  referral_code: Joi.string().trim().optional(),
  referral_count: Joi.number().positive().optional(),
  user_type: Joi.string().trim().valid("user", "org").required(),
  address: Joi.string().optional(),
  street: Joi.string().optional(),
  city: Joi.string().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
});
