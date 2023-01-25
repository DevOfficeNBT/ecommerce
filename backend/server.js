//Importing the modules
const app = require("./app");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");

//Config
dotenv.config({ path: "./config/config.env" });

//DB connection
connectToDB();

//Listening on this port
app.listen(process.env.PORT, () => {
  console.log(`app is working on http://localhost:${process.env.PORT}`);
});
