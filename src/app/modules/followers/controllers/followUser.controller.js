const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const UserService = require("../../users/services/users.services");
const logger = require("../../../../../logger.conf");

exports.followUser = async (req, res, next) => {
  try {
    // searc for type of account of user to be followed
    const User = new UserService().findAUser({_id: req.body.follower_owner_id});
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
    const data = {
        follower_id: req.user.user_id,
        follower_owner_id: req.body.follower_owner_id,
        follower_type: req.user-user_type,
        following_type: req.body.follower_type

    }
        //  save follower details into db
        const user = await new FollowerService().createFollwer(data)
        return createResponse("Successfully followed A User", user)(res, HTTP.OK);
    }

  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError(err));
  }
};
