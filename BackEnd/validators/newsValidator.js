const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateNews = [
    check('name')
       .not()
       .isEmpty()
       .withMessage('name missing'),
    check('content')
        .not()
        .isEmpty()
        .withMessage('content missing'),
    check('categoryId')
       .not()
       .isEmpty()
       .withMessage('category missing')
       .bail()
       .isInt()
       .withMessage('invalida data type'),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateNews}