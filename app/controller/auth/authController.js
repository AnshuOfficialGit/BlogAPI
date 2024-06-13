const { sendSuccessResponse, sendErrorResponse } = require('../../../config/Helper');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
/**
 * Register Method
 */
const register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return sendErrorResponse(res, 403, "Email is already in use");
        }
        const user = new User({ name, email, password });
        const result = await user.save();
        return sendSuccessResponse(res, "Registered Successfully!", result);
    } catch (error) {
        return sendErrorResponse(res, 500, "An Unexpected Error occurred! " + error.message);
    }
}
/**
 * Login Method
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return sendErrorResponse(res, 403, "Invalid Credentials");
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return sendErrorResponse(res, 403, "Invalid Credentials");
        }
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            const data = {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token,
            }
            return sendSuccessResponse(res, "Login Successfully!", data);
        });
    } catch (error) {
        return sendErrorResponse(res, 500, "An Unexpected Error occurred! " + error.message);
    }
};

const hello = () => {
    return sendSuccessResponse(res, "Registered Successfully!", 'Hello');
}
module.exports = {
    login,
    register,
}