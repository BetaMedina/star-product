const { authorizationController } = require('../controllers/authorization-code-controller')
const { authorizationCode } = require('../services/dispatch-email')
const { UserRepository } = require('../../../infra/db/pgsql/repositories/user-repository')
const { AuthRepository } = require('../../../infra/db/redis/repositories/auth-repository')

const { EmailAdapter } = require('../../../infra/adapters/mail/nodemailer')

exports.authorizationFactory = () => {
  const dispatchMailService = authorizationCode({ emailAdapter: EmailAdapter, authRepository: AuthRepository })
  return authorizationController({ repository: UserRepository, dispatchMail: dispatchMailService })
}
