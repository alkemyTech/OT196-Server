var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET logged user data

router.get('/auth/me', function(req, res) {
  let token = req.header.token;
  user.find({ token: token }, function(err, userMe) {
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




module.exports = router;
