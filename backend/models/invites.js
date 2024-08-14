const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const inviteSchema = new mongoose.Schema({
    toUser: { type: ObjectId, ref: "User" },
    fromUser: { type: ObjectId, ref: "User" },
    team: { type: ObjectId, ref: "Teams" },
});



module.exports = mongoose.model("Invites",inviteSchema);