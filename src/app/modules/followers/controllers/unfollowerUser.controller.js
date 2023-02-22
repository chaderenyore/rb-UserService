const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const UserService = require("../../users/services/users.services");
const logger = require("../../../../../logger.conf");

exports.UnfollowUser = async (req, res, next) => {
  try {
    const data = {
      follower_id: req.user.user_id,
      following_id: req.body.following_id,
    };
    // check if the user is a folower of target
    const isFollowing = await new FollowerService().findAFollower(data);
    if(!isFollowing){
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "You Do Not Follow This User",
            statusCode: HTTP.BAD_REQUEST,
            data: null,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
          // remove follower record
    const User = new FollowerService().deleteOne(data);
    if (!User) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "You Are Not Following This User",
            statusCode: HTTP.SERVER_ERROR,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    } else {
      // update following count of follow
      const updatedFollower = await new UserService().update(
        { _id: req.user.user_id },
        { $inc: { following_count: -1 } }
      );
      // update follower count of following
      const updatedFollowing = await new UserService().update(
        { _id: req.body.follower_owner_id },
        { $inc: { follower_count: -1 } }
      );
      return createResponse("Unfollowed User Successfully", User)(res, HTTP.OK);
    }
    }
 
  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError(err));
  }
};
