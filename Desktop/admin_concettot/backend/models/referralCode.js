const { number, required } = require('joi');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const bcrypt = require("bcrypt");


const codeSchema = new mongoose.Schema({
    refCode : {
        type : String , 
        required : true
    },
    ambassador : {
        type : ObjectId , 
        ref : "User",
        required : true
    },
    referrals : {
        type : Number , 
        default : 0
    },
    revenue : {
        type : Number , 
        default : 0
    }
});

module.exports = mongoose.model("RefCode" , codeSchema);