const { required } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const notificationSchema = new mongoose.Schema({
    time:{type:Date,required:true},
    creator:{type:String},
    body:{type:String}
});

module.exports = mongoose.model("Notifications", notificationSchema);