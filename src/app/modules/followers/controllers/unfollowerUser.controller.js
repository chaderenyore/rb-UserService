const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const logger = require("../../../../../logger.conf");

exports.UnfollowUser = async (req, res, next) => {
  try {
    // remove follower record
    const data = {
        follower_id: req.user.user_id,
        follower_owner_id:req.body.follower_owner_id
    }
    const User = new FollowerService().deleteOne(data)
    if(!User){
        return next(
            createError(HTTP.UNAUTHORIZED, [
              {
                status: RESPONSE.ERROR,
                message: "User Doesn't Exist",
                statusCode: HTTP.SERVER_ERROR,
                data: null,
                code: HTTP.UNAUTHORIZED,
              },
            ])
          );
    } else{
        return createResponse("Unfollowed User Successfully", User)(res, HTTP.OK);
    }

  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError(err));
  }
};
