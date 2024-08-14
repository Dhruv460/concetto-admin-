const { number, required } = require('joi');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const bcrypt = require("bcrypt");

const otpModal = new mongoose.Schema({
    otp : {
        type : String , 
        required : true
    },
    expiration : {
        type : Date , 
        required : true
    },
    email : {
        type : String, 
        required : true
    }
})



module.exports = mongoose.model("Otp" , otpModal);