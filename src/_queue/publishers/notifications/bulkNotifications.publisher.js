const { Connnection } = require("../../index");
const KEYS = require("../../../_config/keys");

exports.sendFollowersNotifications = async (id, data) => {
  try {
    let NotifyFollowersPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.SEND_FOLLOWERS_NOTIFICATION,
      async (msg) => {
        console.log(`${KEYS.SEND_FOLLOWERS_NOTIFICATION} publishing...`);
      }
    );
    const channel = await NotifyFollowersPublisher.getChannel();
    await NotifyFollowersPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
