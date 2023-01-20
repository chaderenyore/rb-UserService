const { Router } = require("express");
const User = require("./modules/users/routes/users.routes");
const Follower = require("./modules/followers/routes/followers.routes");




module.exports = () => {
  
  const router = Router();

//   router.use("/", User);
//   router.use("/", Follower);
  return router;
};
