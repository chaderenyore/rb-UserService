const { Connnection } = require("../../index");
const KEYS = require("../../../_config/keys");

exports.publishCommentRepliesRecord = async (id, data) => {
  try {
    let CommentRepliesPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_RESEARCH_COMMENTREPLIES_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_RESEARCH_COMMENTREPLIES_DETAILS} publishing...`);
      }
    );
    const channel = CommentRepliesPublisher.getChannel();
    await CommentRepliesPublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
