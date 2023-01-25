//importing modules
const express = require("express");
const app = express();

//For using JSON
app.use(express.json());

//Routes import
const product = require("./routes/products");
app.use("/api/v1", product);

//Exporting the modules
module.exports = app;
