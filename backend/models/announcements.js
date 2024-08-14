const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title:{type:String},
    body:{type:String},
    time:{type:Date},
});

module.exports = mongoose.model("Announcements", announcementSchema);