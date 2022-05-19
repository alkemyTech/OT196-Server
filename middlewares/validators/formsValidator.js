const {check, validationResult} = require('express-validator');

exports.validateLogin = [
  check('password')
    .notEmpty()
    .bail(),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ok: false});
    next();
  },
];