const mongoose = require("mongoose");

//Mongoose
mongoose.set("strictQuery", true);
const connectToDB = async () => {
  try {
    const data = await mongoose.connect("mongodb://localhost:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected with server ${data.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDB;
