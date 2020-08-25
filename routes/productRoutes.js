const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

// router.get("/category/foods", productController.getFoodCategory);
router
  .route("/:id")
  .get(productController.getProduct)
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

module.exports = router;
