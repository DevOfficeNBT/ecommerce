//importing modules
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//For using JSON
app.use(express.json());

//For cookiePraser
app.use(cookieParser());

//Routes import
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

//Exporting the modules
const server = (module.exports = app);

process.on("unhandledRejection", (err) => {
  console.log(`Server closed due to ${err}`);
  console.log(err.stack);
  server.close(() => {
    process.exit(1);
  });
});
