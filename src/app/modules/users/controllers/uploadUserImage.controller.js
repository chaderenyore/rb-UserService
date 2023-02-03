const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");

exports.updateProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "Please specify a file to upload.",
            statusCode: HTTP.SERVER_ERROR,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }

    await new UserService().update(
      { _id: req.user.user_id },
      { image: req.file?.location }
    );
    return createResponse("User Image updated", { image: req.file?.location })(
      res,
      HTTP.OK
    );
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
