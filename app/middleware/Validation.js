const { sendErrorResponse } = require('../../config/Helper');
const { check, validationResult } = require('express-validator');
module.exports.LoginValidation = [
    check('email', "The email field cannot be empty").notEmpty(),
    check('password', "The password field cannot be empty").notEmpty(),
];
module.exports.RegisterValidation = [
    check('name', "The name field cannot be empty").notEmpty(),
    check('email', "The email field cannot be empty").notEmpty(),
    check('password', "The password field cannot be empty").notEmpty(),
]
module.exports.validate = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const errorMessage = error.array().map((object) => object.msg);
        return sendErrorResponse(res, 403, errorMessage);
    }
    next();
}