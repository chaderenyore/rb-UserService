const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishUserCommentLiikesRecord = async (id, data) => {
  try {
    let CommentLikePublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS} publishing...`);
      }
    );
    const channel = await CommentLikePublisher.getChannel();
    await CommentLikePublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
