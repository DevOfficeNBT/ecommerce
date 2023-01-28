const router = require("express").Router();
const { checkAuth } = require("../middlewares/checkAuth");
const { register, login, logout } = require("../controller/userController");

router.route("/user/register").post(register);
router.route("/user/login").post(login);
router.route("/user/logout").post(checkAuth, logout);
// router.route("/user/logout").post(logout);

module.exports = router;
