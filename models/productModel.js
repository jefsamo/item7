const mongoose = require("mongoose");
const slugify = require("slugify");
// const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Product must have a name"],
      unique: true,
      trim: true,
    },
    slug: String,
    category: {
      type: String,
      required: [true, "A product must belong to a category"],
    },
    price: {
      type: Number,
      required: [true, "A Product must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    imageCover: {
      type: String,
      uniue: true,
      required: [true, "A Product must have a cover image"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
productSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});
productSchema.post(/^find/, function (docs, next) {
  const time = Date.now() - this.start / 1000;
  console.log(`Query took ${time} seconds!`);
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
