const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 

const FollowingPublisher = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_FOLLOWING_QUEUE,
  async (msg) => {
    const channel = FollowingPublisher.getChannel();
    return null;
  });

  module.exports = FollowerPublisher;
