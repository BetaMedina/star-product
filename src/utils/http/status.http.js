const httpStatus = require('http2').constants

/** Success Range */
exports.successResponse = (body) => ({
  status: httpStatus.HTTP_STATUS_OK,
  body: { status: 'success', ...body, date: (new Date()).toString() }
})

exports.createdResponse = (body) => ({
  status: httpStatus.HTTP_STATUS_CREATED,
  body: { status: 'success', ...body, date: (new Date()).toString() }
})

exports.successNoContent = () => ({
  status: httpStatus.HTTP_STATUS_NO_CONTENT,
  body: {}
})
