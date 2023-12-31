const mongoose = require("mongoose");
const app = require("./src");
const KEYS = require("./src/_config/keys");
const logger = require("./logger.conf");
const FollowerConsumer = require("./src/_queue/consumers/Follower.consumer");
const FollowingConsumer = require("./src/_queue/consumers/Following.consumer");
const BlockUnblockUserConsumer = require("./src/_queue/consumers/BlockUnblockUser.consumer");
const UpdateUserConsumer = require("./src/_queue/consumers/updateUserDetail.consumer");
const VerifyUserConsumer = require("./src/_queue/consumers/verifyUserQueue.consumer");




mongoose.set("strictQuery", true);
mongoose
  .connect(KEYS.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`User Service Database Connected......`);
    const PORT = process.env.PORT || 2101;
    const server = app.listen(PORT, () => {
      logger.info(`User Service has started!... and running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

  FollowerConsumer.consume("Update Follower");
  FollowingConsumer.consume("Update Following");
  BlockUnblockUserConsumer.consume("BlockUnblock User");
  UpdateUserConsumer.consume("Update User Details Consumers");
  VerifyUserConsumer.consume("Verify User Consumers");

