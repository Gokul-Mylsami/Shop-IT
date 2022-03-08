const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statuscode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //Wrong Mogoose object ID error
    if (err.name === "CastError") {
      const message = `Resouse not Found ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered `;
      error = new ErrorHandler(message, 400);
    }

    //Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is Expired . Try Again !!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statuscode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
