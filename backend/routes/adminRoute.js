const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../controllers/adminController");

router.get(
  "/getAllUser",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  passport.authorizeRoles("admin"),
  adminController.getAllUsers
);
router.get(
  "/all-products",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  adminController.getAllAdminProducts
);

router.get(
  "/getUserDetails/:id",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  passport.authorizeRoles("admin"),
  adminController.getUserDetails
);
router.delete(
  "/deleteUser/:id",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  passport.authorizeRoles("admin"),
  adminController.deleteUser
);


router.put(
  "/updateUser/:id",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  passport.authorizeRoles("admin"),
  adminController.updateUser
);


module.exports = router;
