var express = require("express");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const { updateCategory, createCategory } = require("../controllers/categoriesController");
const { categoryCreateSchema } = require("../middlewares/validators/formsValidator");

router.put("/:id", adminValidation, updateCategory);
router.post("/", categoryCreateSchema, adminValidation, createCategory);

module.exports = router;
