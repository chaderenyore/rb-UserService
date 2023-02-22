const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const UserService = require("../../users/services/users.services");
const logger = require("../../../../../logger.conf");

exports.removeFollwer = async (req, res, next) => {
  try {
    // remove follower record
    const data = {
      follower_id: req.body.follower_id,
      following_id: req.user.user_id,
    };
    // check if the user is a folower of target
    const isFollower = await new FollowerService().findAFollower(data);
    if (!isFollower) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "This User Is Not Your Follower",
            statusCode: HTTP.BAD_REQUEST,
            data: null,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      const User = new FollowerService().deleteOne(data);
      if (!User) {
        return next(
          createError(HTTP.UNAUTHORIZED, [
            {
              status: RESPONSE.ERROR,
              message: "This User Does Not follow You",
              statusCode: HTTP.SERVER_ERROR,
              data: null,
              code: HTTP.UNAUTHORIZED,
            },
          ])
        );
      } else {
        // update following count of follow
        const updatedFollower = await new UserService().update(
          { _id: req.body.follower_id },
          { $inc: { following_count: -1 } }
        );
        // update follower count of following
        const updatedFollowing = await new UserService().update(
          { _id: req.user.user_id },
          { $inc: { follower_count: -1 } }
        );
        return createResponse(" Successfully Removed Follower", User)(
          res,
          HTTP.OK
        );
      }
    }
  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError(err));
  }
};
