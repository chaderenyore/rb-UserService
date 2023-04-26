const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const FollowingQueue = require("../../../../_queue/publishers/publishFollowing");
const FollowerQueue = require("../../../../_queue/publishers/publishFollower");
const PostCommentsQueue = require("../../../../_queue/publishers/postComments");
const PostCommentsRepliesQueue = require("../../../../_queue/publishers/postComReplies");
const PostCommentLikesQueue = require("../../../../_queue/publishers/userCommentLikesPublisher");
const PostDetailsQueue = require("../../../../_queue/publishers/userPostDetailsPublisher");
const PostLikesQueue = require("../../../../_queue/publishers/userPostLikesPublisher");
const ResearchCommentsQueue = require("../../../../_queue/publishers/researchPublishers/comments");
const ResearchCommentsRepliesQueue = require("../../../../_queue/publishers/researchPublishers/commentReplies");
const ResearchCommentLikesQueue = require("../../../../_queue/publishers/researchPublishers/commentLikesPublisher");
const ResearchDetailsQueue = require("../../../../_queue/publishers/researchPublishers/userResearchDetailsPublisher");
const ResearchLikesQueue = require("../../../../_queue/publishers/researchPublishers/researchLikesLikesPublisher");


const logger = require("../../../../../logger.conf");

exports.updateUserInfo = async (req, res, next) => {
  try {
    // check if same parameters where inputed
    if (Object.entries(req.body).length > 0 === false) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "No Fields Marked For Update",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    const entryTaken = await new UserService().findAUser({
      $or: [
        { email: String(req.body.email)},
        { username: String(req.body.username)},
        { phone_number: String(req.body.phone_number)},
      ],
    });
    if (entryTaken) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: req.body.username
              ? `Username taken`
              : req.body.email
              ? `Email Taken`
              : req.body.phone_number
              ? `Phone Number Taken`
              : {},
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      const updatedUser = await new UserService().update(
        { _id: req.user.user_id },
        req.body
      );
      if (!updatedUser) {
        return next(
          createError(HTTP.BAD_REQUEST, [
            {
              status: RESPONSE.ERROR,
              message: "User Does Not Exist",
              statusCode: HTTP.BAD_REQUEST,
              data: {},
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
        // build data to update followr and following records
        let dataToFollower = {};
        let dataToFollowing = {};
        if (req.body.username) {
          dataToFollower.follower_username = req.body.username;
          dataToFollowing.following_username = req.body.username;
        }
        if (req.body.first_name) {
          dataToFollower.follower_firstname = req.body.first_name;
          dataToFollowing.following_firstname = req.body.first_name;
        }
        if (req.body.last_name) {
          dataToFollower.follower_lastname = req.body.last_name;
          dataToFollowing.following_lastname = req.body.last_name;
        }

        // publish to following and follower queues TODO
        const publishTofollowerQueue =  await FollowerQueue.publishFollowerRecord(req.user.user_id, dataToFollower);
        const publishTofollowingQueue = await FollowingQueue.publishFollowingRecord(req.user.user_id, dataToFollowing);

        return createResponse(`User Record Updated`, updatedUser)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
