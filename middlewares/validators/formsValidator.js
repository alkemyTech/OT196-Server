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

exports.validateActivity = [
  check('name')
    .notEmpty()
    .bail(),
    check('image')
    .notEmpty()
    .custom((value) => isBase64Image(value))
    .bail(),
    check('content').isLength({ max: 2500 })
    .notEmpty()
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ok: false, message: "Incorrect data."});
    next();
  },
];

exports.validateContact = [
  check('email')
    .normalizeEmail()
    .isEmail(),
  check('name')
    .notEmpty()
    .isString()
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ok: false, message: "Incorrect data."});
    next();
  },
];