const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishPostCommentRecord = async (id, data) => {
  try {
    let PostCommentPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_POST_COMMENT_DETAILS,
      async (msg) => {
        console.log(`${UPDATE_USER_POST_COMMENT_DETAILS} publishing...`);
      }
    );
    const channel = await PostCommentPublisher.getChannel();
    await PostCommentPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
