class GlobalErrorHandler {
  constructor(error, res) {
    this.error = error;
    this.res = res;
    this.checkError();
  }

  sendErrorMessage(message, statusCode) {
    this.res.json({
      statusCode,
      message: message.split(','),
    });
  }

  duplicateFieldInDB() {
    if (String(this.error.message).includes('phoneNumber')) {
      this.sendErrorMessage('this phone number is already exist', 406);
    } else if (String(this.error.message).includes('username')) {
      this.sendErrorMessage('this username is already exist', 406);
    }
  }

  validationErrorHandler() {
    const err = this.error.errors;
    let errorMessages = Object.keys(err).map((key) => err[key].message);
    this.sendErrorMessage(errorMessages.join(','), 400);
  }

  castErrorHandler() {
    const err = this.error;
    this.sendErrorMessage(
      `invalid ${err.kind} for value ${err.value} at path ${err.path}`,
      400
    );
  }

  jwtExpiredErrorHandler() {
    this.sendErrorMessage('your token has expired! please login again.', 401);
  }

  invalidTokenErrorHandler() {
    this.sendErrorMessage('invalid token. please login again!', 401);
  }
  checkError() {
    if (this.error.code === 11000) {
      this.duplicateFieldInDB();
    } else if (this.error.name === 'ValidationError') {
      this.validationErrorHandler();
    } else if (this.error.name === 'CastError') {
      this.castErrorHandler();
    } else if (this.error.name === 'TokenExpiredError') {
      this.jwtExpiredErrorHandler();
    } else if (this.error.name === 'JsonWebTokenError') {
      this.invalidTokenErrorHandler();
    } else {
      this.sendErrorMessage(this.error.message, this.error.statusCode);
    }
  }
}
export default GlobalErrorHandler;
