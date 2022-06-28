var express = require("express");
var router = express.Router();
const AuthController = require("../controllers/authController");
const { validateLogin, validateUpdateUser } = require("../middlewares/validators/formsValidator");
const { getLoggedUser, updateLoggedUser } = require("../controllers/authController");
const { loggedValidation } = require("../middlewares/validators/userValidators");

// GET logged user data
router.get("/me", getLoggedUser);
// UPDATE logged user data
router.put("/me", loggedValidation, validateUpdateUser, updateLoggedUser);
// DELETE logged user 
router.delete("/me", loggedValidation, updateLoggedUser);

router.post("/login/", validateLogin, AuthController.login);

module.exports = router;
