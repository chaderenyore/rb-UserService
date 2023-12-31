const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const FollowingService = require("../services/following.service");
const UserService = require("../../users/services/users.services");
const InAppNotifcationPublisher = require("../../../../_queue/publishers/inAppNotification.publishers");
const logger = require("../../../../../logger.conf");

exports.followUser = async (req, res, next) => {
  try {
    // stop user from foloowing themselves
    if (req.user.user_id === req.body.following_id) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Cannot Follow Self",
            statusCode: HTTP.BAD_REQUEST,
            data: null,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    // search for type of account of user to be followed
    const User = await new UserService().findAUser({
      _id: req.body.following_id,
    });
    // search for follower details
    const FollwerUser = await new UserService().findAUser({
      _id: req.user.user_id,
    });
    if (!FollwerUser) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "User Doesn't Exist.. Error 9",
            statusCode: HTTP.BAD_REQUEST,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    if (!User) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "User Doesn't Exist",
            statusCode: HTTP.BAD_REQUEST,
            data: null,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      // search if user is already following the target
      const isFollowing = await new FollowerService().findAFollower({follower_id:req.user.user_id, following_id: req.body.following_id});
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
        const dataForFollower = {
          follower_id: req.user.user_id,
          following_id: req.body.following_id,
          follower_type: req.user.user_type,
          follower_username: FollwerUser.username,
          follower_firstname: FollwerUser.first_name || "",
          follower_lastname: FollwerUser.last_name || "",
          follower_image_url: FollwerUser.image ? FollwerUser.image : "",
        };
        const dataForFollowing = {
          follower_id: req.user.user_id,
          following_id: req.body.following_id,
          following_username: User.username || " ",
          following_image_url: User.image ? User.image : " ",
          following_type: User.user_type,
        }
        // save following details
        const followingUser = await new FollowingService().createFollowing(dataForFollowing);
        //  save follower details into db
        const user = await new FollowerService().createFollwer(dataForFollower);
        if (user) {
          // update following count of follow
          const updatedFollower = await new UserService().update(
            { _id: req.user.user_id },
            { $inc: { 'following_count': 1 } }
          );
          console.log("UPDATED FOLLWER ============== ", updatedFollower);
          // update follower count of following
          const updatedFollowing = await new UserService().update(
            { _id: req.body.following_id },
            { $inc: { 'follower_count': 1 } }
          );
        // publish to InApp Notificaton
        // build data
        let Follower_firstname = FollwerUser.first_name || "";
        let Follower_lastname = FollwerUser.last_name || "";
        const dataToInnAppQueue = {
          user_id: req.body.following_id,
          notification_type: 'follow',
          message: `${FollwerUser.username} just followed you`,
          notifier_image: FollwerUser.image ? FollwerUser.image : "",
          notifier_username: FollwerUser.username,
          notifier_fullname: `${Follower_firstname} ${Follower_lastname}`,
          origin_service: 'User',
          origin_platform: req.query.platform
        }
        // publish here
        await InAppNotifcationPublisher.publishInAppNotifcation(req.body.following_id, dataToInnAppQueue);
          return createResponse("Successfully Followed A User", user)(
            res,
            HTTP.OK
          );
        } else {
          return next(
            createError(HTTP.BAD_REQUEST, [
              {
                status: RESPONSE.ERROR,
                message: "Opps Unknown Error contact support",
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
