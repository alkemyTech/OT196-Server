var express = require("express");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const { updateCategory } = require("../controllers/categoriesController");
const { deleteCategory } = require('../controllers/categoriesController');

router.delete('/:id', deleteCategory);
router.put("/:id", adminValidation, updateCategory);

module.exports = router;
