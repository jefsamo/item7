const express = require("express");
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");

const router = express.Router();
router.get("/", authController.protect, cartController.getCart);
router.route("/:id").delete(authController.protect, cartController.deleteCart);
router.post("/add-to-cart", authController.protect, cartController.addToCart);
router.post(
  "/subtract",
  authController.protect,
  cartController.subtractQuantityFromCart
);
// // router
// //   .route("/")
// //   // .get(authController.protect, cartController.getCart)
// //   .post(
// //     authController.protect,
// //     // cartController.setTourUserIds,
// //     cartController.addToCart
// //   );

// router.route("/").post(authController.protect, cartController.addToCart);

// // router.route("/:id").get(cartController.getCart);

module.exports = router;
