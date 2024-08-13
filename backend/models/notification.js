const { required } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const notificationSchema = new mongoose.Schema({
    body:{type:ObjectId}
},{timestamps:true});

const notificationModel = mongoose.model("Notifications", notificationSchema);

module.exports = notificationModel;