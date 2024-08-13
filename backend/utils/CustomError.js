// CustomError.js

class Err extends Error {
    constructor(message, statusCode, userData) {
      super(message);
      this.statusCode = statusCode;
      this.userData = userData ; // Optional: Attach user data to the error object
      this.name = this.constructor.name;
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  module.exports = Err;
  