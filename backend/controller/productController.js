//Importing the Product Model
const Product = require("../models/ProductModel");
const { filter } = require("../utils/filter");
const { paging } = require("../utils/paging");
const cookie = require("cookie-parser");

//Create product controller
exports.newProduct = async (req, res, next) => {
  try {
    const create = await Product.create(req.body);
    if (!create) {
      res.status(500).json({ success: false, create, msg: "Couldnt create" });
    }
    res.status(200).json({ success: true, create });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Something went wrong" });
  }
};

//receiving the product details
exports.getAllProducts = async (req, res) => {
  try {
    const item = await filter(req.query);
    let products = await Product.find(item);
    products = products.reverse();
    const data = paging(products, req.query.page, req.query.pageSize);
    res.status(200).json({
      success: true,
      totalResult: products.length,
      pagingDetails: [{ page: req.query.page, pageSize: req.query.pageSize }],
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

//Update product controller
exports.updateProducts = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ success: false, msg: "Something went wrong" });
  }
};

//Delete product controller
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

//Product detail controller
exports.productDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, msg: "not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Something went wrong" });
  }
};
