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
    const channel = await PostPublisher.getChannel();
    await PostPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
