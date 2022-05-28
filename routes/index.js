var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/************** START JWT LOGIC **************/

// GENERATE TOKEN with user information and respond with the token
router.post("/auth/login", (req, res) => { // test route
  // User example data with req.body
  const { id, name, lastName, email, password } = req.body;
  const user = {
    id,
    name,
    lastName,
    email,
    password // req.body by bcrypt?
  }



  jwt.sign(user, process.env.DB_TOKEN, (err, token) => {
    res.json({
      message: 'Token was generated successfully',
      token
    });
  });

});

// Verify is in the headers and if is a string.
function verifyToken(req, res, next) {
  const bearerHeader = req.get('authorization'); // Take token from header

  if (typeof bearerHeader !== 'undefined') { // Verify is a string
    const bearerToken = bearerHeader.split(" ")[1]; // Select the token
    token = bearerToken; // Save the token
    next(); // If is ok, go next to 'jwt.verify'
  } else {
    res.status(403).json({ error: 'Forbidden' }); // If is not ok, send 403
  }
}


// Decoded the token and respond with user data + token
router.post("/auth/login/validation", verifyToken, (req, res) => { // test route

  jwt.verify(token, process.env.DB_TOKEN, (error, authData) => { // verify or decode?
    if (error) {
      res.status(403).json({ error: 'Forbidden' }); // If is not ok, send 403
    } else {
      res.json({
        message: "Decoded User",
        authData
      });
    }
  });
});

/************** END JWT LOGIC **************/


module.exports = router;
