const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");
const FollowUser = require("../../../validators/followers/followUser.validator");
const RemoveFollower = require("../../../validators/followers/removeFollower.validator");
const UnfollowUser = require("../../../validators/followers/unfollowUser.validator");
const GetMyFollowers = require("../../../validators/followers/getAllMyFollower.validator");
const GetMyFollowing = require("../../../validators/followers/getAllMyFollowing.validator");
const FollowUserController = require("../controllers/followUser.controller");
const RemoveFollowerController = require("../controllers/removeFollower.controllers");
const UnfollowUserController = require("../controllers/unfollowerUser.controller");
const AllMyFollwersController = require("../controllers/getMyFollowers");
const AllMyFollowingController = require("../controllers/getMyFollowing.controller");


const router = Router();

router.post(
  "/follow",
  authorize(["org", "user"]),
  validateRequest(FollowUser.followUserSchema, "body"),
  FollowUserController.followUser
);

router.post(
  "/remove-follower",
  authorize(["org", "user"]),
  validateRequest(RemoveFollower.removeFollowerSchema, "body"),
  RemoveFollowerController.removeFollwer
);

router.post(
  "/unfollow",
  authorize(["user", "org"]),
  validateRequest(UnfollowUser.unfollowUserSchema, "body"),
  UnfollowUserController.UnfollowUser
);
router.get(
  "/follwers-all",
  authorize(["user", "org"]),
  validateRequest(GetMyFollowers.getAllMyFollowersBodySchema, "body"),
  AllMyFollwersController.getAllMyFollowers
);

router.get(
  "/following-all",
  authorize(["user", "org"]),
  validateRequest(GetMyFollowing.getAllMyFollowingQuerySchema, "query"),
  AllMyFollowingController.getAllMyFollowing
);

module.exports = router;
