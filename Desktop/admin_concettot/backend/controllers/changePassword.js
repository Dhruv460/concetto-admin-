const { schema } = require("../utils/schema.js");
const userSchema = require("../models/users.js");
const createError = require("http-errors");
const { signJWT } = require("../utils/jwtUtils.js");
const bcrypt = require("bcrypt");
const {
  mailSender,
  otpGenerator,
  otpChecker,
  isExpired,
} = require("../utils/otpSender.js");
const otpSchema = require("../models/otp.js");
const Err = require("../utils/CustomError.js");

module.exports = {
    generateLink : async(req ,res ,next) => {

    },
    changePass : async(req, res ,next) => {
        
    }

}