const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishFollowerRecord = async (id, data) => {
  try {
    let FollowerPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_FOLLOWER_QUEUE,
      async (msg) => {
        console.log("Publishing.....");
      }
    );
    const channel = FollowerPublisher.getChannel();
    await FollowerPublisher.publish(id, data);
    await FollowerPublisher.error();
  } catch (error) {
    console.error(error);
  }
};
