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
      return res
        .status(400)
        .json({ success: false, msg: "Enter correct email" });
    }
    if (!validator.isLength(password, { min: 8 })) {
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
    //If user exists then password password match
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, msg: "Email or Password is incorrect!" });
    }
    //If pass match success preparing ID from user data for JWT token
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.Secret);
    res.cookie("token", token);
    //Sending token if everything is okay
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

exports.changePassword = async (req, res) => {
  if (!req.user) {
    return res.status(400).json({
      sucess: false,
      msg: "Please authenticate with correct credencials",
    });
  }
  try {
    const user = await UserModel.findById(req.user.user.id).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, msg: "Bad request" });
    }
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res.status(400).json({ success: false, msg: "Bad request" });
    }
    const isMatched = await bcryptjs.compare(oldpassword, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, msg: "Old password should be accurate" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(newpassword, salt);
    if (user.password == hash) {
    }
    await UserModel.findByIdAndUpdate(req.user.user.id, { password: hash });
    res
      .status(200)
      .json({ success: true, msg: "Password successfully updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      sucess: false,
      msg: "Internal server error",
    });
  }
};
