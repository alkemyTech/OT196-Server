var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const validateCreate = require('../controllers/userValidator');
const db = require('../models/index')
const { User } = db;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET logged user data

router.get('/auth/me', function(req, res) {
  let token = req.header.token;
  User.find({ token: token }, function(err, userMe) {
      if (err) {
          return res.json({
              success: false,
              msj: 'No se encontró ningún usuario',
              err
          });
      } else {
          return res.json({
              success: true,
              user: userMe
          });
      }
  })
});

router.post('/auth/register', validateCreate,
async (req, res) => {
  let passwordHash = await bcrypt.hash(req.body.password, 10)
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash
  })
  .then(user =>  res.json(user))
})

module.exports = router;
