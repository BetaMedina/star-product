const httpStatus = require('http2').constants

class NotFoundError extends Error {
  constructor (message) {
    super()
    this.customError = message
    this.status = httpStatus.HTTP_STATUS_NOT_FOUND
  }
}
exports.NotFoundError = NotFoundError
