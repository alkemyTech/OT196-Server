var express = require('express');
var router = express.Router();
const Newscontroller = require('../controllers/newsController')
 const Newsvalidator = require('../middlewares/validators/newsValidator');

router.put('/news/:id',Newsvalidator, Newscontroller);

module.exports = router;

