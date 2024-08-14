const { required } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true ,unique: true,trim: true},
    participants: [{ type: ObjectId, ref: "Teams" }],
    // type:{type:String ,required:true,trim: true},
    description:{type:String,required:true,trim: true},
    rounds:[{type:String,trim: true}],
    guidlines:{type:String,trim: true},
    contact:{name:{type:String,trim: true},contact:{type:String,trim: true}},
    maxTeamSize:{type:Number},
    minTeamSize:{type:Number},
    eventStartTime:{type:String,trim: true},
    eventEndTime:{type:String,trim: true}
});
const eventsModel=mongoose.model("Events", eventSchema);
module.exports = eventsModel;