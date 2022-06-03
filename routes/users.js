var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
const validateCreate = require("../controllers/userValidator");
const db = require("../models/index");

// middleware to verify if is admin
const { adminValidation } = require("../middlewares/validators/userValidators");

// Add User's Model
const { User } = db;

/* GET users listing. */
router.get("/", adminValidation, async (req, res, next) => {
  try {
    // Get data from DB
    const allUsers = await User.findAll({
      attributes: ["firstName", "lastName", "email", "image", "roleId"],
    });

    res.json(allUsers);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// GET logged user data

router.get("/auth/me", function (req, res) {
  let token = req.header.token;
  user.find({ token: token }, function (err, userMe) {
    if (err) {
      return res.json({
        success: false,
        msj: "No se encontró ningún usuario",
        err,
      });
    } else {
      return res.json({
        success: true,
        user: userMe,
      });
    }
  });
});

router.post("/auth/register", validateCreate, async (req, res) => {
  let passwordHash = await bcrypt.hash(req.body.password, 10);
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash
  })
  .then(user =>  res.json(user))
});

router.delete('/user/:id', async (req, res)=> {
  const { id } = req.params 
  try {
    await User.destroy({
      where: { id },       
    })
    res.send('The user has been deleted correctly')
  } catch (error) {
    console.log(error)
  }
});



module.exports = router;
