const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const { authorizeAdmin } = require("../../../middlewares/authorizeAdmin");
const validateRequest = require("../../../middlewares/vallidate");
const CreateUser = require("../../../validators/users/createUser.validator");
const AllUsers = require("../../../validators/users/getAllUsers.validator");
const SingleUser = require("../../../validators/users/getSingleUser.validator");
const SortUser = require("../../../validators/users/sortUser.validator");
const UpdateProfile = require("../../../validators/users/updateUserInfo.validator");
const CreateUserController = require("../controllers/createUser.controller");
const AllUsersController = require("../controllers/adminGetAllUsers.controllers");
const SingleUserController = require("../controllers/getSingleUser.controller");
const UserProfileController = require("../controllers/getUserProfile.controller");
const SortUserController = require("../controllers/adminSortUsers.controllers");
const UpdateUserController = require("../controllers/updateUserInfo.controller");
const UpdateImageController = require("../controllers/uploadUserImage.controller");
const ViewAllUsersController = require("../controllers/viewAllUsersInCommunity.controller");

const uploadFile = require("../../../../_helpers/uploadFile");
const KEYS = require("../../../../_config/keys");

const router = Router();

router.post(
  "/create",
  validateRequest(CreateUser.createUserSchema, "body"),
  CreateUserController.createUser
);

router.get(
  "/profile/:username",
  authorize(["org", "user"]),
  UserProfileController.getUserProfile
);

router.put(
  "/image",
  authorize(["user", "org"]),
  // validateRequest(UpdateProfile.updateProfileSchema, "body"),
  uploadFile("user", KEYS.AWS_ID, KEYS.ACCESS_KEY).single("user_img"),
  UpdateImageController.updateProfilePicture
);
router.get(
  "/all",
  authorizeAdmin(["super", "admin", "support"]),
  validateRequest(AllUsers.getAllUsersSchema, "body"),
  AllUsersController.getAllUsers
);

router.get(
  "/view-users",
  authorize(["user", "org"]),
  validateRequest(AllUsers.getAllUsersSchema, "body"),
  ViewAllUsersController.viewAllUsers
);

router.get(
  "/user/:id",
  authorize(["org", "user"]),
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
  authorize(["org", "user"]),
  validateRequest(UpdateProfile.updateProfileSchema, "body"),
  UpdateUserController.updateUserInfo
);

router.put(
    "/image",
    authorize(["admin", "user", "minder"]),
    // validateRequest(UpdateProfile.updateProfileSchema, "body"),
    uploadFile("users").single("user_img"),
    UpdateImageController.updateProfilePicture
  );
  


module.exports = router;
