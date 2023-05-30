const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const UserService = require('../../app/modules/users/services/users.services');

const UpdateUserDetailsConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_USER_DETAILS_QUEUE,
  async (msg) => {
    const channel = await UpdateUserDetailsConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedUser = await new UserService().update({_id:id}, bodyData);
    console.log("Updated User ", updatedUser)
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating user: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
    return null;
  });

  module.exports = UpdateUserDetailsConsumer;
