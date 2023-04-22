const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishFollowerRecord = (id, data) => {
  try {
    let FollowerPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_FOLLOWER_QUEUE,
      async (msg) => {
        console.log("Publishing.....");
      }
    );
    const channel = FollowerPublisher.getChannel();
    FollowerPublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
