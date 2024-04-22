const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found with this id.. invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error (e.g., same email)
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Your URL is invalid, please try again later`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    const message = `Your URL has expired, please try again later`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
// const ErrorHandler = require("../utils/errorHandler");

// module.exports = (err, res, req, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";

//   //wrong mongodb id error
//   if (err.name === "CastError") {
//     const message = `Resources not found with this id.. invalid ${err.path}`;
//     err = new ErrorHandler(message, 400);
//   }

//   //duplicate key error same email example
//   if (err.code === 11000) {
//     const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
//     err = new ErrorHandler(message, 400);
//   }

//   ///wrong Jwt error
//   if (err.name == "JsonWebTokenError") {
//     const message = `Your Url is invalid try again later`;
//     err = new ErrorHandler(message, 400);
//   }

//   //jwt expired
//   if ((err.name = "TokenExpiredError")) {
//     const message = `Your url is expired please try again later`;
//     err = new ErrorHandler(message, 400);
//   }

//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//   });
// };
