const { check, validationResult } = require('express-validator');

exports.validateMember = [
    check('name')
      .exists()
      .not()
      .isEmpty()
      .isString()
    ,
    ( req, res, next ) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(400).json({ 
                errors: error.array()
            })
        }
    }
]