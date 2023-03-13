const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { TYPE } = require("../../../../_constants/record.type");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");

exports.getAllUsers = async (req, res, next) => {
  try {
    let data;
    req.query.type === TYPE.USER
      ? (data = { user_type: TYPE.USER })
      : req.query.type === TYPE.ORG
      ? (data = { user_type: TYPE.ORG })
      : (data = {});

    const users = await new UserService().all(
      req.query.limit,
      req.query.page,
      data
    );
    if(users.data.length === 0){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: req.query.type  ? `No Users Of Type ${req.query.type}` : "No Users Found",
            statusCode: HTTP.NOT_FOUND,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      let message = req.query.type ? `Users of type ${req.query.type} retrieved` : "All Users Retrieved";
      return createResponse(message, users)(
        res,
        HTTP.OK
      );
    }

  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
