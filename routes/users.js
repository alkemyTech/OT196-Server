var express = require("express");
var router = express.Router();
const validateCreate = require("../controllers/userValidator");
const { adminValidation } = require("../middlewares/validators/userValidators");
const {
  getAllUsers,
  getLoggedUser,
  registerUser,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");

/* GET users listing. */
router.get("/", adminValidation, getAllUsers);

// Register new user
router.post("/auth/register", validateCreate, registerUser);

// Delete user
router.delete("/:id", deleteUser);

// Update user
router.put("/:id", adminValidation, updateUser);

module.exports = router;
