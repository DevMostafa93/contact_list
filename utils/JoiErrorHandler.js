class JoiErrorHandler extends Error {
  constructor(statusCode, joiError) {
    super();
    this.joiError = joiError;
    this.statusCode = statusCode;
  }
}

module.exports = JoiErrorHandler;