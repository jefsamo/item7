const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const Cart = require("../models/cartModel");

exports.getHomePage = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    title: "Takeaway restaurant",
  });
});
exports.getLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});
exports.getSignupPage = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", {
    title: "Sign Up",
  });
});
exports.getShopPage = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  console.log(products[0]._id);
  res.status(200).render("shop", {
    title: "Shop",
    products,
  });
});
exports.getCartPage = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  console.log(cart);
  const resq = cart.items.map((el) => el);
  const resq2 = cart.items.map((el) => el.image);
  console.log(resq);
  console.log(resq2);
  res.status(200).render("cart", {
    title: "Shop",
    cart,
  });
});
exports.getProfilePage = catchAsync(async (req, res, next) => {
  res.status(200).render("profile", {
    title: "Shop",
  });
});
exports.getchangePasswordPage = catchAsync(async (req, res, next) => {
  res.status(200).render("passwordchange", {
    title: "Shop",
  });
});
