const { createdResponse } = require('../../../utils/http/status.http')
const { ForbiddenRequestError } = require('../../../core/errors/forbidden-request')
const { CONSTANTS } = require('../constants')

exports.createUserController = ({ repository }) => ({
  async create ({ body }) {
    const { email, name } = body
    const user = await repository.save({ email, name })
    if (!user) throw new ForbiddenRequestError(CONSTANTS.CREATE_USER.SAVE_ERROR) // On conflict strategy
    return createdResponse({ message: CONSTANTS.CREATE_USER.USER_CREATED })
  }
})
