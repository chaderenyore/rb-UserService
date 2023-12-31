const { Connnection } = require("../../index");
const KEYS = require("../../../_config/keys");

exports.publishResearchCommentLiikesRecord = async (id, data) => {
  try {
    let ResearchCommentLikePublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_RESEARCH_COMMENTS_LIKES_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_RESEARCH_COMMENTS_LIKES_DETAILS} publishing...`);
      }
    );
    const channel = await ResearchCommentLikePublisher.getChannel();
    await ResearchCommentLikePublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
