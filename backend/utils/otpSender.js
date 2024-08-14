const nodemailer = require("nodemailer");
const otpGen = require("otp-generator");
// const nanoid = require("nanoid");
require("dotenv").config();

module.exports = {
  mailSender: async (email, title, body) => {
    try {
      // Create a Transporter to send emails
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
      // Send emails to users
      let info = await transporter.sendMail({
        from: "barmanayush2980@gmail.com",
        to: email,
        subject: title,
        html: body,
      });
      console.log("Email info: ", info);
      return info;
    } catch (error) {
      console.log(error.message);
    }
  },
  otpGenerator: () => {
    let otp = otpGen.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    return otp;
  },
  isExpired: (currDate, otpObj) => {
    const diff = otpObj.expiration - currDate;
    if (diff < 0) return true;
    return false;
  },
  otpChecker: (otp, otpObj) => {
    let currDate = new Date();
    const diff = otpObj.expiration - currDate;
    if (parseInt(otp) == parseInt(otpObj.otp) && diff >= 0) return true;
    return false;
  },
  generateReferralCode: (length = 8) => {
    // return nanoid(length);
    return 89;
  },
};
