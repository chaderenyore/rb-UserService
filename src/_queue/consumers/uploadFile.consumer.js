const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys');

const UploadFileConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_PROFILE_PHOTO_QUEUE,
  async (msg) => {
    const channel = UploadFileConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        email, first_name,
      } = JSON.parse(message);

      try {
    //    upload file here
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while sending email: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = UploadFileConsumer;
