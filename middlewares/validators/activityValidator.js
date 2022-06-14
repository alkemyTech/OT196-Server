const { check, validationResult } = require("express-validator");

exports.validateNewActivity = [
  check("name").exists().isLength({ min: 10 }).notEmpty().bail(),
  check("content").exists().isLength({ max: 5000 }).notEmpty().bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ success: false, message: "Incorrect data." });
    next();
  },
];
