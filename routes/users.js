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
});

router.delete('/user/:email', async (req, res)=> {
  const { email } = req.params 
  try {
    await User.destroy({
      where: { email: email }
    })
    res.send('The user has been deleted correctly')
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
