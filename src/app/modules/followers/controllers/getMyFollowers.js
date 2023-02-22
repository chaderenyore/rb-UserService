const { HTTP } = require("../../../../_constants/http");
const { TYPE } = require("../../../../_constants/record.type");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const FollowerService = require("../services/followers.services");
const logger = require("../../../../../logger.conf");

exports.getAllMyFollowers = async (req, res, next) => {
  try {
    let data;
    // if type is passed
    if(req.query.follower_type){
      data = {
        following_id: req.user.user_id,
        follower_type: req.query.follower_type,
      };
    } else{
      data = {
        following_id: req.user.user_id,
      }
    }

    const users = await new FollowerService().all(
      req.query.limit,
      req.query.page,
      data
    );
    // check if users have followers or nahh
    if(users.data.length === 0){
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: req.query.follower_type ? `You Have No followers of type ${req.query.follower_type}` : "You Are Have No Followers",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      const resMsg = req.query.follower_type ? `Your Followers of type ${req.query.follower_type} retrieved`: `All Followers fetched`;
      return createResponse(
        resMsg,
        users
      )(res, HTTP.OK);
    }

  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
