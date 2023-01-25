//Importing modules
const router = require("express").Router();

//Controller path so here we are getting the functions in the objects from the require function which is stating to the controller
const {
  getAllProducts,
  newProduct,
  updateProducts,
  deleteProducts,
} = require("../controller/productDetails");

//Routes to the for a specific
router.route("/products").get(getAllProducts);
router.route("/products/create").post(newProduct);
router.route("/products/change/:id").put(updateProducts);
router.route("/products/change/:id").delete(deleteProducts);

//Exporting the modules
module.exports = router;
