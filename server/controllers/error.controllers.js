const AppError = require("../utils/app-error");

const handleCastErrDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (error) => {
  const value = error.errmsg.match(/([""])(\\?.)*?\1/)[0];
  const message = `Duplicate field value:${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrDB = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    // error: err,
    message: err.message,
    // stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send the error details to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    //  1) log the error
    console.error("ERROR 💥", err);

    // 2) send generic message
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

    if (err.name === "CastError") error = handleCastErrDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.code === "ValidationError") error = handleValidationErrDB(error);
    sendErrorProd(error, res);
  }
};
