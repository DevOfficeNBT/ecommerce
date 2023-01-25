//importing modules
const express = require("express");
const app = express();

//For using JSON
app.use(express.json());

//Routes import
const products = require("./routes/products");
app.use("/api/v1", products);

//Exporting the modules
module.exports = app;
