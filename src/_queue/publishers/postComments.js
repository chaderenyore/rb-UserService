const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishPostCommentRecord = (id, data) => {
  try {
    let PostCommentPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_POSTCOMMENT_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_POST_DETAILS} publishing...`);
      }
    );
    const channel = PostCommentPublisher.getChannel();
    PostCommentPublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
