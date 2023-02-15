const { HTTP } = require('../../../../_constants/http');
const {TYPE} = require ('../../../../_constants/record.type');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const FollowerService = require('../services/followers.services');
const logger  = require('../../../../../logger.conf');

exports.getAllMyFollowers = async (req, res, next) => {
  try {
    const data = {
        follower_owner_id: req.user.user_id,
        follower_type: req.query.follower_type
    }
  const users = await new FollowerService().all(req.query.limit, req.query.page, data);
          return createResponse(`Your Followers of type ${req.query.follower_type} retrieved`, users)(res, HTTP.OK);
  
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};