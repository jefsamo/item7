const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewController.getHomePage);
router.get("/login", viewController.getLoginPage);
router.get("/signup", viewController.getSignupPage);
router.get("/shop", authController.isLoggedIn, viewController.getShopPage);
router.get(
  "/cart",
  authController.protect,
  authController.isLoggedIn,
  viewController.getCartPage
);
router.get(
  "/profile",
  authController.isLoggedIn,
  viewController.getProfilePage
);
router.get(
  "/change-password",
  authController.protect,
  viewController.getchangePasswordPage
);

module.exports = router;
