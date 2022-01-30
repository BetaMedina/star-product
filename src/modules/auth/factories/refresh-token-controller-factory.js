const { refreshTokenController } = require('../controllers/refresh-token-controller')
const { createApikey } = require('../services/generate-credentials')
const { TokenAdapter } = require('../../../infra/adapters/token/token-adapter')

exports.refreshTokenFactory = () => {
  const credentialsService = createApikey({ TokenAdapter })
  return refreshTokenController({ tokenAdapter: TokenAdapter, credentialsService })
}
