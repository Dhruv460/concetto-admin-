const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Logout,
  verifyOtp,
  resendOtp,
} = require("../controllers/auth");
const { deserializeUser } = require("../middlewares/deserializeUser");
const { wrapAsync } = require("../utils/asyncError.js");

router.post("/register", wrapAsync(Register));
router.post("/login", wrapAsync(Login));
router.post("/logout", Logout);
router.post("/verifyotp", verifyOtp);
router.post("/resendotp", resendOtp);
//Below is the example of a protected route
// router.get('/s', deserializeUser , (req , res) => {
//     if(!req.user) return res.send({error : "No user logged In"});
//     res.send({data : req.user});
// })
router.get("/protected", deserializeUser, (req, res) => {
  res.send({ data: req.user });
});


// aeja gjhw vodo ygt
module.exports = router;
