const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateRoles = [
    // check('name')
        // .not()
        // .isEmpty()
        // .withMessage('role name missing')
        // .isString()
        // .withMessage('invalid data type')
        // .trim()      
        // .isLength({ min: 3 })
        // .withMessage('role name must contain at least 3 characters'),
    // check('description')
    //     .not()
    //     .isEmpty()
    //     .withMessage('description missing')
    //     .isString()
    //     .withMessage('invalid data type')
    //     .trim(),

    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateRoles}