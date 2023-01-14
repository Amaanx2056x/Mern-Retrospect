let express = require("express");
const authController = require("../controller/auth");
let { validateSignup, validateSignin } = require("../middleware/validate-json");
let authenticateUser = require("../middleware/auth");
let router = express.Router();

router.post("", validateSignin, authController.login);
router.post("/signup", validateSignup, authController.signup);
router.get("/logout", authenticateUser, authController.logout);

module.exports = router;
