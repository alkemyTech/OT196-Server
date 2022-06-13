// Add User's Model
const { User } = require("../models/index");

var bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res, next) => {
  try {
    // Get data from DB
    const allUsers = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "image", "roleId"],
    });

    res.json(allUsers);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.getLoggedUser = async (req, res) => {
  let token = req.header.token;
  await User.find({ token: token }, function (err, userMe) {
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
};

exports.registerUser = async (req, res) => {
  let passwordHash = await bcrypt.hash(req.body.password, 10);
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash,
  }).then((user) => res.json(user));
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: { id },
    });
    res.send("The user has been deleted correctly");
  } catch (error) {
    console.log(error);
  }
};
