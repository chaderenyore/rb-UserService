const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishUserPostRecord = (id, data) => {
  try {
    let PostPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_POST_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_POST_DETAILS} publishing...`);
      }
    );
    const channel = PostPublisher.getChannel();
    PostPublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
