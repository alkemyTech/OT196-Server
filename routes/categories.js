var express = require("express");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const { updateCategory } = require("../controllers/categoriesController");

router.put("/:id", adminValidation, updateCategory);

module.exports = router;
