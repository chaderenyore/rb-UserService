const { HTTP } = require("../../../../_constants/http");
const { TYPE } = require("../../../../_constants/record.type");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const logger = require("../../../../../logger.conf");

exports.getAllMyFollowers = async (req, res, next) => {
  try {
    const data = {
      follower_id: req.user.user_id,
      following_type: req.body.following_type,
    };
    const users = await new FollowerService().all(
      req.query.limit,
      req.query.page,
      data
    );
    return createResponse(
      `Succesfully fetched All ${req.body.following_type} Followers`,
      users
    )(res, HTTP.OK);
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
