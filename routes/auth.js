var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController')
const {validateLogin} = require('../middlewares/validators/formsValidator');
  
router.post('/login/', validateLogin, AuthController.login);

module.exports = router;