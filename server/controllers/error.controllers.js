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

  checkError() {
    if (this.error.code === 11000) {
      this.duplicateFieldInDB();
    }
    if (this.error.name === 'ValidationError') {
      this.validationErrorHandler();
    }
  }
}
export default GlobalErrorHandler;
