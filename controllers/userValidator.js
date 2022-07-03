const { check, validationResult } = require("express-validator");

const validateCreate = [
  check("firstName").exists().not().isEmpty(),
  check("lastName").exists().not().isEmpty(),
  check("email").exists().isEmail(),
  check("password").exists().not().isEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403);
      res.send({ errors: err.array() });
    }
  },
];

const validateId = [
  check("id").exists().not().isEmpty().isInt(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403);
      res.send({ errors: err.array() });
    }
  },
];

module.exports = { validateCreate, validateId };
