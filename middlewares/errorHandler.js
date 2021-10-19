const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const {
      output: { payload, statusCode },
    } = err;

    res.status(statusCode).json(payload);
  }
  console.log(err);
  next(err);
};

module.exports = { logErrors, errorHandler, boomErrorHandler };
