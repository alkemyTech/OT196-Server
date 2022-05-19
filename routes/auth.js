var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController')
const {validateLogin} = require('../middlewares/validators/formsValidator');
  
// receiving login credentials
router.post('/login/', validateLogin, AuthController.login);

module.exports = router;