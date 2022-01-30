const { adaptMiddleware } = require('./middleware-adapter')
const { LoggerConfig } = require('./logger-adapter')
const { adaptRoute } = require('./express-route.adapter')

module.exports = {
  adaptMiddleware,
  LoggerConfig,
  adaptRoute
}
