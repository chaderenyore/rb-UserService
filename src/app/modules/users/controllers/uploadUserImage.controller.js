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
  if(req.query.type === "cover"){
    await new UserService().update(
      { _id: req.user.user_id },
      { cover_img: req.file?.location }
    );
    return createResponse("Cover Image updated", { coverImage: req.file?.location })(
      res,
      HTTP.OK
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
    const publishTofollowerQueue = await FollowerQueue.publishFollowerRecord(
      req.user.user_id,
      dataToFollower
    );
    const dataToFollowing = {
      following_image_url: req.file?.location
    }
    const publishTofollowingQueue =  await FollowingQueue.publishFollowingRecord(
      req.user.user_id,
      dataToFollowing
    );

    // publish to research queues(research, comments, likes)
    const publishToResearchDetails = await ResearchDetailsQueue.publishUserResearchRecord(req.user.user_id, {imageUrl: req.file?.location});
    const publishToResearchComment =  await ResearchCommentsQueue.publishResearchCommentRecord(req.user.user_id, {imageUrl: req.file?.location});
    const publishToResearchLikes = await ResearchLikesQueue.publishUserResearchLikesRecord(req.user.user_id, {imageUrl: req.file?.location});
    const publishToResearchCommentLikes = await ResearchCommentLikesQueue.publishResearchCommentLiikesRecord(req.user.user_id, {imageUrl: req.file?.location});
    const publsihToResearchCoomentReplies = await ResearchCommentsRepliesQueue.publishCommentRepliesRecord(req.user.user_id, {imageUrl: req.file?.location});

    // publish to posts queues(research, comments, likes)
    const publishToPostDetails = await PostDetailsQueue.publishUserPostRecord(req.user.user_id, {imageUrl: req.file?.location});
    const publishToPostComment = await PostCommentsQueue.publishPostCommentRecord(req.user.user_id, {imageUrl: req.file?.location});
    const publishToPostLikes = await PostLikesQueue.publishUserPostLikesRecord(req.user.user_id, {imageUrl: req.file?.location});
    const publishToPostCommentLikes = await PostCommentLikesQueue.publishUserCommentLiikesRecord(req.user.user_id, {iamgeUrl: req.file?.location});
    const publsihToCoomentReplies = await PostCommentsRepliesQueue.publishCommentRepliesRecord(req.user.user_id, {imageUrl: req.file?.location});

    return createResponse("User Image updated", { image: req.file?.location })(
      res,
      HTTP.OK
    );
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
