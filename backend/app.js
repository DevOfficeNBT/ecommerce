//importing modules
const express = require("express");
const app = express();

//For using JSON
app.use(express.json());

//Routes import
const products = require("./routes/products");
app.use("/api/v1", products);

//Exporting the modules
const server = (module.exports = app);

process.on("unhandledRejection", (err) => {
  console.log(`Server closed due to ${err}`);
  console.log(err.stack);
  server.close(() => {
    process.exit(1);
  });
});
