const { HTTP } = require("../../../../_constants/http");
const { TYPE } = require("../../../../_constants/record.type");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const logger = require("../../../../../logger.conf");

exports.getAllMyFollowing = async (req, res, next) => {
  try {
    // create query data tosearch
    let data;
    if(req.query.follower_type){
       data = {
        follower_id: req.user.user_id,
        following_type: req.query.follower_type,
      };
    } else {
      data = {
        follower_id: req.user.user_id
      };
    }
 
    const users = await new FollowerService().all(
      req.query.limit,
      req.query.page,
      data
    );
    const resMsg = req.query.following_type ? `Your Following of type ${req.query.following_type} retrieved`: `All Your Following retrieved`;
    return createResponse(
      resMsg,
      users
    )(res, HTTP.OK);
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
