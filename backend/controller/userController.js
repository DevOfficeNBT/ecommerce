const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//Controller for Register of user
exports.register = async (req, res) => {
  try {
    const { email, name, password, avatar } = req.body;
    const user = await UserModel.findOne({ email });
    //Finding user
    if (user) {
      return res
        .status(200)
        .json({ success: false, msg: "User with this email already exists" });
    }
    //validation
    if (!validator.isEmail(email)) {
      console.log("its not an email");
      return res
        .status(400)
        .json({ success: false, msg: "Enter correct email" });
    }
    console.log(password);
    if (!validator.isLength(password, { min: 8 })) {
      console.log("its not an email");
      return res
        .status(400)
        .json({ success: false, msg: "Password should be long" });
    }
    //Encrypting password
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    //Saving user because everuthing is fine
    const result = await UserModel.create({
      email,
      name,
      password: hashedPass,
      avatar,
    });
    //Preparing data for JWT sign
    const data = { user: { id: result.id } };
    const token = jwt.sign(data, process.env.SECRET);

    //Returning the success response
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

//Controller for login
exports.login = async (req, res) => {
  try {
    // if (req.user.id) {
    // }
    if (req.cookies.token) {
      return res
        .status(400)
        .json({ succcess: false, msg: "Already logged in" });
    }
    const { email, password } = req.body;
    //Checking if user exists or not
    let user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "Email or Password is incorrect!" });
    }
    //If no user password check
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, msg: "Email or Password is incorrect!" });
    }
    //preparing ID from user data for JWT token
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.Secret);
    res.cookie("token", token);
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ success: true, msg: "Logged out" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};
