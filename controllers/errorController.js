const AppError = require("../utils/appError");
const handleCastError = (err) => {
  const msg = `Invalid ${err.path}: ${err.value}`;
  return new AppError(msg, 400);
};

const handleDuplicateFieldError = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const msg = `Duplicate field in ${value}.Try another value`;
  return new AppError(msg, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const msg = `Invalid Input Data ${errors.join(". ")}`;
  return new AppError(msg, 400);
};

const handleJWTError = (err) =>
  new AppError("Invalid token.Please login again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired.Please login again", 401);

const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send msg to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Unknown error:Don't leak error details
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};
