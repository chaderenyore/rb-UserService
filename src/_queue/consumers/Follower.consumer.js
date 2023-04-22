const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const FollowerService = require('../../app/modules/followers/services/followers.services');

const FollowerConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_FOLLOWER_QUEUE,
  async (msg) => {
    const channel = FollowerConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedrecords = await new FollowerService().updateMany({follower_id:id}, bodyData);
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating follower: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  });

  module.exports = FollowerConsumer;
