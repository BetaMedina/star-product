const { UnauthorizedError } = require('../../../core/errors/unauthorized-error')
const { successResponse } = require('../../../utils/http/status.http')
const { CONSTANTS } = require('../constants')
exports.refreshTokenController = ({ tokenAdapter, credentialsService }) => ({
  async generateNewCredentials ({ body }) {
    const { refreshToken } = body
    const validRefreshToken = await tokenAdapter.verify({ token: refreshToken, key: process.env.REFRESH_KEY_TOKEN })
    if (!validRefreshToken) throw new UnauthorizedError(CONSTANTS.REFRESH.TOKEN_INVALID)
    const credentials = await credentialsService.execute({ payload: { userId: validRefreshToken.userId } })
    return successResponse({ credentials })
  }
})
