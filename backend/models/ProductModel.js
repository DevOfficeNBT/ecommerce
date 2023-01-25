const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  name: { type: String, required: [true, "Please enter a name"] },
  description: { type: String, required: [true, "Please enter a description"] },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
    maxLength: [8, "Price cannot exceed 8 figures"],
  },
  rating: { type: Number, default: 0 },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter an category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter stock"],
    maxLength: [4, "Stock cannot exceed more than 4 figures"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductModel);
