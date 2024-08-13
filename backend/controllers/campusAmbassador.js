const { schema } = require("../utils/schema.js");
const userSchema = require("../models/users.js");
const codeSchema = require("../models/referralCode.js");
const createError = require("http-errors");
const { signJWT } = require("../utils/jwtUtils.js");
const bcrypt = require("bcrypt");
const {
  mailSender,
  otpGenerator,
  otpChecker,
  isExpired,
} = require("../utils/otpSender.js");
const { generateUniqueReferralCode } = require("../utils/refCode.js");
const otpSchema = require("../models/otp.js");
const Err = require("../utils/CustomError.js");

module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const { user } = req;
      return res.send({ success: true, userData: user });
    } catch (err) {
      next(err);
    }
  },
  registerAmbassador: async (req, res, next) => {
    try {
      // protected route
      const { phoneNo } = req.body;
      const allRefCodes = await codeSchema.find({});
      const refCodeArray = allRefCodes.map((referral) => referral.refCode);
      // const refCode = generateUniqueReferralCode(refCodeArray);
      const refCode = otpGenerator();
      while (true) {
        if (!refCodeArray.includes(refCode)) break;
        refCode = otpGenerator();
      }
      const newRefCode = new codeSchema({ refCode, ambassador: req.user._id });
      await newRefCode.save();
      const updatedUser = await userSchema.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            phoneNo: phoneNo,
            refCode: newRefCode._id,
            isAmbassador: true,
          },
        }
      );
      return res.send({
        success: true,
        userdata: req.user,
        refCode: newRefCode,
      });
    } catch (err) {
      next(err);
    }
  },
  getLeaderBoard : async(req ,res , next) => {
    try{
      const leaderBoard = await codeSchema.find({}).sort({referrals : -1});
      res.send({success : true, leaderBoard : leaderBoard});

    }catch(err){
      next(err);
    }
  }
};
