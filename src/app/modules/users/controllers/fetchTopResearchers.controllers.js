const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const { TYPE } = require("../../../../_constants/record.type");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");

exports.fetchTopResearchers = async (req, res, next) => {
  try {
    const users = await new UserService().fetchAllOrderBy(
      req.query.limit,
      req.query.page,
      {user_type:"user"},
      _,
    {total_public_research: -1}
    );
    if(users.data.length === 0){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message:`No Top Researcher Found`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("Top Researchers Retrieved", users)(
        res,
        HTTP.OK
      );
    }

  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
