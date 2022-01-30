const { successResponse } = require('../../../utils/http/status.http')
const { NotFoundError } = require('../../../core/errors/not-found-request')
const { CONSTANTS } = require('../constants')

exports.readUserController = ({ repository }) => ({
  async read ({ userId }) {
    const userInfo = await repository.findById({ userId })
    if (!userInfo) throw new NotFoundError(CONSTANTS.READ_USER.USER_NOT_FOUND)
    return successResponse({ user: userInfo })
  }
})
