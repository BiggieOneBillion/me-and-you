
// ! WE STILL NEED TO CUSTOMISE IT FURTHER.
class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  
    static handleError(err, req, res, next) {
      let { statusCode, message } = err;
  
      // Handle specific error types
      if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
        message = Object.values(err.errors).map(val => val.message).join(', ');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        statusCode = 409; // Conflict (Duplicate key error)
        message = 'Duplicate field value entered';
      } else if (err.statusCode) {
        // If there's a predefined status code, use it
        statusCode = err.statusCode;
      } else {
        statusCode = 500; // Internal Server Error
        message = 'Server Error';
      }
  
      res.status(statusCode).json({
        success: false,
        statusCode,
        message,
      });
    }
  }
  
  module.exports = ErrorHandler;