const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const UserService = require('../services/users.services');
const logger  = require('../../../../../logger.conf');


exports.updateUserInfo = async (req, res, next) => {
  try {
    // check if same parameters where inputed
    if((Object.entries(req.body).length > 0) === false){
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: 'No Fields Marked For Update',
            statusCode: HTTP.BAD_REQUEST,
            data:{},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    if(req.body.phone_number || req.body.username || req.body.email){
      const entryTaken = await new UserService().findAUser({ $or:[ {'email':req.body.email}, {'username':req.body.username}, {'phone_number':req.body.phone_number} ]});
      if(entryTaken){
        return next(
          createError(HTTP.BAD_REQUEST, [
            {
              status: RESPONSE.ERROR,
              message: req.body.username ? `Username taken`: req.body.email ? `Email Taken` : req.body.phone_number ? `Phone Number Taken` : {},
              statusCode: HTTP.BAD_REQUEST,
              data:{},
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      }
    }
    const updatedUser = await new UserService().update (
        {_id: req.user.user_id},
        req.body,
      );
  if (!updatedUser) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: 'User Does Not Exist',
          statusCode: HTTP.BAD_REQUEST,
          data:{},
          code: HTTP.BAD_REQUEST,
        },
      ])
    );
  } else {
    return createResponse(`User Record Updated`, updatedUser)(res, HTTP.OK);
  }
  
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
