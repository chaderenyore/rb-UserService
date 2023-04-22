const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishFollowingRecord = (id, data) => {
  try {
    const FollowingPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_FOLLOWING_QUEUE,
      async (msg) => {
        console.log("Publishing......");
      }
    );
    const channel = FollowingPublisher.getChannel();
    FollowingPublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
