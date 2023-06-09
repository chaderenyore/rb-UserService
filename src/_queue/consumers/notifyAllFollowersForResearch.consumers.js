const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const NotifyFollowersPublishers = require("../publishers/notifications/bulkNotifications.publisher");
const FollowerService = require("../../app/modules/followers/services/followers.services");

const NotifyFollowersConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.NOTIFY_FOLLOWERS_QUEUE,
  async (msg) => {
    const channel = await NotifyFollowersConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //  search for followers
        let followersIds = [];
        const myFollowers = await new FollowerService().findAllFollowers({
          following_id: id,
        });
        for (let i = 0; i < myFollowers.length; i++) {
          followersIds.push(myFollowers[i].follower_id);
        }
        //   publish to bulk notification queue
        const publishhedmessage =
          await NotifyFollowersPublishers.sendFollowersNotifications(
            followersIds,
            bodyData
          );
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while notifying followers: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on("exit", (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
    });
    return null;
  }
);

module.exports = NotifyFollowersConsumer;
