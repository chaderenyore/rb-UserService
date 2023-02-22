const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 

const FollowerPublisher = new Connnection(KEYS.AMQP_URI, KEYS.UPDATE_FOLLOWER_QUEUE,
  async (msg) => {
    const channel = FollowerPublisher.getChannel();
    return null;
  });

  module.exports = FollowerPublisher;
