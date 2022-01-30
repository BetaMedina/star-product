const httpStatus = require('http2').constants

exports.adaptRoute = ({ controller, method }) => {
  return async (req, res) => {
    try {
      const httpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query,
        logger: req.logger,
        tracking: req.tracking,
        userId: req.user
      }

      const httpResponse = await controller[method](httpRequest)

      req.logger.logInfo({ method: 'info', tracking: req.tracking, type: 'response request', class: controller[method].name.toString(), httpMethod: req.method, data: httpResponse, url: req.originalUrl })
      return res.status(httpResponse.status).json(httpResponse.body)
    } catch (err) {
      req.logger.logInfo({ method: 'error', tracking: req.tracking, type: 'response request', class: controller[method].name.toString(), httpMethod: req.method, errorClass: err.message, stack: err.stack })
      return res.status(err.status || httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ status: 'error', error: err.customError || 'Internal server error', date: (new Date()).toString() })
    }
  }
}
