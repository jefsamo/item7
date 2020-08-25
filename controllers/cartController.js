const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  console.log(cart);
  // const resq = cart.items.map((el) => el.price);
  // const resq2 = cart.items.map((el) => el.image);
  // console.log(resq);
  // console.log(resq2);
  if (userId && !cart) {
    return next(new AppError("No items in your cart", 404));
  } else if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  res.status(200).json({
    status: "success",
    cart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  // console.log(req.user.id);const { email, productId } = req.body;
  const { productId } = req.body;
  const userId = req.user.id;
  const product = await Product.findById({ _id: productId });
  console.log(product);
  // console.log(product);
  const quantity = Number.parseInt(req.body.quantity);
  // console.log("quantity: ", quantity);
  Cart.findOne({ userId })
    .exec()
    .then((cart) => {
      if (!cart && quantity <= 0) {
        throw new AppError("Invalid request", 400);
      } else if (cart) {
        const indexFound = cart.items.findIndex((item) => {
          return item.productId === productId;
        });
        if (indexFound !== -1 && quantity <= 0) {
          cart.items.splice(indexFound, 1);
        } else if (indexFound !== -1) {
          cart.items[indexFound].quantity =
            cart.items[indexFound].quantity + quantity;
          // cart.items[indexFound].price = cart.items[indexFound].price + price;
        } else if (quantity > 0) {
          cart.items.push({
            productId: productId,
            name: product.name,
            quantity: quantity,
            price: product.price,
            image: product.imageCover,
          });
        } else {
          throw new AppError("Invalid request", 400);
        }
        return cart.save();
      } else {
        const cartData = {
          userId,
          items: [
            {
              productId: productId,
              quantity: quantity,
              name: product.name,
              price: product.price,
              image: product.imageCover,
            },
          ],
        };
        cart = new Cart(cartData);
        return cart.save();
      }
    })
    .then((savedCart) => res.json(savedCart))
    .catch((err) => {
      let error;
      if (err.message === "Invalid request") {
        error = new AppError("Some Error", 400);
      } else {
        error = new AppError("Some Error", 400);
      }
      return next(error);
    });
});

exports.subtractQuantityFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById({ _id: productId });
  const userId = req.user.id;
  const quantity = Number.parseInt(req.body.quantity);
  // console.log("qty: ", qty);
  Cart.findOne({ userId })
    .exec()
    .then((cart) => {
      if (!cart || quantity <= 0) {
        throw new Error("Invalid request");
      } else {
        const indexFound = cart.items.findIndex((item) => {
          return item.productId === productId;
        });
        if (indexFound !== -1) {
          // console.log("index Found: ", indexFound);
          // console.log("before update items: ", cart.items);
          let updatedQty = cart.items[indexFound].quantity - quantity;
          if (updatedQty <= 0) {
            cart.items.splice(indexFound, 1);
          } else {
            cart.items[indexFound].quantity = updatedQty;
          }
          // console.log("after update items: ", cart.items);
          return cart.save();
        } else {
          throw new Error("Invalid request");
        }
      }
    })
    .then((updatedCart) => res.json(updatedCart))
    .catch((err) => {
      let error;
      if (err.message === "Invalid request") {
        error = new AppError("Product does not exist in cart", 404);
      } else {
        error = new AppError(err, 400);
      }
      return next(error);
    });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new AppError("Cart not found with this ID", 404));
  }

  res.status(204).json({
    status: "success",
  });
});
