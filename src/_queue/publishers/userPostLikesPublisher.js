const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishUserPostLikesRecord = (id, data) => {
  try {
    let PostLikesPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_POST_LIKES_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_POST_LIKES_DETAILS} publishing...`);
      }
    );
    const channel = PostLikesPublisher.getChannel();
    PostLikesPublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
