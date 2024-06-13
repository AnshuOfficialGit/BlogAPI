const express = require('express');
const router = express.Router();
require('express-group-routes');
const authController = require('../app/controller/auth/authController');
const {
    LoginValidation,
    validate,
    RegisterValidation
} = require('../app/middleware/Validation');

/**
 * Auth Routes
 */
router.group('/auth', (router) => {
    router.post('/login', LoginValidation, validate, authController.login);
    router.post('/register', RegisterValidation, validate, authController.register);
})
module.exports = router