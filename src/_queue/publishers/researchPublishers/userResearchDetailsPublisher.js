const { Connnection } = require("../../index");
const KEYS = require("../../../_config/keys");

exports.publishUserResearchRecord = async (id, data) => {
  try {
    let ResearchPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_RESEARCH_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_RESEARCH_DETAILS} publishing...`);
      }
    );
    const channel = await ResearchPublisher.getChannel();
    await ResearchPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
