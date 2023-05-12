const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowingService = require("../services/following.service");
const logger = require("../../../../../logger.conf");

exports.validateFollowerAndFollowing = async (req, res, next) => {
  try {
    // search for likes in any entry related to like
    const iAmAFollowing = await new FollowingService().findAFollowing({
      following_id: req.query.id,
      follower_id: req.user.user_id,
    });
    if (!iAmAFollowing) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Follower Invalid",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("Follower Valid", {})(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
