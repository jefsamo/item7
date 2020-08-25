const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    default: 1,
  },
  image: {
    type: String,
  },
});

const cartSchema = new mongoose.Schema({
  userId: String,
  total: Number,
  deliveryCharges: Number,
  items: [cartItemSchema],
  itemsCount: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
});
cartSchema.pre("save", function (next) {
  this.itemsCount = this.items.length;
  this.total = this.items
    .map((el) => el.price * el.quantity)
    .reduce((a, b) => a + b, 0);

  this.deliveryCharges = this.itemsCount * 50;
  // this.totalIn = this.items.map((el) => el.price * this.quantity);

  next();
});

// cartSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "productId",
//     select: "name",
//   });
// });

// cartSchema.methods.addItem = function (item, cb) {
//   var that = this;
//   var itemExists = false;

//   /*
//    * Increase current item quantity if it exists
//    * */
//   this.items.forEach(function (obj) {
//     if (obj._id === item._id) {
//       obj.quantity += item.quantity;
//       itemExists = true;
//     }
//   });

//   /*
//    * Increase total items count
//    * */
//   this.itemsCount += item.quantity;

//   /*
//    * Add item if it doesn't exists
//    * */
//   if (!itemExists) {
//     this.items.push(item);
//   }

//   /*
//    * Recalculate cart total after item is added
//    * */
//   this.total = 0;
//   this.items.forEach(function (item) {
//     item.total = item.price * item.quantity;
//     that.total += item.price * item.quantity;
//   });

//   this.save(cb);
// };

// cartSchema.methods.removeItem = function (id, cb) {
//   /*
//    * Remove item from cart only if items count is greater than 0
//    * */
//   if (this.items.length > 0) {
//     for (var index = 0; index <= this.items.length; index++) {
//       var item = this.items[index];

//       if (item._id === id) {
//         if (this.itemsCount > 0) {
//           /*
//            * Decrease total items count
//            * */
//           this.itemsCount -= 1;
//         }

//         if (item.quantity > 1) {
//           item.quantity -= 1;
//           this.total -= item.price;

//           break;
//         } else if (item.quantity === 1) {
//           this.total -= this.items[index].price;
//           this.items.splice(index, 1);

//           break;
//         } else if (item.quantity < 0) {
//           item.quantity = 1;
//         }
//       }
//     }
//   }

//   this.save(cb);
// };

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

// var mongoose = require("mongoose");
// const Product = require("./productModel");
// var ItemSchema = new mongoose.Schema({
//   product_id: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: [1, "Quantity can not be less then 1."],
//   },
// });

// const CartSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     match: [
//       /[\w]+?@[\w]+?\.[a-z]{2,4}/,
//       "The value of path {PATH} ({VALUE}) is not a valid email address.",
//     ],
//   },
//   product: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Product",
//     // required: [true, "Review must belong to a tour."],
//   },
//   items: [ItemSchema],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   total: {
//     type: Number,
//     default: 0,
//   },
// });

// CartSchema.pre("save", async function (next) {
//   this.total = this.items.map((el) => el.qty).reduce((a, b) => a + b, 0);
//   console.log(this.total);
//   next();
// });
// // CartSchema.pre("save", async function (next) {
// //   this.product = await Product.findById(this.product);
// //   // console.log(this.total);
// //   next();
// // });
// const Cart = mongoose.model("Cart", CartSchema);

// module.exports = Cart;
