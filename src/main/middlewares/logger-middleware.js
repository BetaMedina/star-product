const { LoggerConfig: loggerConfig } = require('../adapters/logger-adapter')
const { v4 } = require('uuid')

exports.loggerMiddleware = () => {
  return async (req, res, next) => {
    if (req.originalUrl !== '/api/health') {
      const tracking = v4()
      req.tracking = tracking
      req.logger = loggerConfig
      loggerConfig.logInfo({ method: 'info', tracking, type: 'entry request', class: 'method', httpMethod: req.method, data: { body: req.body, params: req.params, query: req.query }, url: req.originalUrl })
      next()
    } else {
      next()
    }
  }
}
