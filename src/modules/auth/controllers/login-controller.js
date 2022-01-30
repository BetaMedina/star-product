const { UnauthorizedError } = require('../../../core/errors/unauthorized-error')
const { successResponse } = require('../../../utils/http/status.http')
const { CONSTANTS } = require('../constants')
exports.loginController = ({ repository, credentialsService }) => ({
  async generateLogin ({ params }) {
    const { code } = params
    const auth = await repository.findAuthByCode({ code })
    if (!auth) throw new UnauthorizedError(CONSTANTS.LOGIN.INVALID_CODE)
    const credentials = await credentialsService.execute({ payload: { userId: auth.userId } })
    return successResponse({ credentials })
  }
})
