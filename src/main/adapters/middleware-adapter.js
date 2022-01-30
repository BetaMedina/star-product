const httpStatus = require('http2').constants

exports.adaptMiddleware = ({ middleware }) => {
  return async (req, res, next) => {
    try {
      const httpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        logger: req.logger,
        query: req.query,
        tracking: req.tracking,
        host: req.headers.host
      }
      const httpResponse = await middleware.handler(httpRequest)
      req.logger.logInfo({ method: 'info', tracking: req.tracking, type: 'middleware', data: httpResponse, host: req.headers.host })

      if (httpResponse.concat) {
        Object.assign(req, httpResponse.concat)
      }
      next()
    } catch (error) {
      req.logger.logInfo({ method: 'info', tracking: req.tracking, type: 'error middleware', data: error.message, status: (error.status || 500), host: req.headers.host })
      return res.status(error.status || httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: error.customError || 'Internal server error', date: (new Date()).toString() })
    }
  }
}
