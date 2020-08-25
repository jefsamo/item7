const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/update-me", authController.protect, userController.updateMe);
router.patch("/reset-password/:token", authController.resetPassword);
router.patch(
  "/update-my-password",
  authController.protect,
  authController.updatePassword
);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);
// router.delete("/:id", userController.deleteUser);

router.get("/", authController.protect, userController.getAllUsers);

module.exports = router;
