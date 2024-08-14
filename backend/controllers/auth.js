const { schema } = require("../utils/schema.js");
const userSchema = require("../models/users.js");
const createError = require("http-errors");
const codeSchema = require("../models/referralCode.js");
const { signJWT } = require("../utils/jwtUtils.js");
const bcrypt = require("bcrypt");
const {
  mailSender,
  otpGenerator,
  otpChecker,
  isExpired,
  generateReferralCode,
} = require("../utils/otpSender.js");
const otpSchema = require("../models/otp.js");
const Err = require("../utils/CustomError.js");

module.exports = {
  Register: async (req, res, next) => {
    try {
      const { username, password, email, isISM, refCode , college } = req.body;
      const { source } = req.query;
      // const isJoiValid = await schema.validateAsync({ username, password });

      const doesExist = await userSchema.findOne({ email });
      if (doesExist)
        return next(
          createError.Conflict("User with same email already exists !!")
        );
      let parentData = null;
      console.log("Referral Code" , refCode);
      if (refCode) {
        parentData = await codeSchema.findOne({ refCode: refCode }).populate("ambassador");
        if (!parentData)
          return next(createError.Conflict("Wrong Refferal Code!!"));
        await codeSchema.findOneAndUpdate({refCode : refCode}, {$inc: { referrals : 1 }});
      }
      // Saving in DB
      const user = new userSchema({
        username,
        password,
        email,
        isISM,
        college ,
        parentData : ((parentData) ? parentData.ambassador._id : null),
      });
      const userData = await user.save();
      // Sending OTP
      const otp = otpGenerator();
      const expirationDate = new Date(new Date().getTime() + 10 * 60000); // 10 minutes
      const savedOtp = new otpSchema({
        otp,
        expiration: expirationDate,
        email: email,
      });
      await savedOtp.save();
      try {
        await mailSender(
          email,
          "Verification Email",
          `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp}</p>`
        );
      } catch (err) {
        console.log(e.message);
        console.log("Here");
        next();
      }
      const AT = await signJWT(userData._id, 0);
      const RT = await signJWT(userData._id, 1);
      if (source == "mobile") {
        return res.send({
          success: true,
          user: userData,
          accessToken: AT,
          refreshToken: RT,
        });
      }
      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie("accessToken", AT, {
        expires: new Date(Date.now() + oneDay * 15),
        httpOnly: true,
      });
      res.cookie("refreshToken", RT, {
        expires: new Date(Date.now() + oneDay * 30),
        httpOnly: true,
      });
      return res.send({
        success: true,
        user: userData,
        message: "Otp Sent Successfully !!",
      });
    } catch (e) {
      if (e.isJoi) {
        e.message = "Pass or email wrong!!";
      }
      next(e);
    }
  },

  Login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { source } = req.query;
      // const isJoiValid = await schema.validateAsync({ username, password });

      const userData = await userSchema.findOne({ email });
      if (!userData) return next(new Err("Incorrect Credentials!!", 401));
      const isCorr = await bcrypt.compare(password, userData.password);
      if (!isCorr) {
        const err = new Err("Incorrect Credentials!!", 401);
        return next(err);
      }
        // throw createError.BadRequest("Wrong username or password !!");
      const AT = await signJWT(userData._id, 0);
      console.log(AT);
      const RT = await signJWT(userData._id, 1);
      if (!userData.verified) {
        let errorObj = userData;
        if(source == "mobile"){
          errorObj = {user : userData , accessToken : AT , refreshToken : RT};
        }
        let error = new Err(
          "Please Verify your account first !!!",
          403,
          errorObj
        );
        return next(error);
      }
      // all fine till here
      if (source == "mobile") {
        return res.send({
          success: true,
          user: userData,
          accessToken: AT,
          refreshToken: RT,
        });
      }

      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie("accessToken", AT, {
        expires: new Date(Date.now() + oneDay * 15),
        httpOnly: true,
      });
      res.cookie("refreshToken", RT, {
        expires: new Date(Date.now() + oneDay * 30),
        httpOnly: true,
      });
      return res.send({ user: userData });
    } catch (e) {
      if (e.isJoi) {
        e.message = "Pass or email wrong!!";
      }
      next(e);
    }
  },
  Logout: (req, res, next) => {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.send({ data: "Logged Out Successfully !!" });
    } catch (e) {
      next(e);
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      const { otp, email } = req.body;
      const otpData = await otpSchema.findOne({ email: email });
      if (!otpData) return next(new Err("Please Register First !!", 401));
      if (isExpired(new Date(), otpData)) {
        await otpSchema.findOneAndDelete({ email: email });
        return next(new Err("Otp has Expired , Resend Otp Please !!"), 410);
      }
      if (otpChecker(otp, otpData)) {
        const updateduser = await userSchema.findOneAndUpdate(
          { email: email },
          { verified: true },
          { new: true }
        );
        await otpSchema.findOneAndDelete({ email: email });
        return res.send({ success: true, userData: updateduser });
      }
      return res.send({ success: false, message: "OTP does not match !!!" });
    } catch (err) {
      next(err);
    }
  },
  resendOtp: async (req, res, next) => {
    try {
      const { email } = req.body;
      const otp = otpGenerator();
      const expirationDate = new Date(new Date().getTime() + 10 * 60000); // 10 minutes
      try {
        await mailSender(
          email,
          "Verification Email",
          `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp}</p>`
        );
      } catch (err) {
        console.log(e.message);
        console.log("Here");
        next();
      }
      const newOtpData = await otpSchema.findOneAndUpdate(
        { email: email },
        { $set: { otp: otp, expiration: expirationDate, email: email } },
        { upsert: true, returnDocument: "after" }
      );
      res.send({ success: true, message: "OTP sent Successfully !!" });
    } catch (e) {
      next(e);
    }
  },
};
