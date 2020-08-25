const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/foods", productController.getFoodCategory);
router.get("/drinks", productController.getDrinkCategory);

module.exports = router;
