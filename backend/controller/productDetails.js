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
    console.log("not found");
    return res.status(400).json({ success: false, msg: "Not Found" });
  }
  const uproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, uproduct });
};
exports.deleteProducts = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) {
      console.log("not found");
      return res.status(400).json({ success: false, msg: "Not Found" });
    }
    const dproduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, dproduct });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Something went wrong" });
  }
};
