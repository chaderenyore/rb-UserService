const { Connnection } = require("../../index");
const KEYS = require("../../../_config/keys");

exports.publishResearchCommentRecord = async (id, data) => {
  try {
    let ResearchCommentPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_RESEARCH_COMMENT_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_RESEARCH_COMMENT_DETAILS} publishing...`);
      }
    );
    const channel = ResearchCommentPublisher.getChannel();
    await ResearchCommentPublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
