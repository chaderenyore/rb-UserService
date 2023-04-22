const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishUserCommentLiikesRecord = (id, data) => {
  try {
    let CommentLikePublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS} publishing...`);
      }
    );
    const channel = CommentLikePublisher.getChannel();
    CommentLikePublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
