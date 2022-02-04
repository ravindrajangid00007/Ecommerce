const express = require("express");
const router = express.Router();
const passport = require("passport");
const productController = require("../controllers/productController");
router.get(
  "/list",
  productController.getAllProducts
);
router.post(
  "/create",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  passport.authorizeRoles("admin"),
  productController.createProduct
);
router.put(
  "/update/:id",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  passport.authorizeRoles("admin"),
  productController.updateProduct
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  passport.authorizeRoles("admin"),
  productController.deleteProduct
);
router.get("/details/:id", productController.productDetails);

router.put(
  "/review",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  productController.createProductReview
);

router.get(
    "/getReviews", 
    productController.getProductReviews
)
module.exports = router;
