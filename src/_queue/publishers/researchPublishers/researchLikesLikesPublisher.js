const { Connnection } = require("../../index");
const KEYS = require("../../../_config/keys");

exports.publishUserResearchLikesRecord = async (id, data) => {
  try {
    let ResearchLikesPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_RESEARCH_LIKE_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_RESEARCH_LIKE_DETAILS} publishing...`);
      }
    );
    const channel = await ResearchLikesPublisher.getChannel();
    await ResearchLikesPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
