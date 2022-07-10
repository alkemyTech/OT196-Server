var express = require("express");
var router = express.Router();
const {
  validateCreate,
  validateId,
  validateEmail,
} = require("../controllers/userValidator");
const { adminValidation } = require("../middlewares/validators/userValidators");
const {
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");

/* GET users listing. */
router.get("/", adminValidation, getAllUsers);

// Register new user
router.post("/auth/register", validateCreate, registerUser);

// Delete user
router.delete("/:id", adminValidation, validateId, deleteUser);

// Update user
router.put("/:id", adminValidation, validateId, validateEmail, updateUser);

module.exports = router;
