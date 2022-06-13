var express = require("express");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const { updateCategory, getAllCategories } = require("../controllers/categoriesController");

router.put("/:id", adminValidation, updateCategory);
router.get("/", getAllCategories);

module.exports = router;
