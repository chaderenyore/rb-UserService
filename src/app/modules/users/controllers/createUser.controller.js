const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const UserService = require("../services/users.services");
const logger = require("../../../../../logger.conf");

exports.createUser = async (req, res, next) => {
  try {
    //  verify user exist=====check the login model
    const user = await new UserService().findAUser({ email: req.body.email });
    console.log("PHONE NUMBER ================ ", req.body.phone_number);
    const phoneNumberExists = await new UserService().findAUser({
      phone_number: req.body.phone_number,
    });

    logger.info("USER: " + user);
    if (user) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "User Already Exists",
            statusCode: HTTP.SERVER_ERROR,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    console.log(
      "PHONE NUMBER EXISTS ====================== ",
      phoneNumberExists
    );
    if (req.body.phone_number && phoneNumberExists) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "Phone Number Already in use",
            statusCode: HTTP.SERVER_ERROR,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    // create user
    const newUser = await new UserService().createUser(req.body);
    console.log("NEW USER : ========= : ", newUser);
    return createResponse("User Created", newUser)(res, HTTP.OK);
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
