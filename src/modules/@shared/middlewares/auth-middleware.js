const { UnauthorizedError } = require('../../../core/errors/unauthorized-error')
const { CONSTANTS } = require('./constants')

exports.authMiddleware = ({ tokenAdapter }) => ({
  handler: ({ headers }) => {
    const { authorization } = headers
    if (!authorization) throw new UnauthorizedError(CONSTANTS.AUTH_MIDDLEWARE.TOKEN_NOT_FOUND)
    const [type, token] = authorization.split(' ')
    if (type !== CONSTANTS.AUTH_MIDDLEWARE.TYPE_TOKEN) throw new UnauthorizedError(CONSTANTS.AUTH_MIDDLEWARE.FORMAT_INVALID)
    const getSessionInfo = tokenAdapter.verify({ token })
    if (!getSessionInfo) throw new UnauthorizedError(CONSTANTS.AUTH_MIDDLEWARE.TOKEN_INVALID)
    return {
      concat: { user: getSessionInfo.userId }
    }
  }
})
