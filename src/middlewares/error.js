const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const code = statusCode || 500;

  const response = {
    code,
    message,
    stack: err.stack,
  };

  res.status(code).send(response);
};

module.exports = {
  errorHandler,
};
