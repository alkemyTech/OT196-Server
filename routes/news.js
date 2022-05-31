var express = require('express');
var router = express.Router();
const { createNews } = require('../controllers/newsController')
const { validateNewsPost } = require("../middlewares/validators/formsValidator")
const { adminValidation } = require("../middlewares/validators/userValidators")

// /news
router.post('/', adminValidation, validateNewsPost, createNews);

module.exports = router;