const jwt = require("jsonwebtoken");

exports.checkAuth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    if (!req.cookies.token) {
      return res.status(401).json({
        success: false,
        msg: "Please authenticate using correct credentials",
      });
    }
    const user = jwt.verify(req.cookies.token, process.env.SECRET);
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Please authenticate using correct credentials",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(user);
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: err.message + ", Bad request" });
  }
};

// exports.module = checkAuth;
