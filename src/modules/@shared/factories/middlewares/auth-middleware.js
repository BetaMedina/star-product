const { authMiddleware } = require('../../middlewares/auth-middleware')
const { TokenAdapter } = require('../../../../infra/adapters/token/token-adapter')

exports.authMiddlewareFactory = () => {
  return authMiddleware({
    tokenAdapter: TokenAdapter
  })
}
