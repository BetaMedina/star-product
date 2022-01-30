const httpStatus = require('http2').constants

class UnauthorizedError extends Error {
  constructor (message) {
    super()
    this.customError = message
    this.status = httpStatus.HTTP_STATUS_UNAUTHORIZED
  }
}

exports.UnauthorizedError = UnauthorizedError
