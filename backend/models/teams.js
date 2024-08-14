const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    event: { type: ObjectId, ref: "Events" },
    members: [{ type: ObjectId, ref: "User" }],
    leader: { type: ObjectId, ref: "User" },
});

const teamModel=mongoose.model("Teams", teamSchema);
module.exports = teamModel;