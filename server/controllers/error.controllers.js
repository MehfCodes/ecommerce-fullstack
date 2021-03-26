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
  checkError() {
    if (this.error.code === 11000) {
      this.duplicateFieldInDB();
    }
    if (this.error.name === 'ValidationError') {
      this.validationErrorHandler();
    }
    if (this.error.name === 'CastError') {
      this.castErrorHandler();
    } else {
      this.sendErrorMessage(this.error.message, this.error.statusCode);
    }
  }
}
export default GlobalErrorHandler;
