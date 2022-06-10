var express = require("express");
var router = express.Router();
const { deleteCategory } = require('../controllers/categoriesController');

router.delete('/:id', deleteCategory);

module.exports = router;