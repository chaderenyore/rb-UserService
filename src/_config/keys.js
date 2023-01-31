const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  mongoURI: process.env.MONGODBURI,
  JWTSecret: process.env.JWTSECRET,
  expiresIn: process.env.EXPIRES_IN,
  redisHost: process.env.REDISHOST,
  redisPort: process.env.REDISPORT,
  redisPassword: process.env.REDISPASSWORD,
  appVersion: process.env.APP_VERSION,
  AUTH_URI: process.env.AUTH_URI,
  AMQP_URI:process.env.AMQP_URI,
  UPDATE_PROFILE_PHOTO_QUEUE: process.env.UPDATE_PROFILE_PHOTO_QUEUE,
  CREATE_USER_QUEUE: process.env.CREATE_USER_QUEUE,
};

module.exports = KEYS;
