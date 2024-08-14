const express = require("express");
const router = express.Router();

const { deserializeUser } = require("../middlewares/deserializeUser.js");
const { wrapAsync } = require("../utils/asyncError.js");
const { acceptInvite, makeTeam, sendInvite, declineInvite, teamInfo } = require("../controllers/register.js");

router.post("/acceptInvite", deserializeUser,acceptInvite);
router.post("/createTeam", deserializeUser,makeTeam);
router.post("/sendInvite", deserializeUser,sendInvite);
router.post("/declineInvite", deserializeUser,declineInvite);
router.get("/teamInfo/:teamId",deserializeUser,teamInfo)



module.exports = router;
