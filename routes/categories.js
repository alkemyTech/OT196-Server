var express = require("express");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const { updateCategory, createCategory, getAllCategories, deleteCategory } = require("../controllers/categoriesController");
const { categoryCreateSchema } = require("../middlewares/validators/formsValidator");

router.delete('/:id', adminValidation, deleteCategory);
router.put("/:id", adminValidation, updateCategory);
router.post("/", categoryCreateSchema, adminValidation, createCategory);
router.get("/", getAllCategories);

module.exports = router;
