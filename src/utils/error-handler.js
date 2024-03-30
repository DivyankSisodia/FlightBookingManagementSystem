const { statusCodes } = require('http-status-codes');

class AppErrors extends Error {
    constructor(
        name = 'AppError',
        message = 'Something went wrong in the application layer',
        explanation = 'Something went wrong',
        statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    ) {
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
        this.name = name;
    }
}

module.exports = AppErrors;