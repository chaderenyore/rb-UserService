const { HTTP } = require('../../../../_constants/http');
const { RESPONSE} = require("../../../../_constants/response");
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const UserService = require('../services/users.services');
const logger  = require('../../../../../logger.conf');


exports.getAUser = async (req, res, next) => {
  try {

  const user = await new UserService().findUserById({_id: req.params.id});
  if (!user) {
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
    return createResponse(`User retirieved`, user)(res, HTTP.OK);
  }
  
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
