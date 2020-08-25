const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  console.log(req.query);
  const products = await features.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({
    name: req.body.name,
    price: req.body.price,
    imageCover: req.body.imageCover,
    category: req.body.category,
  });

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No Product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(
      new AppError(`No Product found with this id ${req.params.id}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.getFoodCategory = catchAsync(async (req, res, next) => {
  const foods = await Product.find({ category: "foods" });
  if (!foods) {
    return next(new AppError("No item in this category", 404));
  }

  res.status(200).json({
    status: "success",
    results: foods.length,
    data: {
      foodCategory: foods,
    },
  });
});
exports.getDrinkCategory = catchAsync(async (req, res, next) => {
  const drinks = await Product.find({ category: "drinks" });
  if (!drinks) {
    return next(new AppError("No item in this category", 404));
  }

  res.status(200).json({
    status: "success",
    results: drinks.length,
    data: {
      drinkCategory: drinks,
    },
  });
});
