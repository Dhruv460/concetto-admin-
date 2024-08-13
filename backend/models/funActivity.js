const { required } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const activitySchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    description:{type:String,required:true},
    contact:{name:{type:String},contact:{type:String}}
});

module.exports = mongoose.model("Activities", activitySchemaSchema);