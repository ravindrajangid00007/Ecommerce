const express = require("express");
const router = express.Router();
const passport = require("passport");
const paymentController = require("../controllers/paymentController");

router.post("/process",
    passport.authenticate("jwt-cookiecombo", { session: false }),
    paymentController.processPayment
);

router.get("/stripeapikey",
    passport.authenticate("jwt-cookiecombo", { session: false }),
    paymentController.sendStripeApiKey
)

module.exports = router;