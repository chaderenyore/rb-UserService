const { HTTP } = require("../../../../_constants/http");
const { TYPE } = require("../../../../_constants/record.type");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");

exports.viewAllUsers = async (req, res, next) => {
  try {
    let data;
    req.query.type === TYPE.USER
      ? (data = { user_type: TYPE.USER, is_verified: true })
      : req.query.type === TYPE.ORG
      ? (data = { user_type: TYPE.ORG, is_verified: true })
      : (data = {is_verified: true});

    const users = await new UserService().all(
      req.query.limit,
      req.query.page,
      data
    );
    let resMessage = req.query.type
      ? `Users of type ${req.query.type} retrieved`
      : "All Users Info Fetched";
    return createResponse(resMessage, users)(res, HTTP.OK);
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
