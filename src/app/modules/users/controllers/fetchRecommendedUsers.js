const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { TYPE } = require("../../../../_constants/record.type");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");

exports.fetchRecommendedUsers = async (req, res, next) => {
  try {
    const users = await new UserService().fetchAllOrderBy(
      req.query.limit,
      req.query.page,
      {user_type:"user"},
      _,
    {follower_count: -1}
    );
    if(users.data.length === 0){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message:`No Users Found`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("Recommended Users Fetched", users)(
        res,
        HTTP.OK
      );
    }

  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
