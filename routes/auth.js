var express = require("express");
var router = express.Router();
const AuthController = require("../controllers/authController");
const { validateLogin } = require("../middlewares/validators/formsValidator");
const { getLoggedUser } = require("../controllers/authController");

// GET logged user data
router.get("/me", getLoggedUser);

router.post("/login/", validateLogin, AuthController.login);

module.exports = router;
