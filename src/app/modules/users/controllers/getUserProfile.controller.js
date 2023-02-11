const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");
const { RESPONSE } = require("../../../../_constants/response");

exports.getUserProfile = async (req, res, next) => {
  try {
    // build profile to return
    const user = await new UserService().findAUser({
      username: req.params.username,
    });
    if (!user) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "User Does Not Exist",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      return createResponse(`User Profile Retrieved`, user)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
