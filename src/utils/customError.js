const { HTTP_STATUS } = require("../constants/app");

class CustomError extends Error {
  constructor(message, statusCode, stack = '') {
    super(message);
    
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ApiError extends CustomError {
  constructor(message, statusCode, stack = '') {
    super(message, statusCode, stack);
  }
}

class ValidationError extends CustomError {
  constructor(message = 'Validation Error') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}



module.exports = { ApiError, ValidationError, NotFoundError };
