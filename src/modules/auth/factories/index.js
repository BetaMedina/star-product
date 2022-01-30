const { refreshTokenFactory } = require('./refresh-token-controller-factory')
const { loginFactory } = require('./login-controller-factory')
const { authorizationFactory } = require('./authorization-controller-factory')

module.exports = {
  refreshTokenFactory,
  loginFactory,
  authorizationFactory
}
