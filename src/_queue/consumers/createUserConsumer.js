const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys');

const CreateUserConsumer = new Connnection(KEYS.AMQP_URI, KEYS.CREATE_USER_QUEUE,
  async (msg) => {
    const channel = CreateUserConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        email, first_name,
      } = JSON.parse(message);

      try {
    //    create user here
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while sending email: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = CreateUserConsumer;
