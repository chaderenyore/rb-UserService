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
    const channel = await FollowerPublisher.getChannel();
    await FollowerPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
