const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishUserPostRecord = async (id, data) => {
  try {
    let PostPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_POST_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_POST_DETAILS} publishing...`);
      }
    );
    const channel = PostPublisher.getChannel();
    await PostPublisher.publish(id, data);
    await PostPublisher.error()
  } catch (error) {
    console.error(error);
  }
};
