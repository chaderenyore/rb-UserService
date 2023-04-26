const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const FollowingService = require('../../app/modules/followers/services/following.service');

const FollowingConsumer = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_FOLLOWING_QUEUE,
  async (msg) => {
    const channel = await FollowingConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        id,
        bodyData
      } = JSON.parse(message);

      try {
    //    update records here
    const updatedrecords = await new FollowingService().updateMany({following_id:id}, bodyData);
    
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while updating following: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
    return null;
  });

  module.exports = FollowingConsumer;
