const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", passport.authenticate('local', { session: false }), userController.loginUser);
router.get('/logout', passport.authenticate('jwt-cookiecombo', { session: false }), userController.logoutUser);
router.get("/profile", passport.authenticate('jwt-cookiecombo', { session: false }), userController.getUserDetails);
router.put("/update-password", passport.authenticate('jwt-cookiecombo', { session: false }), userController.updatePassword);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password/:token", userController.resetPassword);
router.put("/update-profile", passport.authenticate('jwt-cookiecombo', { session: false }), userController.updateProfile);
module.exports = router;
