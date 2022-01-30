const { loginController } = require('../controllers/login-controller')
const { createApikey } = require('../services/generate-credentials')
const { AuthRepository } = require('../../../infra/db/redis/repositories/auth-repository')
const { TokenAdapter } = require('../../../infra/adapters/token/token-adapter')

exports.loginFactory = () => {
  const credentialsService = createApikey({ TokenAdapter })
  return loginController({ repository: AuthRepository, credentialsService })
}
