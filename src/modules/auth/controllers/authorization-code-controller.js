const { ForbiddenRequestError } = require('../../../core/errors/forbidden-request')
const { successResponse } = require('../../../utils/http/status.http')
const { CONSTANTS } = require('../constants')
exports.authorizationController = ({ repository, dispatchMail }) => ({
  async generateAuthorizationCode ({ body }) {
    const { email } = body
    const userInfos = await repository.findUserByMail({ email })
    if (!userInfos) throw new ForbiddenRequestError(CONSTANTS.AUTHORIZATION.EMAIL_NOT_FOUND)
    await dispatchMail.execute({ userId: userInfos.id, email })
    return successResponse({ message: CONSTANTS.AUTHORIZATION.SUCCESS })
  }
})
