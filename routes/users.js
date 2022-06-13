var express = require("express");
var router = express.Router();
const validateCreate = require("../controllers/userValidator");
const { adminValidation } = require("../middlewares/validators/userValidators");
const {
  getAllUsers,
  getLoggedUser,
  registerUser,
  deleteUser,
} = require("../controllers/usersController");

/* GET users listing. */
router.get("/", adminValidation, getAllUsers);

// GET logged user data
router.get("/auth/me", getLoggedUser);

// Register new user
router.post("/auth/register", validateCreate, registerUser);

// Delete user
router.delete("/user/:id", deleteUser);

module.exports = router;
