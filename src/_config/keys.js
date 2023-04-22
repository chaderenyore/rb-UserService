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
  ADMIN_SERVICE_URI: process.env.ADMIN_SERVICE_URI,
  AMQP_URI:process.env.AMQP_URI,
  UPDATE_PROFILE_PHOTO_QUEUE: process.env.UPDATE_PROFILE_PHOTO_QUEUE,
  UPDATE_FOLLOWER_QUEUE: process.env.UPDATE_FOLLOWER_QUEUE,
  UPDATE_FOLLOWING_QUEUE: process.env.UPDATE_FOLLOWING_QUEUE,
  UPDATE_USER_POST_DETAILS: process.env.UPDATE_USER_POST_DETAILS,
  UPDATE_USER_POST_COMMENT_DETAILS: process.env.UPDATE_USER_POST_COMMENT_DETAILS,
  UPDATE_USER_POST_LIKE_DETAILS: process.env.UPDATE_USER_POST_LIKE_DETAILS,
  UPDATE_USER_POST_COMMENTREPLIES_DETAILS: process.env.UPDATE_USER_POST_COMMENTREPLIES_DETAILS,
  UPDATE_USER_POST_COMMENTS_LIKES_DETAILS: process.env.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS,
  UPDATE_USER_RESEARCH_DETAILS: process.env.UPDATE_USER_RESEARCH_DETAILS,
  UPDATE_USER_RESEARCH_COMMENT_DETAILS: process.env.UPDATE_USER_RESEARCH_COMMENT_DETAILS,
  UPDATE_USER_RESEARCH_LIKE_DETAILS: process.env.UPDATE_USER_RESEARCH_LIKE_DETAILS,
  UPDATE_USER_RESEARCH_COMMENTREPLIES_DETAILS: process.env.UPDATE_USER_RESEARCH_COMMENTREPLIES_DETAILS,
  UPDATE_USER_RESEARCH_COMMENTS_LIKES_DETAILS: process.env.UPDATE_USER_RESEARCH_COMMENTS_LIKES_DETAILS,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
};

module.exports = KEYS;
