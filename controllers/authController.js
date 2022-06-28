const { User } = require("../models/index");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.DB_TOKEN;

exports.login = async function (req, res) {
  var { email, password } = req.body;
  // Check if user exists
  const userExist = await User.findOne({ where: { email: email } });
  if (!userExist) return res.status(404).send({ ok: false });

  //Decrypt and check password
  const passwordMatch = await bcrypt.compare(password, userExist.password);
  if (!passwordMatch) return res.status(401).send({ ok: false });

  //Create JWT, expire after 12 hours
  const userData = { id: userExist.id, roleId: userExist.roleId };
  const userToken = jwt.sign(userData, process.env.DB_TOKEN, {
    expiresIn: 43200,
  });
  if (!userToken) return res.status(404).send({ ok: false });

  res.status(200).send({
    user: {
      id: userExist.id,
      email: userExist.email,
      image: userExist.image,
      roleId: userExist.roleId,
      token: userToken,
    },
  });
};

exports.getLoggedUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Token is required!" });
  }
  const reqToken = req.headers.authorization.split(" ")[1];
  const token = jwt.verify(reqToken, JWT_SECRET, (err, suc) => {
    return err ? false : suc;
  });
  try {
    console.log(User);
    const user = await User.findByPk(token.id, {
      attributes: ["id", "firstName", "lastName", "email", "image"],
    });
    res.json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
