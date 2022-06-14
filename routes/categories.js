var express = require("express");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const { updateCategory, getAllCategories, deleteCategory } = require("../controllers/categoriesController");

router.delete('/:id', deleteCategory);
router.put("/:id", adminValidation, updateCategory);
router.get("/", getAllCategories);

module.exports = router;
