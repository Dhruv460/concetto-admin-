const express = require("express");
const router = express.Router();

const { deserializeUser } = require("../middlewares/deserializeUser.js");
const { wrapAsync } = require("../utils/asyncError.js");
const { checkAdmin } = require("../middlewares/checkAdmin.js");
const { acceptInvite } = require("../controllers/events.js");
const eventsModel = require("../models/events.js");
const { addEvent,updateEvent,deleteEvent,getEvents} = require("../controllers/admin.js");

router.post("/addEvent", addEvent);
router.post("/updateEvent", updateEvent)
router.post("/deleteEvent", deleteEvent)
router.get("/getEvents",getEvents)
module.exports = router;