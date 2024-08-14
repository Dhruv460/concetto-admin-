const express = require("express");
const router = express.Router();
const {
  registerAmbassador,
  getLeaderBoard,
} = require("../controllers/campusAmbassador.js");
const { deserializeUser } = require("../middlewares/deserializeUser");
const { wrapAsync } = require("../utils/asyncError.js");

router.post("/campus", deserializeUser, registerAmbassador);
router.get("/leaderboard", getLeaderBoard);

module.exports = router;
