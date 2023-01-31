const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const { authorizeAdmin } = require("../../../middlewares/authorizeAdmin");
const validateRequest = require("../../../middlewares/vallidate");
const AllUsers = require("../../../validators/users/getAllUsers.validator");
const SingleUser = require("../../../validators/users/getSingleUser.validator");
const SortUser = require("../../../validators/users/sortUser.validator");
const UpdateProfile = require("../../../validators/users/updateUserInfo.validator");
const AllUsersController = require("../controllers/adminGetAllUsers.controllers");
const SingleUserController = require("../controllers/getSingleUser.controller");
const SortUserController = require("../controllers/adminSortUsers.controllers");
const UpdateUserController = require("../controllers/updateUserInfo.controller");

const uploadFile = require("../../../../_helpers/uploadFile");
const KEYS = require("../../../../_config/keys");

const router = Router();

router.get(
  "/all",
  authorizeAdmin(["super", "admin", "support"]),
  validateRequest(AllUsers.getAllUsersSchema, "body"),
  AllUsersController.getAllUsers
);

router.get(
  "/user/:id",
  authorizeAdmin(["super", "admin", "support"]),
  validateRequest(SingleUser.getUserByIdSchema, "params"),
  SingleUserController.getAUser
);

router.post(
  "/sort",
  authorizeAdmin(["super", "admin", "support"]),
  validateRequest(SortUser.sortUsersByDateSchema, "body"),
  SortUserController.sortUser
);

router.put(
  "/update",
  authorize(["admin", "user", "minder"]),
  validateRequest(UpdateProfile.updateProfileSchema, "body"),
  UpdateUserController.updateUserInfo
);


module.exports = router;
