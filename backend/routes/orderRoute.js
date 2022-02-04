const express = require("express");
const router = express.Router();
const passport = require("passport");

const orderController = require("../controllers/orderController");

router.post(
    "/new-order",
    passport.authenticate("jwt-cookiecombo", { session: false }),
    orderController.newOrder
);

router.get("/order-detials/:id",
    passport.authenticate("jwt-cookiecombo", { session: false }),
    passport.authorizeRoles("admin"),
    orderController.getSingleOrder
);

router.get("/my-orders",
    passport.authenticate('jwt-cookiecombo', { session: false }),
    orderController.myOrder
)

router.get("/all-orders",
    passport.authenticate("jwt-cookiecombo", { session: false }),
    passport.authorizeRoles("admin"),
    orderController.getAllOrders
)

router.put("/update-order/:id",
    passport.authenticate("jwt-cookiecombo", { session: false }),
    passport.authorizeRoles("admin"),
    orderController.updateOrder
);

router.delete("/delete-order/:id",
    passport.authenticate("jwt-cookiecombo", { session: false }),
    passport.authorizeRoles("admin"),
    orderController.deleteOrder

)
module.exports = router;