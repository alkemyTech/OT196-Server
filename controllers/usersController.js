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

exports.registerUser = async (req, res) => {
  let passwordHash = await bcrypt.hash(req.body.password, 10);
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash,
    roleId: 2,
    image:
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
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

exports.updateUser = async (req, res) => {
  // Get id from params
  const { id } = req.params;
  // Get the values to update
  const { firstName, lastName, email } = req.body;

  try {
    // Update the category
    const modifiedUser = await User.update(
      {
        firstName,
        lastName,
        email,
      },
      { where: { id } }
    );
    if (modifiedUser != 0) {
      res.status(200).send({
        success: true,
        message: "The user has been updated.",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "The user to be modified does not exist",
      });
    }
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};
