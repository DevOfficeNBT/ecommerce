const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
    minLength: [3, "Name should be atlease 3 character long"],
    maxLenght: [30, "Name should not exceed more than 30 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be equal to 8 characters or more"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", UserModel);
