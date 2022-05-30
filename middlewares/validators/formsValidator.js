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

exports.validateNewsPost = [
  check('name').isLength({ min: 10 })
    .notEmpty()
    .bail(),
  check('image')
    .notEmpty()
    .bail(),
  check('content').isLength({ max: 5000 })
    .notEmpty()
    .bail(),
  check('categoryId')
    .notEmpty()
    .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({success: false, message: "Incorrect data."});
      next();
    },
]