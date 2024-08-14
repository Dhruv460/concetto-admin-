const { verifyJWT, signJWT } = require("../utils/jwtUtils.js");
const userSchema = require("../models/users.js");
const createError = require("http-errors");
const Err = require("../utils/CustomError.js");
module.exports = {
  deserializeUser: async (req, res, next) => {
    try {
      const {source} = req.query;
      let accessToken = req.cookies.accessToken
        ? req.cookies.accessToken
        : req.body.accessToken;
      let refreshToken = req.cookies.refreshToken
        ? req.cookies.refreshToken
        : req.body.refreshToken;
      if(!accessToken || !refreshToken){
        const error = new Err("Please Login!!" , 401);
        return next(error);
      }
      const { payload, expired } = await verifyJWT(accessToken, 0);
      if (payload && !expired) {
        const userData = await userSchema.findById({ _id: payload._id });

        // Account needs to be verified
        if (userData.verified == false) {
          console.log("user not verified")
          let error = new Err(
            "Please Verify your account first !!!",
            403,
            userData
          );
          return next(error);
        }
        req.user = userData;
        return next();
      }
      if (source == "mobile" || expired && !refreshToken)
        return next(createError.Unauthorized("Please Login!!"));
      const refreshTokenData = await verifyJWT(refreshToken, 1);
      console.log(refreshTokenData);
      const newAccesToken = await signJWT(refreshTokenData.payload._id, 0);
      res.cookie("accessToken", newAccesToken, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      const user = await userSchema.findById({
        _id: refreshTokenData.payload._id,
      });
      req.user = user;
      return next();
    } catch (e) {
      next(e);
    }
  },
};
