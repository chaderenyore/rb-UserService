const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
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
    req.query.user_type === TYPE.USER
      ? (sortCondition = {
          user_type: TYPE.USER,
          created_at: {
            $gte: req.query.start_date,
            $lt: req.query.end_date,
          },
        })
      : req.query.user_type === TYPE.ORG
      ? (sortCondition = {
          user_type: TYPE.ORG,
          created_at: {
            $gte: req.query.start_date,
            $lt: req.query.end_date,
          },
        })
      : (sortCondition = {
          created_at: {
            $gte: req.query.start_date,
            $lt: req.query.end_date,
          },
        });
    const users = await new UserService().all(
      req.query.limit,
      req.query.page,
      sortCondition
    );
    if (users.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: req.body.type
              ? `No User Of type ${req.query.type} found`
              : "No User Found",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(`Users Sorted`, users)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
