//Importing the Product Model
const Product = require("../models/ProductModel");

//Creating the new product
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
