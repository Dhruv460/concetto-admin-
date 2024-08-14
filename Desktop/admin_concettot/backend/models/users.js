const { number } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
  contact: {
    type: Number,
    unique: true
  },
  isISM: {
    type: Boolean,
    default: false
  },
  isAmbassador: {
    type: Boolean,
    default: false
  },
  refCode: {
    type: ObjectId,
    ref: "RefCode"
  },
  phoneNo: {
    type: Number,
  },
  parentData: {
    type: ObjectId,
    ref: "User"
  },
  college: {
    type: String,
  },
  events: [{ type: ObjectId, ref: "Events" }],
  // notifications:[{type:ObjectId,ref:"Notifications"}],
  teams:[{type:ObjectId,ref:"Teams"}]
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      console.log("Pass : ", this.password);
      const hashed = await bcrypt.hash(this.password, 10);
      console.log("hashed : ", hashed);
      this.password = hashed;
    }
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model("User", userSchema);