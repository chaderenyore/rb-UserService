const { Connnection } = require("../../index");
const KEYS = require("../../../_config/keys");

exports.publishResearchCommentLiikesRecord = async (id, data) => {
  try {
    let ResearchCommentLikePublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_RESEARCH_COMMENTS_LIKES_DETAILS,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS} publishing...`);
      }
    );
    const channel = ResearchCommentLikePublisher.getChannel();
    await ResearchCommentLikePublisher.publish(id, data);
  } catch (error) {
    console.error(error);
  }
};
