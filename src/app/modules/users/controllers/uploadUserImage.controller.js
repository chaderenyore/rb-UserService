const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const FollowingQueue = require("../../../../_queue/publishers/publishFollowing");
const FollowerQueue = require("../../../../_queue/publishers/publishFollower");
const logger = require("../../../../../logger.conf");

exports.updateProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "Please specify a file to upload.",
            statusCode: HTTP.SERVER_ERROR,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }

    await new UserService().update(
      { _id: req.user.user_id },
      { image: req.file?.location }
    );
    // publish to following and follower queues TODO
    const dataToFollower = {
      follower_image_url: req.file?.location
    }
    const publishTofollowerQueue = FollowerQueue.publishFollowerRecord(
      req.user.user_id,
      dataToFollower
    );
    console.log("PUBLISH OBJECT ===== ", publishTofollowerQueue);
    const dataToFollowing = {
      following_image_url: req.file?.location
    }
    const publishTofollowingQueue =  FollowingQueue.publishFollowingRecord(
      req.user.user_id,
      dataToFollowing
    );
    return createResponse("User Image updated", { image: req.file?.location })(
      res,
      HTTP.OK
    );
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
