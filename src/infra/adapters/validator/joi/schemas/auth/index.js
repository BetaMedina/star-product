const { authorizationCodeSchema } = require('./authorization-code-schema')
const { refreshTokenSchema } = require('./refresh-token-schema')

module.exports = {
  authorizationCodeSchema,
  refreshTokenSchema
}
