const httpStatus = require('http2').constants

class ForbiddenRequestError extends Error {
  constructor (message) {
    super()
    this.customError = message
    this.status = httpStatus.HTTP_STATUS_FORBIDDEN
  }
}
exports.ForbiddenRequestError = ForbiddenRequestError
