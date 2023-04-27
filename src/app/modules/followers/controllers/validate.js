const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const FollowingService = require("../services/following.service");
const logger = require("../../../../../logger.conf");

exports.validateFollowerAndFollowing = async (req, res, next) => {
  try {
    // search for likes in any entry related to like
    const iAmAFollower = await new FollowerService().findAFollower({
      following_id: req.query.id,
      follower_id: req.user.user_id,
    });
    console.log("IAMFollower ==== ", iAmAFollower);
    const iAmAFollowing = await new FollowingService().findAFollowing({
      follower_id: req.query.id,
      following_id: req.user.user_id,
    });
    console.log("IAMAFollowing ==== ", iAmAFollowing);
    if (!iAmAFollower && ! iAmAFollowing) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Following/Follower Invalid",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("Following/Follower Valid", {})(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
