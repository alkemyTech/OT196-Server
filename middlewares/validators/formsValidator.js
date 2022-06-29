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
    .isURL()
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

// Allow to validate if image is a base64 encoded image
const isBase64Image = function(str){
  const regex = /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
  return str && regex.test(str);
}

exports.validateNewsPost = [
  check('name').isLength({ min: 10 })
    .notEmpty()
    .bail(),
  check('image')
    .notEmpty()
    .custom((value) => isBase64Image(value))
    .bail(),
  check('content').isLength({ max: 5000 })
    .notEmpty()
    .bail(),
  check('categoryId')
    .notEmpty()
    .isInt()
    .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({success: false, message: "Incorrect data."});
      next();
    },
]

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

exports.categoryCreateSchema = [
  check('name')
  .notEmpty()
  .isString()
  .isLength({min: 3}),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({success: false, message: "Incorrect body data."});
    next();
  },
]

exports.validateUpdateTestimony = [
  check('name')
  .notEmpty()
  .isString(),
  check('content')
  .notEmpty()
  .isString(),
  (req, res, next)=> {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) return res.status(422).json({ok: false, message: 'Name and content are required'})
    next()
  }
]

exports.validateUpdateUser = [
  check("firstName").notEmpty(),
  check("lastName").notEmpty(),
  check("email").notEmpty().isEmail(),
  check("image").notEmpty().isURL(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({success: false, message: "Incorrect body data."});
    next();
  },
];

exports.validateImage = [
  check("name").notEmpty(),
  check("image").notEmpty().custom((value) => isBase64Image(value)),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({success: false, message: "Incorrect body data."});
    next();
  },
];
