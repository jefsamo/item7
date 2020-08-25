const express = require("express");
const authController = require("../controllers/authController");
const searchController = require("../controllers/searchController");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", searchController.getSearchResult);

module.exports = router;
