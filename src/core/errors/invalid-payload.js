const httpStatus = require('http2').constants

class InvalidPayloadError extends Error {
  constructor (message) {
    super()
    this.customError = message
    this.status = httpStatus.HTTP_STATUS_BAD_REQUEST
  }
}

exports.InvalidPayloadError = InvalidPayloadError
