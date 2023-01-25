//Importing the Product Model
const Product = require("../models/ProductModel");

//
exports.newProduct = async (req, res, next) => {
  const create = await Product.create(req.body);
  if (!create) {
    res.status(500).json({ success: false, create, msg: "Couldnt create" });
  }
  res.status(200).json({ success: true, create });
};

//receiving the product details
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

exports.updateProducts = async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (!products) {
    res.status(400).json({ success: false, msg: "Bad request" });
  }
  const uproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, uproduct });
};
exports.deleteProducts = async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (!products) {
    res.status(400).json({ success: false, msg: "Bad request" });
  }
  const dproduct = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, dproduct });
};
