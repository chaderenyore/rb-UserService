const { HTTP } = require("../../../../_constants/http");
const { TYPE } = require("../../../../_constants/record.type");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowingService = require("../services/following.service");
const logger = require("../../../../../logger.conf");

exports.getAllMyFollowing = async (req, res, next) => {
  try {
    // create query data tosearch
    let data;
    if(req.query.following_type){
       data = {
        follower_id: req.user.user_id,
        following_type: req.query.following_type,
      };
    } else {
      data = {
        follower_id: req.user.user_id
      };
    }
 
    const users = await new FollowingService().all(
      req.query.limit,
      req.query.page,
      data
    );
    console.log("FOllowing ======== " , users)
    // check if user is follwing any other user
    if(users.data.length === 0){
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: req.query.following_type ? `You Are Not Following any ${req.query.following_type}` : "You Are Not Following any user or organizations",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      const resMsg = req.query.following_type ? `Your Following of type ${req.query.following_type} retrieved`: `All Users You Follow Retrieved`;
      return createResponse(
        resMsg,
        users
      )(res, HTTP.OK);
    }

  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
