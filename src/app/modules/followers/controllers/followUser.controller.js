const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const UserService = require("../../users/services/users.services");
const logger = require("../../../../../logger.conf");

exports.followUser = async (req, res, next) => {
  try {
    // stop user from foloowing themselves
    if (req.user.user_id === req.body.follower_owner_id) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Cannot Follow Self",
            statusCode: HTTP.SERVER_ERROR,
            data: null,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    // search for type of account of user to be followed
    const User = await new UserService().findAUser({
      _id: req.body.follower_owner_id,
    });
    console.log("USER ================ ", User);
    if (!User) {
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
    } else {
      //Todo STop unverifed users from following each other------- hack stop
      const data = {
        follower_id: req.user.user_id,
        follower_owner_id: req.body.follower_owner_id,
        follower_type: req.user.user_type,
        following_type: User.user_type,
      };
      // search ifn user is already following the target
      const isFollowing = await new FollowerService().findAFollower({follower_id:req.user.user_id, follower_owner_id: req.body.follower_owner_id});
      console.log("ISFOLLOWING ======================= ", isFollowing)
      if (isFollowing) {
        return next(
          createError(HTTP.BAD_REQUEST, [
            {
              status: RESPONSE.ERROR,
              message: "You ALready Followed This User",
              statusCode: HTTP.SERVER_ERRORs,
              data: null,
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
        //  save follower details into db
        const user = await new FollowerService().createFollwer(data);
        if (user) {
          // update following count of follow
          const updatedFollower = await new UserService().update(
            { _id: req.user.user_id },
            { $inc: { 'following_count': 1 } }
          );
          console.log("UPDATED FOLLWER ============== ", updatedFollower);
          // update follower count of following
          const updatedFollowing = await new UserService().update(
            { _id: req.body.follower_owner_id },
            { $inc: { 'follower_count': 1 } }
          );
          console.log("UPDATED FOLLWING ============== ", updatedFollowing);
          return createResponse("Successfully Followed A User", user)(
            res,
            HTTP.OK
          );
        } else {
          return next(
            createError(HTTP.BAD_REQUEST, [
              {
                status: RESPONSE.ERROR,
                message: "Error 9", // error 9 will be flagged as an hack attempt
                statusCode: HTTP.SERVER_ERROR,
                data: null,
                code: HTTP.BAD_REQUEST,
              },
            ])
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError(err));
  }
};
