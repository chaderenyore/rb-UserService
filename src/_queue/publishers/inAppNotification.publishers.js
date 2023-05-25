const { Connnection } = require("../../index");
const KEYS = require("../../_config/keys");

exports.publishInAppNotifcation = async (id, notificationType, data) => {
  try {
    let NotificationPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.IN_APP_NOTIFICATION_QUEUE,
      async (msg) => {
        console.log(`${KEYS.IN_APP_NOTIFICATION_QUEUE} publishing...`);
      }
    );
    const channel = await NotificationPublisher.getChannel();
    await NotificationPublisher.publish(id,notificationType, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
