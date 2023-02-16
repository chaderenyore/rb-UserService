const { HTTP } = require("../../../../_constants/http");
const { TYPE } = require("../../../../_constants/record.type");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");

exports.sortUser = async (req, res, next) => {
  try {
    // build profile to return
    let sortCondition = {};

    // set condition for sort
    req.body.user_type === TYPE.USER
      ? (sortCondition = {
          user_type: TYPE.USER,
          created_at: {
            $gte: req.body.start_date,
            $lt: req.body.end_date,
          },
        })
      : req.body.user_type === TYPE.ORG
      ? (sortCondition = {
          user_type: TYPE.ORG,
          created_at: {
            $gte: req.body.start_date,
            $lt: req.body.end_date,
          },
        })
      : (sortCondition = {
          created_at: {
            $gte: req.body.start_date,
            $lt: req.body.end_date,
          },
        });
    const users = await new UserService().all(
      req.query.limit,
      req.query.page,
      sortCondition
    );
    if (users.length === 0) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: req.body.type
              ? `No User Of type ${req.body.type} found`
              : "No User Found",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      return createResponse(`Users retirieved`, users)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
