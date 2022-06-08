const { check, validationResult } = require('express-validator');

const validateTest = [
    check('name')
      .exists()
      .not()
      .isEmpty(),
    check('content')
      .exists()
      .not()
      .isEmpty(),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (err) {
            res.status(400)
            res.send({ errors: err.array() })
        }
    }
]

module.exports = validateTest;