const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const UserService = require('../../app/modules/users/services/users.services');

const VerifyUserConsumer = new Connnection(KEYS.AMQP_URI, KEYS.VERIFY_USER_QUEUE,
  async (msg) => {
    const channel = await VerifyUserConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedRecord = await new UserService().update({user_id:id}, bodyData);
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating verification Status: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
    return null;
  });

  module.exports = VerifyUserConsumer;
