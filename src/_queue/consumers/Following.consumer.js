const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const FollowingService = require('../../app/modules/followers/services/following.service');

const FollowingConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_FOLLOWING_QUEUE,
  async (msg) => {
    const channel = FollowingConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        following_id,
        data
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedrecords = await new FollowingService().updateMany({following_id:following_id}, data);
    
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating following: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = FollowingConsumer;
