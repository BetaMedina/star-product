const { successResponse } = require('../../../utils/http/status.http')
const { BadRequestError } = require('../../../core/errors/bad-request')
const { CONSTANTS } = require('../constants')

exports.updateUserController = ({ repository }) => ({
  async update ({ body, userId }) {
    const { name } = body
    const userIsUpdated = await repository.updateUserById({ name, userId: userId })
    if (!userIsUpdated) throw new BadRequestError(CONSTANTS.UPDATE_USER.UPDATE_ERROR)
    return successResponse({ message: CONSTANTS.UPDATE_USER.USER_UPDATED })
  }
})
