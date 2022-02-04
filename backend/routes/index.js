const express = require("express");
const router = express.Router();

router.use("/product", require("./productRoute"));
router.use("/user", require("./userRoute"));
router.use("/admin", require("./adminRoute"));
router.use("/order", require("./orderRoute"));
router.use("/payment", require("./paymentRoute"));
module.exports = router;
