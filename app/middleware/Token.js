const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('../../../config/Helper');
require('dotenv').config()

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return sendErrorResponse(res, 403, "No token, authorization denied");

    }
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        return sendErrorResponse(res, 403, "Token is not valid");

    }
};