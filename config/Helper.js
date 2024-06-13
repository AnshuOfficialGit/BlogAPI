const sendSuccessResponse = (res, message, data) => {
    res.status(200).json({
        success: true,
        message,
        data
    });
};

// Function to send error response
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};